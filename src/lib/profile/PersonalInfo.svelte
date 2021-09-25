<script>
  import { createForm } from 'svelte-forms-lib'
  import * as yup from 'yup'
  // import { updateAccount } from "@/supabase.js";
  import Alert from '$lib/common/Alert.svelte'
  import Loading from '$lib/common/Loading.svelte'
  //   import { user } from '@/shared/stores.js'
  //   import { countries } from '@/shared/countries.js'

  let toggleForm = false
  let formError = ''

  const { form, errors, handleChange, handleSubmit, handleReset, isValid, isSubmitting } =
    createForm({
      initialValues: {
        fullName: '',
        city: '',
        country: '',
        dob: ''
      },
      validationSchema: yup.object().shape({
        fullName: yup.string().required()
      }),
      onSubmit: async ({ fullName, city, country, dob }) => {
        // formError = ''
        // const response = await updateAccount({ fullName, city, country, dob })
        // if (response.statusCode === 200) {
        //   toggleForm = false
        // } else {
        //   formError = response.message
        // }
      }
    })

  const toggleReset = () => {
    toggleForm = !toggleForm
    if (!$form.fullName) handleReset()
  }

  //   $: if ($user) {
  //     if ($user.fullName) $form.fullName = $user.fullName
  //     if ($user.city) $form.city = $user.city
  //     if ($user.country) $form.country = $user.country
  //     if ($user.dob) $form.dob = $user.dob
  //   }
</script>

<div class="px-6 py-10 bg-white border-t border-gray-100 shadow-lg">
  <div class:hidden={!toggleForm}>
    <Alert message={formError} />

    <form class="grid items-start grid-cols-12 gap-4" on:submit|preventDefault={handleSubmit}>
      <div class="col-span-12">
        <label for="fullName" class="block text-sm font-semibold text-gray-600">Full Name</label>
        <input
          id="fullName"
          type="text"
          name="fullName"
          placeholder="full name"
          class="block w-full px-1 py-3 mt-2 text-gray-800 border-b-2 border-gray-100 appearance-none focus:text-gray-500 focus:outline-none focus:border-gray-200"
          on:change={handleChange}
          bind:value={$form.fullName}
        />
        {#if $errors.fullName}
          <p class="mt-1 mb-4 text-xs italic text-red-700 capitalize-first">{$errors.fullName}</p>
        {/if}
      </div>

      <div class="col-span-6">
        <label for="city" class="block text-sm font-semibold text-gray-600">City</label>
        <input
          id="city"
          type="text"
          name="city"
          placeholder="city"
          class="block w-full px-1 py-3 mt-2 text-gray-800 border-b-2 border-gray-100 appearance-none focus:text-gray-500 focus:outline-none focus:border-gray-200"
          bind:value={$form.city}
        />
      </div>

      <div class="col-span-6">
        <label for="country" class="block text-sm font-semibold text-gray-600">Country</label>
        <select
          id="country"
          name="country"
          class="block w-full px-1 py-3 mt-2 text-gray-800 border-b-2 border-gray-100 appearance-none focus:text-gray-500 focus:outline-none focus:border-gray-200"
          bind:value={$form.country}
        >
          <!-- {#each countries as country}
            <option value={country}>{country}</option>
          {/each} -->
        </select>
      </div>

      <div class="flex flex-row justify-end col-span-12">
        <button
          type="submit"
          disabled={!$isValid}
          class="px-4 py-2 mr-2 font-medium text-white bg-gray-800 rounded-sm focus:outline-none hover:bg-gray-700 hover:shadow-none"
        >
          {#if $isSubmitting}loading...{:else}Save Changes{/if}
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
  </div>

  <div class="flex flex-row justify-between" class:hidden={toggleForm}>
    <!-- {#if $user}
      <div>
        <div class="text-sm">Full Name</div>
        <div class="px-1 py-3 mt-2">{$user.fullName}</div>
      </div>
      <div>
        <div class="text-sm">Country</div>
        <div class="px-1 py-3 mt-2">{$user.country}</div>
      </div>
      <button
        on:click={() => (toggleForm = !toggleForm)}
        type="button"
        class="self-center px-4 py-2 font-medium text-white bg-gray-800 rounded-sm focus:outline-none hover:bg-gray-700 hover:shadow-none"
      >
        Change
      </button>
    {:else} -->
    <div class="relative w-full h-14">
      <Loading size="small" />
    </div>
    <!-- {/if} -->
  </div>
</div>
