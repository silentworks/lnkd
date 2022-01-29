<script context="module">
  export async function load({ page }) {
    const res = await getListById(page.params.id)

    if (res.statusCode == 200) {
      return {
        props: {
          item: res.data
        }
      }
    }

    return {}
  }
</script>

<script>
  import { page, session } from '$app/stores'
  import { makePublicLink } from '$lib/common/util'
  import TitleDescriptionChange from '$lib/list/TitleDescriptionChange.svelte'
  import { getListById, getListBySlug } from '$lib/queries/lists/getList'

  export let item
  let links = item.links
  let id = ''

  $: id = $page.params.id
  // $: if ($user && $user.uid && meta.params.uid) {
  // 	if (lists.isEmpty()) {
  // 		getList({ id: meta.params.uid });
  // 	}
  // }

  // $: {
  // 	if ($lists.length > 0) {
  // 		item = lists.getItem(meta.params.uid);
  // 		id = item.id;
  // 		getLinks({ linkId: id }).then(({ data }) => {
  // 			links = data;
  // 		});
  // 	}
  // }
</script>

<div class="col-span-12">
  <div class="px-6 py-10 border-t bg-white border-gray-100 shadow-lg">
    <div class="flex flex-row justify-end content-center">
      <span>Link: </span>
      <a
        href={makePublicLink($session.user.username, item.slug).replace('http://', '')}
        class="inline-block px-1 py-1 mb-2 ml-1 text-xs font-bold text-white duration-300 bg-gray-400 hover:bg-gray-500 opacity-90 hover:opacity-100"
        >{makePublicLink($session.user.username, item.slug).replace('http://', '')}</a
      >
    </div>

    <TitleDescriptionChange {item} />

    <div class="col-span-12 py-2 px-6 sm:py-6">
      <div class="flex justify-center items-center">
        <a
          href="/manage/lists/{id}/new"
          class="px-6 py-3 font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-sm focus:outline-none hover:shadow-none"
          >Add new link</a
        >
      </div>
    </div>

    <div class="grid grid-cols-12">
      {#each links as link}
        <div class="col-span-12 py-2 px-6 sm:py-6 mb-4 bg-white border-gray-100 shadow-lg">
          <h2>{link.title}</h2>
          <a href={link.url}>{link.url}</a>
        </div>
      {/each}
    </div>
  </div>
</div>

<slot />
