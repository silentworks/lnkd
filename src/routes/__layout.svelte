<script>
  import '../app.postcss'

  import { page } from '$app/stores'
  import Header from '$lib/common/Header.svelte'
  import SubNav from '$lib/common/SubNav.svelte'
</script>

<svelte:head>
  <title>Lnkd</title>
</svelte:head>

<div class="wrapper">
  <Header />

  <main class="container px-5 mx-auto">
    <div class="w-full mx-auto md:max-w-5xl">
      <div class="flex flex-col mt-8">
        <div class="flex flex-row justify-start mb-8 border-b border-gray-500" />
        <div class="grid grid-cols-12">
          <slot />
        </div>
      </div>
    </div>
  </main>
</div>
