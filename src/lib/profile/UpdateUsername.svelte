<script>
  import { createForm } from 'svelte-forms-lib'
  import * as yup from 'yup'
  import Alert from '$lib/common/Alert.svelte'
  import ModalWithTitleBar from '$lib/common/ModalWithTitleBar.svelte'
  import { updateUsername } from '$lib/queries/users/updateUsername'
  import { session } from '$app/stores'

  let toggleForm = false
  let message = ''
  let messageType = 'error'

  const { form, errors, handleChange, handleSubmit, handleReset, isValid, isSubmitting } =
    createForm({
      initialValues: {
        username: ''
      },
      validationSchema: yup.object().shape({
        username: yup.string().required()
      }),
      onSubmit: async ({ username }) => {
        message = ''
        const response = await updateUsername({ username })
        if (response.statusCode === 200) {
          messageType = 'success'
          toggleForm = false
        }

        if ([400, 409].includes(response.statusCode)) {
          messageType = 'error'
        }

        message = response.message
      }
    })

  const toggleReset = () => {
    toggleForm = !toggleForm
    if (!$form.username) handleReset()
  }

  $: if ($session.user && $session.user.username) $form.username = $session.user.username
</script>

<ModalWithTitleBar isClosable={false} isOpen={true}>
  <slot slot="title">Choose a username</slot>

  <form on:submit|preventDefault={handleSubmit} id="update-username">
    <div class="sm:flex sm:items-start">
      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <Alert {message} {messageType} duration={10000} />

        <div class="grid items-start grid-cols-12">
          <div class="col-span-12">
            <label for="displayName" class="block text-sm text-gray-600">
              Please create a username that will be used as part of your list url. Be careful when
              choosing a username as you cannot change this later on.
            </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="username"
              class="block w-full px-1 py-3 mt-2 text-gray-800 border-b-2 border-gray-200 appearance-none focus:text-gray-500 focus:outline-none focus:border-gray-200"
              on:change={handleChange}
              on:blur={handleChange}
              bind:value={$form.username}
            />
            {#if $errors.username}
              <p class="mt-1 mb-4 text-xs italic text-red-700 capitalize-first">
                {$errors.username}
              </p>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </form>

  <slot slot="footer">
    <button
      type="submit"
      form="update-username"
      disabled={!$isValid}
      class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
    >
      {#if $isSubmitting}loading...{:else}Save{/if}
    </button>
  </slot>
</ModalWithTitleBar>
