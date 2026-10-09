import { useMemo } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  DEFAULT_AVATAR_PROPS,
  generateRandomAvataarProps,
  getAvatarConfigFromHash,
} from '@firepenguindisopanda/avataaars'
import { withLook, type AvatarConfig } from '../looks'

export interface SavedAvatar {
  id: string
  name: string
  config: AvatarConfig
}

interface AvatarState {
  config: AvatarConfig
  activeLookId: string | null
  saved: SavedAvatar[]
  setOption: (key: string, value: string) => void
  toggleLook: (id: string) => void
  randomize: () => void
  reset: () => void
  loadHash: (hash: string) => void
  save: (name: string) => void
  load: (id: string) => void
  remove: (id: string) => void
}

export const useAvatarStore = create<AvatarState>()(
  persist(
    (set, get) => ({
      config: { ...DEFAULT_AVATAR_PROPS },
      activeLookId: null,
      saved: [],

      setOption: (key, value) =>
        set((state) => ({
          config: { ...withLook(state.config, state.activeLookId), [key]: value },
          activeLookId: null,
        })),

      toggleLook: (id) =>
        set((state) => ({ activeLookId: state.activeLookId === id ? null : id })),

      randomize: () => set({ config: generateRandomAvataarProps(), activeLookId: null }),

      reset: () => set({ config: { ...DEFAULT_AVATAR_PROPS }, activeLookId: null }),

      loadHash: (hash) => set({ config: getAvatarConfigFromHash(hash), activeLookId: null }),

      save: (name) =>
        set((state) => ({
          saved: [
            { id: crypto.randomUUID(), name, config: withLook(state.config, state.activeLookId) },
            ...state.saved,
          ],
        })),

      load: (id) => {
        const match = get().saved.find((a) => a.id === id)
        if (match) set({ config: { ...match.config }, activeLookId: null })
      },

      remove: (id) =>
        set((state) => ({ saved: state.saved.filter((a) => a.id !== id) })),
    }),
    {
      name: 'avataaars-studio',
      partialize: (state) => ({
        config: state.config,
        activeLookId: state.activeLookId,
        saved: state.saved,
      }),
    }
  )
)

export function useDisplayedAvatar(): AvatarConfig {
  const config = useAvatarStore((s) => s.config)
  const activeLookId = useAvatarStore((s) => s.activeLookId)
  return useMemo(() => withLook(config, activeLookId), [config, activeLookId])
}
