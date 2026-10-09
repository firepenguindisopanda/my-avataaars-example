import { useState } from 'react'
import Avatar from '@firepenguindisopanda/avataaars'
import { useAvatarStore } from '../store/avatarStore'

export default function SavedGallery() {
  const saved = useAvatarStore((s) => s.saved)
  const save = useAvatarStore((s) => s.save)
  const load = useAvatarStore((s) => s.load)
  const remove = useAvatarStore((s) => s.remove)
  const [name, setName] = useState('')

  return (
    <section className='card'>
      <h2>Saved avatars</h2>
      <form
        className='inline-form'
        onSubmit={(e) => {
          e.preventDefault()
          save(name.trim() || `Avatar ${saved.length + 1}`)
          setName('')
        }}>
        <input
          aria-label='Name for the saved avatar'
          placeholder='Name this avatar'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type='submit'>Save current</button>
      </form>

      {saved.length === 0 ? (
        <p className='hint'>Nothing saved yet. Saved avatars survive a page reload.</p>
      ) : (
        <ul className='gallery'>
          {saved.map((a) => (
            <li key={a.id}>
              <button className='gallery-load' title='Load this avatar' onClick={() => load(a.id)}>
                <Avatar className='gallery-avatar' {...a.config} />
                <span>{a.name}</span>
              </button>
              <button
                className='link danger'
                aria-label={`Delete ${a.name}`}
                onClick={() => remove(a.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
