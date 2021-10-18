# Lnkd

This is a SvelteKit, Tailwind and Supabase project. This project is a one link page website similar to that of linkedtree.

## Developing

Copy the `env.example` and name it `.env`

Edit the file and enter all the required variable values

```
VITE_PUBLIC_APP_LINK_URL=http://localhost:3000/
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_PRIVATE_KEY=
SUPABASE_JWT_SECRET=
DATABASE_URL=
```

The "DATABASE_URL" can be found under **Settings/Database**

Once you've created a project and installed dependencies with `pnpm install`, start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
pnpm run build
```

> You can preview the built app with `pnpm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.
