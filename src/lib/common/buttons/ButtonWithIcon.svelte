<script>
  import { createEventDispatcher } from 'svelte'

  let className
  let buttonType = 'button'
  const dispatch = createEventDispatcher()
  const handleClick = (event) => {
    dispatch('action', { event })
  }
  export { className as class, buttonType as type }
</script>

<button
  on:click={handleClick}
  type={buttonType}
  class="bg-gray-200 hover:bg-gray-300 border border-gray-400 text-black uppercase font-bold py-2 px-6 rounded-sm flex-none {className}"
>
  <span class="icon">
    <slot name="icon" />
  </span>
  <span><slot name="title" /></span>
</button>
