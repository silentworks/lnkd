import supabase from '$lib/db'
import { session } from '$app/stores'
import { combinedUserMapper } from '$lib/mappers/users'
import { auth, user } from '../common/stores'
import { getProfile } from '../users/getProfile'
import { setAuthCookie, unsetAuthCookie } from '$lib/session'

export const checkAuthState = () => {
  async function sessionSetup(session) {
    const currUser = await getProfile()
    console.log(`session checking`)
    user.set(combinedUserMapper({ ...session.user, ...currUser }) ?? null)
    auth.setLoggedIn()
  }

  async function check() {
    const session = supabase.auth.session()
    if (session) sessionSetup(session)
  }

  check()

  const { data: authListener } = supabase.auth.onAuthStateChange(async (event, _session) => {
    if (event === 'SIGNED_IN') {
      session.set({ user: _session.user })
      await setAuthCookie(_session)
      sessionSetup(_session)
    }

    if (event === 'SIGNED_OUT') {
      session.set({ user: { guest: true } })
      await unsetAuthCookie()
      auth.reset()
    }
  })

  return authListener
}
