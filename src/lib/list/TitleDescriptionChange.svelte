<script>
  import { createForm } from 'svelte-forms-lib'
  import * as yup from 'yup'
  import Alert from '$lib/common/Alert.svelte'
  import Loading from '$lib/common/Loading.svelte'
  import { updateListTitleDesc } from '$lib/queries/lists/updateListTitleDesc'

  export let item

  let toggle = false
  let message = ''
  let messageType = 'error'

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
      message = ''
      messageType = 'error'
      const response = await updateListTitleDesc({ id: item.id, title, description })

      if (response.statusCode === 200) {
        messageType = 'success'
        item = response.data
        toggle = false
      }

      message = response.message
    }
  })

  $: if (item) {
    $form.title = item.title
    $form.description = item.description
  }
</script>

<div class="grid items-start grid-cols-12">
  <div class="col-span-12 px-6 py-10 bg-white border-t border-b border-gray-100 shadow-lg sm:py-6">
    <form class:hidden={!toggle} on:submit|preventDefault={handleSubmit}>
      <Alert {message} {messageType} />

      <div class="flex flex-col gap-4 pb-10 sm:pb-6">
        <div class="flex-grow">
          <label for="title" class="block text-sm font-semibold text-gray-600">Title</label>
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
          <label for="description" class="block text-sm font-semibold text-gray-600"
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

      <div class="flex flex-row justify-end col-span-12">
        <button
          type="submit"
          class="px-4 py-2 mr-2 font-medium text-white bg-gray-800 rounded-sm focus:outline-none hover:bg-gray-700 hover:shadow-none"
        >
          {#if $isSubmitting}loading...{:else}Update{/if}
        </button>

        <button
          on:click={() => (toggle = !toggle)}
          type="button"
          class="px-4 py-2 font-medium bg-gray-100 border border-gray-400 rounded-sm hover:text-white focus:outline-none hover:bg-gray-700 hover:shadow-none"
        >
          Cancel
        </button>
      </div>
    </form>

    <div class="flex flex-row justify-between" class:hidden={toggle}>
      {#if item}
        <div class="flex flex-col gap-4">
          <div>
            <div class="text-sm">Title</div>
            <div class="px-1 py-3 mt-2">{item.title}</div>
          </div>
          <div>
            <div class="text-sm">Description</div>
            <div class="px-1 py-3 mt-2">{item.description}</div>
          </div>
        </div>
        <button
          on:click={() => (toggle = !toggle)}
          type="button"
          class="self-center px-4 py-2 font-medium text-white bg-gray-800 rounded-sm focus:outline-none hover:bg-gray-700 hover:shadow-none"
        >
          Change
        </button>
      {:else}
        <div class="relative w-full h-14">
          <Loading size="small" />
        </div>
      {/if}
    </div>
  </div>
</div>
