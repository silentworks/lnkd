<script context="module">
  export const load = async ({ session }) => {
    if (!session?.user?.id) {
      return {
        status: 307,
        redirect: '/session/login'
      }
    }

    return {}
  }
</script>

<script>
  import { session } from '$app/stores'
  import UpdateUsername from '$lib/profile/UpdateUsername.svelte'
</script>

<h1>Dashboard</h1>

{#if $session.user && !$session.user.username}
  <UpdateUsername />
{/if}
