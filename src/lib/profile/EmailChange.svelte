<script>
  import { createForm } from 'svelte-forms-lib'
  import * as yup from 'yup'
  // import { updateEmailAddress, createVerification } from "@/supabase.js";
  import Alert from '$lib/common/Alert.svelte'
  import Loading from '$lib/common/Loading.svelte'
  import { session } from '$app/stores'

  let toggleForm = false
  let message = ''
  let messageType = 'success'

  const { form, errors, handleChange, handleSubmit, handleReset, isValid, isSubmitting } =
    createForm({
      initialValues: {
        email: '',
        confirmEmail: ''
      },
      validationSchema: yup.object().shape({
        email: yup.string().email().required(),
        confirmEmail: yup
          .string()
          .email()
          .required()
          .label('Confirm email address')
          .oneOf([yup.ref('email'), null], 'Confirm email address does not match email address')
      }),
      onSubmit: async ({ email }) => {
        message = ''
        messageType = 'error'
        // const response = await updateEmailAddress({ email, password })
        // if (response.statusCode === 200) {
        //   messageType = 'success'
        //   toggleForm = false
        //   // reset confirm email and password
        //   $form.confirmEmail = ''
        //   $form.password = ''
        // }

        // if (response.statusCode === 400) {
        //   messageType = 'error'
        // }

        // message = response.message
      }
    })

  const toggleReset = () => {
    toggleForm = !toggleForm
    if (!$form.email) handleReset()
  }

  $: if ($session.user && $session.user?.email) $form.email = $session.user.email
</script>

<div class="px-6 py-10 border-t border-gray-100 shadow-lg">
  {#if message}
    <Alert {message} {messageType} />
  {/if}
  <form
    class="grid items-start grid-cols-12"
    class:hidden={!toggleForm}
    on:submit|preventDefault={handleSubmit}
  >
    <div class="col-span-12 pb-10 sm:pb-6">
      <label for="email" class="block text-sm font-semibold text-gray-600">Email Address</label>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="email"
        class="block w-full px-1 py-3 mt-2 text-gray-800 border-b-2 border-gray-100 appearance-none focus:text-gray-500 focus:outline-none focus:border-gray-200"
        on:change={handleChange}
        on:blur={handleChange}
        bind:value={$form.email}
      />
      {#if $errors.email}
        <p class="mt-1 mb-4 text-xs italic text-red-700 capitalize-first">
          {$errors.email}
        </p>
      {/if}
    </div>

    <div class="col-span-12 pb-10 sm:pb-6">
      <label for="confirmEmail" class="block text-sm font-semibold text-gray-600"
        >Confirm Email Address</label
      >
      <input
        id="confirmEmail"
        type="email"
        name="confirmEmail"
        placeholder="confirm email address"
        class="block w-full px-1 py-3 mt-2 text-gray-800 border-b-2 border-gray-100 appearance-none focus:text-gray-500 focus:outline-none focus:border-gray-200"
        on:change={handleChange}
        on:blur={handleChange}
        bind:value={$form.confirmEmail}
      />
      {#if $errors.confirmEmail}
        <p class="mt-1 mb-4 text-xs italic text-red-700 capitalize-first">
          {$errors.confirmEmail}
        </p>
      {/if}
    </div>

    <div class="flex flex-row justify-end col-span-12">
      <button
        type="submit"
        disabled={!$isValid}
        class="px-4 py-2 mr-2 font-medium text-white bg-gray-800 rounded-sm focus:outline-none hover:bg-gray-700 hover:shadow-none"
      >
        {#if $isSubmitting}loading...{:else}Change Email{/if}
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
    {#if $session.user}
      <div>
        <div class="text-sm">Email Address</div>
        <div class="px-1 py-3 mt-2">{$session.user.email}</div>
      </div>
      <div class="flex flex-row items-center justify-end gap-4">
        <button
          on:click={() => (toggleForm = !toggleForm)}
          type="button"
          class="px-4 py-2 font-medium text-white bg-gray-800 rounded-sm hover:bg-gray-700"
        >
          Change
        </button>
      </div>
    {:else}
      <div class="relative w-full h-14">
        <Loading size="small" />
      </div>
    {/if}
  </div>
</div>
