<script context="module">
  import { checkIfLoggedIn } from '$lib/session'
  export const load = async ({ session, page }) => checkIfLoggedIn({ session, page })
</script>

<slot />
