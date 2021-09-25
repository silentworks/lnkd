<script>
  import { createForm } from 'svelte-forms-lib'
  import * as yup from 'yup'
  import Alert from '$lib/common/Alert.svelte'
  import Loading from '$lib/common/Loading.svelte'
  import { user } from '$lib/common/stores'
  import { updateUsername } from '$lib/queries/users/updateUsername'

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
        if (response.statusCode === 400) messageType = 'error'
        message = response.message
      }
    })

  const toggleReset = () => {
    toggleForm = !toggleForm
    if (!$form.username) handleReset()
  }

  $: if ($user && $user.username) $form.username = $user.username
</script>

<div class="px-6 py-10 border-t bg-white border-gray-100 shadow-lg">
  <Alert {message} {messageType} />

  <form
    class="grid items-start grid-cols-12"
    class:hidden={!toggleForm}
    on:submit|preventDefault={handleSubmit}
  >
    <div class="col-span-12 pb-10 sm:pb-6">
      <label for="username" class="block text-sm font-semibold text-gray-600">Display Name</label>
      <input
        id="username"
        type="text"
        name="username"
        placeholder="username"
        class="block w-full px-1 py-3 mt-2 text-gray-800 border-b-2 border-gray-100 appearance-none focus:text-gray-500 focus:outline-none focus:border-gray-200"
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

    <div class="flex flex-row justify-end col-span-12">
      <button
        type="submit"
        disabled={!$isValid}
        class="px-4 py-2 mr-2 font-medium text-white bg-gray-800 rounded-sm focus:outline-none hover:bg-gray-700 hover:shadow-none"
      >
        {#if $isSubmitting}loading...{:else}Change Display Name{/if}
      </button>

      <button
        on:click={toggleReset}
        type="button"
        class="px-4 py-2 font-medium bg-gray-100 border border-gray-400 rounded-sm hover:text-white focus:outline-none hover:bg-gray-700 hover:shadow-none"
      >
        Cancel
      </button>
    </div>
  </form>

  <div class="flex flex-row justify-between" class:hidden={toggleForm}>
    {#if $user}
      <div>
        <div class="text-sm">Display Name</div>
        <div class="px-1 py-3 mt-2">{$user.username}</div>
      </div>
      <button
        on:click={() => (toggleForm = !toggleForm)}
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
