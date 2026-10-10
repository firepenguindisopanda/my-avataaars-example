# Avataaars Studio (example)

A small React + Vite + TypeScript app that shows off
`@firepenguindisopanda/avataaars`, including the new Trinidad & Tobago and
Jamaica items (flag shirts, shirt graphics, flag sunglasses, `JamaicaTam` and
`CarnivalHeadpiece`, and since 2.7.0 the `Anansi`, `Cocrico` and `Ackee`
graphics and the `CarnivalMask`), shown in the "Caribbean collection" section.

## Run it

```bash
npm install
npm run dev
```

The package is installed from npm (`^2.7.0`, the release with the whole
Caribbean collection), so the project builds on its own, e.g. on Cloudflare.

To try unpublished changes to the package, link the local checkout instead
(`npm install ../avataaars`, after `npm run build` inside `../avataaars`), and
put `^2.7.0` back before deploying. `vite.config.ts` dedupes `react`/`react-dom`
so a linked package and the app share one copy of React.

## Deploy

The site is static. Build command `npm run build`, output directory `dist`.

## State management

All avatar state lives in one Zustand store, `src/store/avatarStore.ts`:

| State / action | What it does |
| --- | --- |
| `config` | The user's own avatar props |
| `activeLookId` | The Caribbean collection look being tried on, or `null` |
| `saved` | Named avatars the user has saved |
| `setOption(key, value)` | Change a single prop. If a look is on, its items are kept and the look is cleared |
| `toggleLook(id)` | Try a look on, or take it off if it is already on |
| `randomize()` / `reset()` | Uses the package's `generateRandomAvataarProps()` / `DEFAULT_AVATAR_PROPS` |
| `loadHash(hash)` | Uses the package's `getAvatarConfigFromHash()` |
| `save(name)` / `load(id)` / `remove(id)` | Manage the saved gallery |

A look is layered on top of `config` instead of being merged into it. The
avatar on screen is derived with `withLook(config, activeLookId)` (see
`src/looks.ts`), exposed to components through the `useDisplayedAvatar()` hook.
That keeps every look card previewing the user's own avatar with only that
look's items, and taking a look off restores the user's own hair and glasses.

The store is wrapped in Zustand's `persist` middleware, so the avatar, the
active look and the saved gallery survive a page reload (stored in
`localStorage` under `avataaars-studio`).

Components subscribe to just the slices they need, e.g.
`useAvatarStore((s) => s.saved)`, so there's no prop drilling between the
preview, editor, Caribbean collection and gallery.
