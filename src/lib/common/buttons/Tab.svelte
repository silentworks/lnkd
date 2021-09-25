<script>
	export let active = false;
	export let href = '';
</script>

<a {href} class="block px-4 py-2 text-white opacity-40 rounded-md" class:bg-gray-900={active} class:opacity-100={active}>
	<slot />
</a>