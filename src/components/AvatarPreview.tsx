import { useState } from 'react'
import Avatar, { getAvatarHash } from '@firepenguindisopanda/avataaars'
import { useAvatarStore, useDisplayedAvatar } from '../store/avatarStore'

export default function AvatarPreview() {
  const config = useDisplayedAvatar()
  const randomize = useAvatarStore((s) => s.randomize)
  const reset = useAvatarStore((s) => s.reset)
  const loadHash = useAvatarStore((s) => s.loadHash)
  const [hashInput, setHashInput] = useState('')

  const hash = getAvatarHash(config)

  return (
    <section className='card preview'>
      <Avatar className='preview-avatar' {...config} />

      <div className='button-row'>
        <button onClick={randomize}>Randomize</button>
        <button className='secondary' onClick={reset}>Reset</button>
      </div>

      <div className='hash'>
        <span className='label'>Avatar hash</span>
        <code>{hash}</code>
        <button className='link' onClick={() => navigator.clipboard?.writeText(hash)}>
          Copy
        </button>
      </div>

      <form
        className='inline-form'
        onSubmit={(e) => {
          e.preventDefault()
          if (hashInput.trim()) loadHash(hashInput.trim())
          setHashInput('')
        }}>
        <input
          aria-label='Avatar hash to load'
          placeholder='Paste a hash to load it'
          value={hashInput}
          onChange={(e) => setHashInput(e.target.value)}
        />
        <button type='submit' className='secondary'>Load</button>
      </form>
    </section>
  )
}
