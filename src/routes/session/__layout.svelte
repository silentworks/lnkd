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

<div class="flex flex-col h-screen bg-gray-100">
  <div class="grid mx-2 my-20 place-items-center">
    <div
      class="w-11/12 p-12 px-6 py-4 bg-white rounded-lg shadow-md sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 sm:px-10 sm:py-6 lg:shadow-lg"
    >
      <slot />
    </div>
  </div>
</div>
