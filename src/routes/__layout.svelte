<script>
  import { page } from '$app/stores'
  import { contains } from '$lib/common/util'
  import Header from '$lib/home/Header.svelte'
</script>

<div class="wrapper">
  {#if !contains($page.url.pathname, ['/manage'])}
    <Header />
  {/if}

  <main>
    <slot />
  </main>
</div>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
