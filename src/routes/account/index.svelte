<script>
  import { onMount } from 'svelte'
  import { loading } from '$lib/common/loader'
  import DisplayNameChange from '$lib/profile/DisplayNameChange.svelte'
  import PersonalInfo from '$lib/profile/PersonalInfo.svelte'
  import EmailChange from '$lib/profile/EmailChange.svelte'

  onMount(() => {
    loading.set(false)
  })
</script>

<div class="px-6 py-10 space-y-10 border-t bg-white border-gray-100 shadow-lg">
  <PersonalInfo />

  <DisplayNameChange />

  <EmailChange />
</div>
