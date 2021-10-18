<script>
  import { createForm } from 'svelte-forms-lib'
  import * as yup from 'yup'
  import Alert from '$lib/common/Alert.svelte'
  import PageHeading from '$lib/auth/PageHeading.svelte'
  import GitHubButton from '$lib/common/buttons/GitHubButton.svelte'
  import { signInMagicLink } from '$lib/queries/auth'
  import { VITE_PUBLIC_APP_LINK_URL } from '$lib/env'

  let message = ''
  let messageType = 'error'

  const redirectTo = `${VITE_PUBLIC_APP_LINK_URL}manage/logging-in`

  const { form, errors, handleChange, handleSubmit, handleReset, isValid, isSubmitting } =
    createForm({
      initialValues: {
        email: ''
      },
      validationSchema: yup.object().shape({
        email: yup.string().email().required()
      }),
      onSubmit: async ({ email }) => {
        const response = await signInMagicLink({ email, redirectTo })

        if (response.statusCode == 200) {
          message = response.message
          messageType = 'success'
          handleReset()
        }
      }
    })
</script>

<svelte:head>
  <title>Sign in or create a free account - Lnkd</title>
</svelte:head>

<PageHeading>Sign in or create a free account</PageHeading>

<Alert {message} {messageType} duration={12000} class="my-6" />

<form class="mt-10" on:submit|preventDefault={handleSubmit}>
  <!-- Email Input -->
  <label for="email" class="block text-xs font-semibold text-gray-600 uppercase">E-mail</label>
  <input
    id="email"
    type="email"
    name="email"
    placeholder="e-mail address"
    autocomplete="email"
    class="block w-full px-1 py-3 mt-2 text-gray-800 border-b-2 border-gray-100 appearance-none focus:text-gray-500 focus:outline-none focus:border-gray-200"
    on:change={handleChange}
    bind:value={$form.email}
  />
  {#if $errors.email}
    <p class="mt-1 mb-4 text-xs italic text-red-700 capitalize-first">{$errors.email}</p>
  {/if}

  <!-- Auth Buttton -->
  <button
    type="submit"
    disabled={!$isValid}
    class="w-full py-3 mt-10 font-medium text-white uppercase bg-gray-800 rounded-sm focus:outline-none hover:bg-gray-700 hover:shadow-none"
  >
    {#if $isSubmitting}loading...{:else}Email a magic link{/if}
  </button>

  <div class="mt-4 text-sm text-center sm:flex sm:flex-wrap sm:mb-4">
    <p class="flex-1 mx-4 my-2 text-gray-500 text-md sm:my-auto">or</p>
  </div>

  <!-- Another Auth Routes -->
  <GitHubButton />
</form>
