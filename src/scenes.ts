// The backdrops the page can be shown on. Each id has a matching
// `.scene-<id>` block in scenes.css and its own accent colour there; every
// accent keeps white button text at 5.8:1 or better.
export const SCENES = [
  { id: 'sunset', label: 'Sunset', blurb: 'A striped sun going down behind the palms' },
  { id: 'lagoon', label: 'Lagoon', blurb: 'Bright sky over a turquoise sea, with rolling waves' },
  { id: 'carnival', label: 'Carnival', blurb: 'A night sky and confetti in flag colours' },
  { id: 'aurora', label: 'Aurora', blurb: 'Soft colour drifting across a pale sky' },
] as const

export type SceneId = (typeof SCENES)[number]['id']

export const DEFAULT_SCENE: SceneId = 'sunset'

export const isSceneId = (value: unknown): value is SceneId =>
  SCENES.some((scene) => scene.id === value)
