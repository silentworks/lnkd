<script context="module">
  import { checkIfLoggedIn } from '$lib/session'
  export const load = async ({ session }) => checkIfLoggedIn({ session })
</script>

<script>
  import { page } from '$app/stores'
  import Tab from '$lib/common/buttons/Tab.svelte'
</script>

<div class="col-span-12 md:col-span-2">
  <div class="space-y-4">
    <Tab href="/manage/account" active={$page.url.pathname == '/manage/account'}>Profile</Tab>
    <Tab href="/manage/account/settings" active={$page.url.pathname == '/manage/account/settings'}
      >Settings</Tab
    >
  </div>
</div>
<div class="col-span-12 md:col-span-10 pl-6">
  <slot />
</div>
