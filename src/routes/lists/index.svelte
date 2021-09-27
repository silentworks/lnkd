<script>
  import { onMount } from 'svelte'
  // import { getAllLists, makePublicLink } from '@/supabase.js'
  // import { user, lists } from '@/shared/stores.js'
  import LoadingRelative from '$lib/common/LoadingRelative.svelte'

  export let meta = {}
  let loading = false
  const lists = []

  // $: if ($user && $user.uid) {
  //   getAllLists().then((_) => {
  //     loading = false
  //   })
  // }
</script>

{#if loading}
  <div class="flex flex-col col-span-12 rounded-md pt-8 h-60 relative">
    <LoadingRelative />
  </div>
{:else}
  {#each lists as list}
    <div
      class="flex flex-col col-span-3 rounded-md content-end mr-10 px-4 pt-8 h-60 sm:px-3 sm:py-4 bg-gradient-to-b from-green-400 to-blue-400"
      class:bg-gray-200={meta.url == `/lists/${list.id}`}
      class:text-white={meta.url == `/lists/${list.id}`}
    >
      <a href="/lists/{list.id}" class="flex-grow block pt-4">
        <h2 class="text-2xl font-normal text-white mb-4">{list.title}</h2>
        <p class="font-sans text-xs text-white opacity-80 font-extralight">
          <!-- {makePublicLink($user.displayName, list.alias).replace('http://', '')} -->
        </p>
      </a>
      <div class="flex justify-between space-x-4 py-1">
        <button class="text-gray-100 opacity-30 hover:opacity-100 py-2">
          <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            ><path
              d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
            /></svg
          >
        </button>
        <a
          class="text-white bg-blue-400 hover:bg-blue-300 inline-flex items-center space-x-2 rounded-full px-3 py-1"
          href="/"
        >
          <svg class="w-3 h-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            ><path
              d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"
            /></svg
          >
          <span>visit</span>
        </a>
      </div>
    </div>
  {:else}
    <div
      class="flex flex-col col-span-12 sm:col-span-3 rounded-md mb-6 sm:mb-0 content-end sm:mr-10 px-6 sm:h-60 sm:px-4 bg-white"
    >
      <div class="relative py-10 sm:py-20">
        <p class="text-center">There are currently no lists, click the plus to add a new one.</p>
      </div>
    </div>
    <a
      href="/lists/new"
      class="flex flex-col col-span-6 sm:col-span-3 items-center justify-center rounded-md content-end sm:mr-10 px-4 pt-8 sm:h-60 h-48 sm:px-3 sm:py-4 bg-gradient-to-b from-green-400 to-blue-400"
    >
      <svg
        class="w-10 h-10 text-white fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
      </svg>
    </a>
  {/each}
{/if}
