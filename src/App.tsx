import AvatarPreview from './components/AvatarPreview'
import CaribbeanCollection from './components/CaribbeanCollection'
import OptionEditor from './components/OptionEditor'
import SavedGallery from './components/SavedGallery'
import SceneBackdrop from './components/SceneBackdrop'
import ScenePicker from './components/ScenePicker'
import { useAvatarStore } from './store/avatarStore'

export default function App() {
  const scene = useAvatarStore((s) => s.scene)

  return (
    <div className='app-shell' data-scene={scene}>
      <SceneBackdrop scene={scene} />

      <div className='app'>
        <header className='hero'>
          <div className='hero-text'>
            <p className='eyebrow'>Caribbean collection, four new pieces in 2.7.0</p>
            <h1>Avataaars Studio</h1>
            <p className='hero-lead'>
              Build an avatar, try on the Trinidad and Tobago and Jamaica looks,
              and save the ones you like. Made with{' '}
              <code>@firepenguindisopanda/avataaars</code>, with state kept in a
              Zustand store in your browser.
            </p>
          </div>
          <ScenePicker />
        </header>

        <main className='layout'>
          <div className='column'>
            <AvatarPreview />
            <CaribbeanCollection />
          </div>
          <div className='column'>
            <OptionEditor />
            <SavedGallery />
          </div>
        </main>
      </div>
    </div>
  )
}
