<script>
  export let pagePath = null
</script>

<ul class="flex">
  <li>
    <a
      href="/manage/lists"
      class="flex space-x-1 pr-6 py-4 border-white text-white opacity-40"
      class:opacity-100={pagePath.includes('/manage/lists')}
      class:border-b-2={pagePath.includes('/manage/lists')}
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 10h16M4 14h16M4 18h16"
        />
      </svg>
      <span>Lists</span>
    </a>
  </li>
  <li>
    <a
      href="/manage/account"
      class="flex space-x-1 px-4 py-4 border-white text-white opacity-40"
      class:opacity-100={pagePath.includes('/manage/account')}
      class:border-b-2={pagePath.includes('/manage/account')}
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        />
      </svg>
      <span>Account</span>
    </a>
  </li>
</ul>
