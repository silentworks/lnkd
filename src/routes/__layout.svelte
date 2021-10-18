<script>
  import Header from '$lib/home/Header.svelte'
</script>

<svelte:head>
  <title>Lnkd</title>
</svelte:head>

<div class="wrapper">
  <Header />

  <main>
    <slot />
  </main>
</div>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
