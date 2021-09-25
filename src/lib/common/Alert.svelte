<script>
  export let message = ''
  export let messageType = 'error'
  export let duration = 4000

  let className
  export { className as class }

  let isVisible
  let isError
  let isWarning
  let isSuccess

  const reset = () => {
    setTimeout(() => {
      isVisible = false
    }, duration)
  }

  $: {
    isVisible = message !== ''
    isError = messageType === 'error'
    isWarning = messageType === 'warn'
    isSuccess = messageType === 'success'

    if (message) reset()
  }
</script>

{#if isVisible}
  <div
    class="flex items-center px-4 py-3 mb-3 text-sm font-bold text-white {className}"
    class:bg-red-500={isError}
    class:bg-yellow-400={isWarning}
    class:bg-green-500={isSuccess}
    role="alert"
  >
    <p>{message}</p>
  </div>
{/if}
