<script>
  import { page, session } from '$app/stores'
  import Header from '$lib/common/Header.svelte'
  import SubNav from '$lib/common/SubNav.svelte'
  import { Loader, loading } from '$lib/common/loader/index.js'
  import { setAuthCookie, unsetAuthCookie } from '$lib/session'
  import { getUserById } from '$lib/queries/users/getUserById'
  import { combinedUserMapper } from '$lib/mappers/users'
  import supabase from '$lib/db'

  supabase.auth.onAuthStateChange(async (event, _session) => {
    if (event !== 'SIGNED_OUT') {
      await setAuthCookie(_session)
      const profile = await getUserById(_session.user?.id)
      const user = combinedUserMapper({ ..._session.user, ...profile })
      session.set({ user })
    } else {
      await unsetAuthCookie()
      session.set({ user: combinedUserMapper({}) })
    }
  })
</script>

<svelte:head>
  <title>Lnkd</title>
</svelte:head>

<div class="wrapper">
  <Loader />
  <Header />

  <main class="container px-5 mx-auto">
    <div class="w-full mx-auto md:max-w-5xl">
      <div class="flex flex-col mt-8">
        <div class="flex flex-row justify-start mb-8 border-b border-gray-500">
          <SubNav pagePath={$page.path} />
        </div>
        <div class="grid grid-cols-12">
          <slot />
        </div>
      </div>
    </div>
  </main>
</div>
