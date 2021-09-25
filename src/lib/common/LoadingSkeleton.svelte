<script>
	export let isLoading = false;
	export let size = "small";

	let classes = "";
	switch (size) {
		case "medium":
			classes = "h-8 w-1/6";
			break;
		case "large":
			classes = "";
			break;
		default:
			classes = "h-4 w-1/6";
	}
</script>

{#if isLoading}
	<span class="skeleton-box {classes} inline-block"></span>
{:else}
	<slot />
{/if}