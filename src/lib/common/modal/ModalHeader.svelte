<script>
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	export let isClosable = true;
	let modalClose = () => dispatch("modalClose");
</script>

<div class="bg-white border-b-2 border-gray-100 px-4 py-4 sm:px-6 sm:flex justify-between">
	<h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
		<slot />
	</h3>
	{#if isClosable}
	<button on:click={modalClose} class="hover:bg-blue-400 rounded-full hover:text-white p-1">
		<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
		</svg>
	</button>
	{/if}
</div>