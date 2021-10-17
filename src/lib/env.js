// Create a single supabase client for interacting with your database
let importEnv = true

try {
  if (process.env.NODE_ENV === 'test') importEnv = false
} catch (error) {
  // log.error({ error });
}

export const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_PUBLIC_APP_LINK_URL } = !importEnv
  ? process.env
  : import.meta.env
