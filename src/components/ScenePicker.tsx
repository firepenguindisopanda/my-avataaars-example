import { useAvatarStore } from '../store/avatarStore'
import { SCENES } from '../scenes'

// A radio group, so it works with Tab and the arrow keys like any other.
export default function ScenePicker() {
  const scene = useAvatarStore((s) => s.scene)
  const setScene = useAvatarStore((s) => s.setScene)

  return (
    <fieldset className='scene-picker'>
      <legend>Scene</legend>
      <div className='scene-options'>
        {SCENES.map(({ id, label, blurb }) => (
          <label key={id} className={`scene-option${scene === id ? ' active' : ''}`} title={blurb}>
            <input
              type='radio'
              name='scene'
              value={id}
              checked={scene === id}
              onChange={() => setScene(id)}
            />
            <span className={`scene-swatch swatch-${id}`} aria-hidden='true' />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
