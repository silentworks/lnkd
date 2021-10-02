<script>
  import { createForm } from 'svelte-forms-lib'
  import * as yup from 'yup'
  import Alert from '$lib/common/Alert.svelte'
  import { slugify } from '$lib/common/text.js'

  let alias = ''
  let listError = ''

  const { form, errors, handleChange, handleSubmit, isSubmitting } = createForm({
    initialValues: {
      title: '',
      description: ''
    },
    validationSchema: yup.object().shape({
      title: yup.string().required(),
      description: yup.string().required()
    }),
    onSubmit: async ({ title, description }) => {
      // listError = ''
      // const response = await addList({ title, alias, description })
      // if (response.statusCode === 200) {
      //   router.goto('/lists')
      // }
      // listError = response.message
    }
  })

  $: alias = slugify($form.title)
</script>

<!-- <div slot="titleAction" class="flex flex-row content-center">
		<span>Link: </span>
		{#if $user}
			<a
				href={makePublicLink($user.username, alias)}
				class="inline-block px-2 py-1 mb-2 ml-1 text-xs font-bold text-white duration-300 bg-gray-400 rounded-full hover:bg-gray-500 md:mr-2 md:px-4 opacity-90 hover:opacity-100"
				>{makePublicLink($user.username, alias)}</a
			>
		{/if}
	</div> -->
<div class="col-span-12">
  <div class="px-6 py-10 border-t bg-white border-gray-100 shadow-lg">
    <form on:submit|preventDefault={handleSubmit}>
      <div
        class="col-span-12 px-6 py-10 bg-white border-t border-b border-gray-100 shadow-sm sm:py-6"
      >
        <Alert message={listError} />

        <div class="flex flex-col gap-4">
          <div class="flex-grow">
            <label for="title" class="block text-sm font-semibold text-gray-600 uppercase"
              >Title</label
            >
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Title"
              class="block w-full px-1 py-3 mt-2 text-gray-800 border-b-2 border-gray-100 appearance-none focus:text-gray-500 focus:outline-none focus:border-gray-200"
              on:change={handleChange}
              on:blur={handleChange}
              bind:value={$form.title}
            />
            {#if $errors.title}
              <p class="mt-1 mb-4 text-xs italic text-red-700 capitalize-first">{$errors.title}</p>
            {/if}
          </div>

          <div class="flex-grow">
            <label for="description" class="block text-sm font-semibold text-gray-600 uppercase"
              >Description</label
            >
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              class="block w-full px-1 py-3 mt-2 text-gray-800 border-b-2 border-gray-100 appearance-none focus:text-gray-500 focus:outline-none focus:border-gray-200"
              on:change={handleChange}
              on:blur={handleChange}
              bind:value={$form.description}
            />
            {#if $errors.description}
              <p class="mt-1 mb-4 text-xs italic text-red-700 capitalize-first">
                {$errors.description}
              </p>
            {/if}
          </div>
        </div>
      </div>

      <!-- <div class="col-span-12 py-10 bg-white px-6 sm:py-6">
				<div class="grid items-start grid-cols-12 gap-4 mt-10">
					<div class="col-span-5">
						<label for="title" class="block text-sm font-semibold text-gray-600 uppercase">Title</label>
					</div>

					<div class="col-span-5">
						<label for="url" class="block text-sm font-semibold text-gray-600 uppercase">Website Url</label>
					</div>
				</div>
				{#each $form.links as link, j}
					<div class="grid items-start grid-cols-12 gap-4 mt-10">
						<div class="col-span-5">
							<input id="title" type="text" name={`links[${j}].title`} placeholder="Twitter"
									class="block w-full px-1 py-3 mt-2 text-gray-800 border-b-2 border-gray-100 appearance-none focus:text-gray-500 focus:outline-none focus:border-gray-200"
									on:change={handleChange}
									on:blur={handleChange}
									bind:value={$form.links[j].title} />
							{#if $errors.links[j].title}
								<p class="mt-1 mb-4 text-xs italic text-red-700 capitalize-first">{$errors.links[j].title}</p>
							{/if}
						</div>

						<div class="col-span-6">
							<input id="url" type="text" name={`links[${j}].url`} placeholder="https://twitter.com/jack"
								class="block w-full px-1 py-3 mt-2 text-gray-800 border-b-2 border-gray-100 appearance-none focus:text-gray-500 focus:outline-none focus:border-gray-200"
								on:change={handleChange}
								on:blur={handleChange}
								bind:value={$form.links[j].url} />
							{#if $errors.links[j].url}
								<p class="mt-1 mb-4 text-xs italic text-red-700 capitalize-first">{$errors.links[j].url}</p>
							{/if}
						</div>

						<div class="flex justify-between py-4">
							{#if j === $form.links.length - 1}
								<button on:click={add} type="button" class="inline-flex w-6 h-6 p-2 text-white bg-blue-600 rounded-full shadow focus:outline-none focus:shadow-outline" title="Add new group">
									<svg class="w-2 h-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
								</button>
							{/if}
							{#if $form.links.length !== 1}
								<button on:click={remove(j)} type="button" class="inline-flex w-6 h-6 p-2 ml-1 text-white bg-blue-600 rounded-full shadow focus:outline-none focus:shadow-outline" title="Add new group">
									<svg class="w-2 h-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 10h24v4h-24z"/></svg>
								</button>
							{/if}
						</div>
					</div>
				{/each}
			</div> -->

      <div class="col-span-12 p-12 px-6 py-10 bg-white sm:py-6">
        <div class="flex flex-col">
          <button
            type="submit"
            class="self-end px-6 py-3 font-medium text-white bg-gray-800 rounded-sm focus:outline-none hover:bg-gray-700 hover:shadow-none"
          >
            {#if $isSubmitting}loading...{:else}Create{/if}
          </button>
        </div>
      </div>
    </form>
  </div>
</div>
