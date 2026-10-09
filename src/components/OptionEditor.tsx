import { HASH_ORDER, getOptionList } from '@firepenguindisopanda/avataaars'
import { useAvatarStore, useDisplayedAvatar } from '../store/avatarStore'
import { FLAG_SHIRT_TYPES } from '../looks'

const LABELS: Record<string, string> = {
  backdropType: 'Backdrop',
  backdropColor: 'Backdrop color',
  topType: 'Top',
  accessoriesType: 'Accessories',
  hatColor: 'Hat color',
  hairColor: 'Hair color',
  facialHairType: 'Facial hair',
  facialHairColor: 'Facial hair color',
  clotheType: 'Clothes',
  clotheColor: 'Clothes color',
  graphicType: 'Graphic',
  eyeType: 'Eyes',
  eyebrowType: 'Eyebrows',
  mouthType: 'Mouth',
  skinColor: 'Skin',
}

const humanize = (value: string) => value.replace(/([a-z])([A-Z0-9])/g, '$1 $2')

export default function OptionEditor() {
  const config = useDisplayedAvatar()
  const setOption = useAvatarStore((s) => s.setOption)

  const disabledReason = (key: string) => {
    if (key === 'clotheColor' && FLAG_SHIRT_TYPES.includes(config.clotheType)) {
      return 'Flag shirts use fixed flag colors'
    }
    if (key === 'graphicType' && config.clotheType !== 'GraphicShirt') {
      return 'Only used by Graphic Shirt'
    }
    return null
  }

  return (
    <section className='card'>
      <h2>Customize</h2>
      <div className='option-grid'>
        {HASH_ORDER.map((key) => {
          const reason = disabledReason(key)
          return (
            <label key={key} className='option'>
              <span>{LABELS[key] ?? key}</span>
              <select
                value={config[key]}
                disabled={reason !== null}
                onChange={(e) => setOption(key, e.target.value)}>
                {getOptionList(key).map((value) => (
                  <option key={value} value={value}>
                    {humanize(value)}
                  </option>
                ))}
              </select>
              {reason && <small className='hint'>{reason}</small>}
            </label>
          )
        })}
      </div>
    </section>
  )
}
