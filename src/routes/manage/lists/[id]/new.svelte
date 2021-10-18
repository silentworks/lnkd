<script>
  import { createForm } from 'svelte-forms-lib'
  import * as yup from 'yup'
  //   import { addLink } from '@/supabase.js'
  import ModalWithTitleBar, { closeModal } from '$lib/common/ModalWithTitleBar.svelte'
  import Alert from '$lib/common/Alert.svelte'
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'

  let message = ''
  let messageType = 'error'

  const { form, errors, handleChange, handleSubmit, isSubmitting } = createForm({
    initialValues: {
      title: '',
      url: ''
    },
    validationSchema: yup.object().shape({
      title: yup.string().required().label('Title'),
      url: yup.string().required().label('Website Url')
    }),
    onSubmit: async ({ title, url }) => {
      message = ''
      //   const response = await addLink({ list_id: meta.params.uid, title, url })

      //   if (response.statusCode === 200) {
      //     messageType = 'success'
      //     closeModal()
      //   }

      //   if (response.statusCode === 400) messageType = 'error'

      //   message = response.message
    }
  })

  const close = () => {
    goto(`/manage/lists/${$page.params.id}`)
  }
</script>

<ModalWithTitleBar on:modalClose={closeModal} on:modalClosed={close} isOpen={true}>
  <svelte:fragment slot="title">New Link</svelte:fragment>

  <form on:submit|preventDefault={handleSubmit} id="add-link">
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
        <label for="url" class="block text-sm font-semibold text-gray-600">Website URL</label>
        <input
          id="url"
          name="url"
          placeholder="Website URL"
          class="block w-full px-1 py-3 mt-2 text-gray-800 border-b-2 border-gray-100 appearance-none focus:text-gray-500 focus:outline-none focus:border-gray-200"
          on:change={handleChange}
          on:blur={handleChange}
          bind:value={$form.url}
        />
        {#if $errors.url}
          <p class="mt-1 mb-4 text-xs italic text-red-700 capitalize-first">{$errors.url}</p>
        {/if}
      </div>
    </div>
  </form>

  <svelte:fragment slot="footer">
    <button
      type="submit"
      form="add-link"
      class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
    >
      {#if $isSubmitting}loading...{:else}Add Link{/if}
    </button>
    <button
      on:click={closeModal}
      type="button"
      class="px-4 py-2 font-medium rounded-md bg-gray-100 border border-gray-400 hover:text-white focus:outline-none hover:bg-gray-700 hover:shadow-none"
    >
      Cancel
    </button>
  </svelte:fragment>
</ModalWithTitleBar>
