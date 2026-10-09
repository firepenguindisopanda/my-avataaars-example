import Avatar from '@firepenguindisopanda/avataaars'
import { useAvatarStore } from '../store/avatarStore'
import { COLLECTION } from '../looks'

export default function CaribbeanCollection() {
  const config = useAvatarStore((s) => s.config)
  const activeLookId = useAvatarStore((s) => s.activeLookId)
  const toggleLook = useAvatarStore((s) => s.toggleLook)

  return (
    <section className='card'>
      <h2>Caribbean collection</h2>
      <p className='hint'>Click a look to try it on, and click it again to take it off.</p>
      {COLLECTION.map(({ country, looks }) => (
        <div key={country} className='collection-group'>
          <h3>{country}</h3>
          <div className='look-grid'>
            {looks.map(({ id, label, preset }) => {
              const active = activeLookId === id
              return (
                <button
                  key={id}
                  className={`look-card${active ? ' active' : ''}`}
                  aria-pressed={active}
                  onClick={() => toggleLook(id)}>
                  <Avatar className='look-avatar' {...config} {...preset} />
                  <span>{label}</span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </section>
  )
}
