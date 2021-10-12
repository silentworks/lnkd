<script>
  import '../app.postcss'

  import Header from '$lib/common/Header.svelte'
</script>

<svelte:head>
  <title>Lnkd</title>
</svelte:head>

<div class="wrapper">
  <Header />

  <main class="container px-5 mx-auto">
    <div class="w-full mx-auto md:max-w-5xl">
      <div class="grid grid-cols-12">
        <slot />
      </div>
    </div>
  </main>
</div>
