<script context="module">
  export const load = async ({ session }) => {
    if (session?.user?.id) {
      return {
        status: 307,
        redirect: '/manage'
      }
    }

    return {}
  }
</script>

<script>
  import { session } from '$app/stores'
  import { Loader } from '$lib/common/loader'
</script>

<svelte:head>
  <title>Lnkd</title>
</svelte:head>

<div class="wrapper">
  <Loader />

  <main>
    <div class="flex flex-col h-screen bg-gray-100">
      <div class="grid mx-2 my-20 place-items-center sm:my-auto">
        <div class="py-12">Lnkd</div>
        <div
          class="w-11/12 p-12 px-6 py-10 bg-white rounded-lg shadow-md sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 sm:px-10 sm:py-6 lg:shadow-lg"
        >
          <slot />
        </div>
      </div>
    </div>
  </main>
</div>
