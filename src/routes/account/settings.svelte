<script>
  import { onMount } from 'svelte'
  import { loading } from '$lib/common/loader'
  import PageSettings from '$lib/profile/PageSettings.svelte'

  onMount(() => {
    loading.set(false)
  })
</script>

<div class="px-6 py-10 space-y-10 border-t bg-white border-gray-100 shadow-lg">
  <PageSettings />
</div>
