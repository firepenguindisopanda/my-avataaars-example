import { useMemo, type CSSProperties } from 'react'
import type { SceneId } from '../scenes'

// The decorative layer behind the page. It is fixed, ignores the pointer and is
// hidden from assistive tech; colours and motion live in scenes.css, and every
// animation stops under prefers-reduced-motion.
export default function SceneBackdrop({ scene }: { scene: SceneId }) {
  return (
    <div className={`scene scene-${scene}`} aria-hidden='true'>
      {scene === 'lagoon' && <Lagoon />}
      {scene === 'sunset' && <Sunset />}
      {scene === 'carnival' && <Carnival />}
      {scene === 'aurora' && <Aurora />}
    </div>
  )
}

// Two periods of the same curve, so sliding the layer left by half loops seamlessly.
const WAVE =
  'M0,64 C240,112 480,16 720,64 C960,112 1200,16 1440,64 C1680,112 1920,16 2160,64 ' +
  'C2400,112 2640,16 2880,64 L2880,140 L0,140 Z'

function Waves() {
  return (
    <>
      {['back', 'middle', 'front'].map((depth) => (
        <svg key={depth} className={`wave wave-${depth}`} viewBox='0 0 2880 140' preserveAspectRatio='none'>
          <path d={WAVE} />
        </svg>
      ))}
    </>
  )
}

function Lagoon() {
  return (
    <>
      <div className='sun-glow' />
      <div className='cloud cloud-one' />
      <div className='cloud cloud-two' />
      <Waves />
    </>
  )
}

// A stylised palm: a curved trunk, six fronds and a cluster of coconuts.
function Palm({ className }: { className: string }) {
  return (
    <svg className={className} viewBox='0 0 260 320'>
      <path d='M64,320 C72,236 92,160 126,96 L134,100 C102,164 84,238 78,320 Z' />
      <path d='M130,92 C96,72 54,80 18,126 C56,98 94,94 130,98 Z' />
      <path d='M130,92 C104,52 62,40 26,50 C64,56 98,72 128,98 Z' />
      <path d='M130,92 C132,50 158,22 196,16 C168,38 146,62 134,98 Z' />
      <path d='M130,92 C168,62 210,64 248,84 C210,82 172,86 134,100 Z' />
      <path d='M130,92 C174,94 210,120 232,160 C200,132 168,114 132,102 Z' />
      <path d='M130,92 C100,90 62,110 46,148 C72,124 100,110 130,102 Z' />
      <circle cx='124' cy='102' r='6' />
      <circle cx='136' cy='104' r='6' />
      <circle cx='130' cy='112' r='6' />
    </svg>
  )
}

function Sunset() {
  return (
    <>
      <div className='sunset-sun' />
      <div className='sunset-sea'>
        <div className='sunset-glint' />
      </div>
      <Palm className='palm palm-left' />
      <Palm className='palm palm-right' />
    </>
  )
}

// Flag colours (Jamaica green and gold, Trinidad and Tobago red, black and
// white) plus two carnival brights.
const CONFETTI_COLOURS = ['#009B3A', '#FED100', '#CE1126', '#FFFFFF', '#FF3D9A', '#22D3EE']
const SHAPES = ['dot', 'strip', 'diamond'] as const

// A small seeded generator, so the confetti lands in the same places every load.
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function Carnival() {
  const pieces = useMemo(() => {
    const random = seeded(2026)
    return Array.from({ length: 64 }, (_, i) => ({
      id: i,
      shape: SHAPES[Math.floor(random() * SHAPES.length)],
      style: {
        left: `${random() * 100}%`,
        top: `${random() * 100}%`,
        background: CONFETTI_COLOURS[Math.floor(random() * CONFETTI_COLOURS.length)],
        '--size': `${6 + random() * 10}px`,
        '--turn': `${Math.round(random() * 360)}deg`,
        animationDuration: `${7 + random() * 9}s`,
        animationDelay: `${-random() * 16}s`,
        opacity: 0.55 + random() * 0.4,
      } as CSSProperties,
    }))
  }, [])

  return (
    <>
      <div className='carnival-stars' />
      <div className='carnival-spot carnival-spot-one' />
      <div className='carnival-spot carnival-spot-two' />
      {pieces.map((piece) => (
        <span key={piece.id} className={`confetti confetti-${piece.shape}`} style={piece.style} />
      ))}
    </>
  )
}

function Aurora() {
  return (
    <>
      {['one', 'two', 'three', 'four', 'five'].map((n) => (
        <div key={n} className={`aurora-blob aurora-${n}`} />
      ))}
      <div className='grain' />
    </>
  )
}
