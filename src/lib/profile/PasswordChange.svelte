<script>
  //   import { resetPassword } from '@/supabase.js'
  import Alert from '$lib/common/Alert.svelte'
  import Loading from '$lib/common/Loading.svelte'
  //   import { user } from '@/shared/stores.js'

  let message = ''
  let messageType = 'error'
  let isSendingEmail = false

  const passwordReset = async (email) => {
    isSendingEmail = true
    message = ''
    // const response = await resetPassword({ email })
    // if (response.statusCode === 200) {
    //   messageType = 'success'
    //   isSendingEmail = false
    // }

    // if (response.statusCode === 400) {
    //   messageType = 'error'
    //   isSendingEmail = false
    // }

    // message = response.message
  }
</script>

<div class="px-6 py-10 border-t border-gray-100 shadow-lg">
  <Alert {message} {messageType} />

  <div class="flex flex-row justify-between">
    <!-- {#if $user}
      <div>
        <div class="text-sm">Password</div>
        <div class="px-1 py-3 mt-2">You can change your password</div>
      </div>
      <div class="flex flex-row items-center justify-end gap-4">
        {#if isSendingEmail}
          <div class="relative w-16 h-10 -mt-4">
            <Loading size="small" />
          </div>
        {:else}
          <button
            on:click={() => passwordReset($user.email)}
            type="button"
            class="px-4 py-2 font-medium text-white bg-gray-800 rounded-sm hover:bg-gray-700"
          >
            Reset
          </button>
        {/if}
      </div>
    {:else} -->
    <div class="relative w-full h-14">
      <Loading size="small" />
    </div>
    <!-- {/if} -->
  </div>
</div>
