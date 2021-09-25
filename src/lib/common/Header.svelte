<script>
  import { goto } from '$app/navigation'
  import { session } from '$app/stores'
  import { signOut } from '$lib/queries/auth'

  let toggle = false
  let isOpen = false

  const toggleNav = () => {
    toggle = !toggle
  }
  const toggleDropdown = () => {
    isOpen = !isOpen
  }

  async function handleSignOut() {
    await signOut()
    goto(`/session/login`)
  }
</script>

<nav class="bg-white shadow dark:bg-gray-800">
  <div class="container px-6 py-3 mx-auto">
    <div class="w-full mx-auto md:max-w-5xl">
      <div class="flex flex-col md:flex-row md:justify-between md:items-center">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <a
              class="text-xl font-bold text-gray-800 dark:text-white md:text-2xl hover:text-gray-700 dark:hover:text-gray-300"
              href="/">Lnkd</a
            >

            <!-- Search input on desktop screen -->
            <!-- <div class="hidden mx-10 md:block">
							<input type="text" class="w-32 px-4 py-3 text-sm leading-tight text-gray-700 placeholder-gray-500 bg-gray-200 border border-transparent rounded-md lg:w-64 dark:text-gray-200 dark:bg-gray-900 dark:placeholder-gray-200 focus:outline-none focus:bg-white focus:ring focus:border-blue-400" placeholder="Search" aria-label="Search">
						</div> -->
          </div>

          <!-- Mobile menu button -->
          <div class="flex md:hidden">
            <button
              type="button"
              class="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
              on:click={toggleNav}
            >
              <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                <path
                  fill-rule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
        <div class="items-center md:flex" class:block={toggle} class:hidden={!toggle}>
          <div class="flex flex-col mt-2 md:flex-row md:mt-0 md:mx-1 md:mr-10">
            <!-- <a class="my-1 text-sm leading-5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400 hover:underline md:mx-4 md:my-0" href="/">Home</a> -->
            <!-- <a class="my-1 text-sm leading-5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400 hover:underline md:mx-4 md:my-0" href="/about">About</a> -->
          </div>

          <div class="flex items-center py-2 -mx-1 md:mx-0">
            {#if $session.user?.authenticated}
              <div class="relative">
                <button on:click={toggleDropdown} class="relative z-10 flex p-2 focus:outline-none">
                  <span class="mr-2">{$session.user?.username ?? 'No username'}</span>
                  <!-- <span class="mr-2">hkjj</span> -->
                  <span class="block p-1 rounded-md focus:outline-none">
                    <svg
                      class="w-5 h-5 text-gray-800"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>

                {#if isOpen}
                  <div on:click={() => (isOpen = false)} class="fixed inset-0 z-10 w-full h-full" />

                  <div class="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-2xl">
                    <a
                      href="/account"
                      class="block px-4 py-2 text-sm text-gray-700 capitalize hover:bg-blue-500 hover:text-white"
                    >
                      your profile
                    </a>
                    <a
                      href="/session/logout"
                      class="block px-4 py-2 text-sm text-gray-700 capitalize hover:bg-blue-500 hover:text-white"
                      on:click|preventDefault={handleSignOut}
                    >
                      Sign Out
                    </a>
                  </div>
                {/if}
              </div>
              <a
                href="/lists/new"
                class="flex w-1/2 px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white bg-blue-500 rounded-md hover:bg-blue-600 md:mx-2 md:w-auto md:ml-4"
              >
                <span class="block p-1 pl-0 rounded-md focus:outline-none">
                  <svg
                    class="w-3 h-3 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
                  </svg>
                </span>
                <span class="ml-1">New List</span>
              </a>
            {:else}
              <a
                class="block w-1/2 px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-gray-700 dark:text-gray-200 hover:text-gray-400 md:mx-2 md:w-auto"
                href="/session/sign_in">Log In</a
              >
              <a
                class="block w-1/2 px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white bg-blue-500 rounded hover:bg-blue-600 md:mx-0 md:w-auto"
                href="/session/create">Sign Up</a
              >
            {/if}
          </div>

          <!-- Search input on mobile screen -->
          <!-- <div class="mt-3 md:hidden">
						<input type="text" class="w-full px-4 py-3 text-sm leading-tight text-gray-700 placeholder-gray-500 bg-gray-100 rounded-md focus:outline-none focus:bg-white focus:shadow-outline" placeholder="Search" aria-label="Search">
					</div> -->
        </div>
      </div>
    </div>
  </div>
</nav>
