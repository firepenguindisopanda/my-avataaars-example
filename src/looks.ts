export type AvatarConfig = Record<string, string>

export interface Look {
  id: string
  label: string
  preset: AvatarConfig
}

export const FLAG_SHIRT_TYPES = ['TrinidadAndTobagoShirt', 'JamaicaShirt']

export const COLLECTION: { country: string; looks: Look[] }[] = [
  {
    country: 'Trinidad & Tobago',
    looks: [
      {
        id: 'tt-carnival',
        label: 'Carnival look',
        preset: { topType: 'CarnivalHeadpiece', accessoriesType: 'TrinidadAndTobagoSunglasses', clotheType: 'TrinidadAndTobagoShirt' },
      },
      { id: 'tt-shirt', label: 'Flag shirt', preset: { clotheType: 'TrinidadAndTobagoShirt' } },
      { id: 'tt-steelpan', label: 'Steelpan tee', preset: { clotheType: 'GraphicShirt', graphicType: 'Steelpan' } },
      { id: 'tt-ibis', label: 'Scarlet ibis tee', preset: { clotheType: 'GraphicShirt', graphicType: 'ScarletIbis' } },
      { id: 'tt-badge', label: 'Flag badge tee', preset: { clotheType: 'GraphicShirt', graphicType: 'TrinidadAndTobagoBadge' } },
      { id: 'tt-cocrico', label: 'Cocrico tee', preset: { clotheType: 'GraphicShirt', graphicType: 'Cocrico' } },
      { id: 'tt-anansi', label: 'Anansi tee', preset: { clotheType: 'GraphicShirt', graphicType: 'Anansi' } },
      {
        id: 'tt-mas',
        label: 'Carnival mask',
        preset: { topType: 'CarnivalHeadpiece', accessoriesType: 'CarnivalMask', clotheType: 'TrinidadAndTobagoShirt' },
      },
    ],
  },
  {
    country: 'Jamaica',
    looks: [
      {
        id: 'ja-full',
        label: 'Full look',
        preset: { topType: 'JamaicaTam', accessoriesType: 'JamaicaSunglasses', clotheType: 'JamaicaShirt' },
      },
      { id: 'ja-shirt', label: 'Flag shirt', preset: { clotheType: 'JamaicaShirt' } },
      { id: 'ja-doctorbird', label: 'Doctor bird tee', preset: { clotheType: 'GraphicShirt', graphicType: 'DoctorBird' } },
      { id: 'ja-badge', label: 'Flag badge tee', preset: { clotheType: 'GraphicShirt', graphicType: 'JamaicaBadge' } },
      { id: 'ja-ackee', label: 'Ackee tee', preset: { clotheType: 'GraphicShirt', graphicType: 'Ackee' } },
      { id: 'ja-anansi', label: 'Anansi tee', preset: { clotheType: 'GraphicShirt', graphicType: 'Anansi' } },
    ],
  },
]

const LOOKS_BY_ID = new Map(COLLECTION.flatMap((group) => group.looks).map((look) => [look.id, look]))

export function withLook(config: AvatarConfig, lookId: string | null): AvatarConfig {
  const look = lookId ? LOOKS_BY_ID.get(lookId) : undefined
  return look ? { ...config, ...look.preset } : config
}
