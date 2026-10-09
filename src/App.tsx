import AvatarPreview from './components/AvatarPreview'
import CaribbeanCollection from './components/CaribbeanCollection'
import OptionEditor from './components/OptionEditor'
import SavedGallery from './components/SavedGallery'

export default function App() {
  return (
    <div className='app'>
      <header className='app-header'>
        <h1>Avataaars Studio</h1>
        <p>
          Example app for <code>@firepenguindisopanda/avataaars</code>, with
          avatar state managed by a Zustand store (persisted to localStorage).
        </p>
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
  )
}
