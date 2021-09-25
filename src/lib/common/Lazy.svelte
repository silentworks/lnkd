<script>
	import LoadingRelative from "@/features/common/LoadingRelative.svelte";
	export let component;
</script>

{#await component.then ? component : component()}
	<LoadingRelative />
{:then Cmp}
	<svelte:component this={Cmp.default} {...$$restProps} />
{/await}
