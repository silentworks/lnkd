<script>
  import { page } from '$app/stores'
  import { contains } from '$lib/common/util'

  let toggle = false
  let isOpen = false
  const toggleNav = () => {
    toggle = !toggle
  }
  const toggleDropdown = () => {
    isOpen = !isOpen
  }
</script>

<nav class="bg-white shadow dark:bg-gray-800">
  <div class="container px-6 py-3 mx-auto">
    <div class="w-full mx-auto md:max-w-5xl">
      <div class="flex flex-col md:flex-row md:justify-between md:items-center relative py-2">
        <div class="md:flex md:w-full justify-center">
          <div class="flex items-center">
            <a
              class="text-xl font-bold text-gray-800 dark:text-white md:text-2xl hover:text-gray-700 dark:hover:text-gray-300"
              href="/">Lnkd</a
            >
          </div>
        </div>

        {#if !contains($page.path, ['/manage', '/session'])}
          <div class="items-center md:flex absolute right-0 top-0">
            <div class="flex items-center py-2 -mx-1 md:mx-0">
              <a
                class="block px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white bg-blue-500 rounded hover:bg-blue-600 md:mx-0 md:w-auto"
                href="/session/login">Getting Started</a
              >
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</nav>
