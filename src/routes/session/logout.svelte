<script>
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { signOut } from '$lib/queries/auth'

  onMount(async () => {
    await signOut()
    // goto('/session/login')
  })
</script>
