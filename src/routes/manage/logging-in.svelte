<script>
  import { goto } from '$app/navigation'
  import Loading from '$lib/common/Loading.svelte'
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'

  onMount(async () => {
    await new Promise((r) => setTimeout(r, 4000))
    goto('/manage')
  })
</script>

<div class="fixed z-20 inset-0 overflow-y-auto">
  <div
    class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
  >
    <div class="fixed inset-0" aria-hidden="true">
      <div class="absolute inset-0 bg-gray-800 opacity-100" />
    </div>

    <!-- This element is to trick the browser into centering the modal contents. -->
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
      >&#8203;</span
    >

    <div
      class="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform sm:my-8 sm:align-middle sm:max-w-xl sm:w-full"
      out:fly={{ y: -200 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div class="p-5 py-14">
        <Loading size="small" />
        <p class="text-center pt-16">Please wait while we redirect you to the dashboard...</p>
      </div>
    </div>
  </div>
</div>
