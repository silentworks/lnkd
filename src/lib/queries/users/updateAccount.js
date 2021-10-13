import { session } from '$app/stores'
import supabase from '$lib/db'
import { successMapper, errorMapper } from '$lib/mappers/internal'
import { userToDBMapper, combinedUserMapper } from '$lib/mappers/users'

export const updateAccount = async ({ fullName, country }) => {
  const { error, data } = await supabase
    .from('profiles')
    .update(userToDBMapper({ fullName, country }))

  if (!error) {
    const currUser = await supabase.auth.user()
    const response = data.pop()
    session.set({ user: combinedUserMapper({ ...currUser, ...response }) })
    return successMapper({
      message: 'Username updated successfully'
    })
  }

  return errorMapper(error)
}
