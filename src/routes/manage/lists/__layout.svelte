<script context="module">
  import { checkIfLoggedIn } from '$lib/session'
  export const load = async ({ session }) => checkIfLoggedIn({ session })
</script>

<slot />
