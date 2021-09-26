import { session } from '$app/stores'
import supabase from '$lib/db'
import { successMapper, errorMapper } from '$lib/mappers/internal'
import { combinedUserMapper } from '$lib/mappers/users'
import errorCodes from '../errorCodes'

export const updateUsername = async ({ username }) => {
  const { data, error, status } = await supabase.from('profiles').update({ username })

  if (!error) {
    const currUser = await supabase.auth.user()
    const response = data.pop()
    session.set({ user: combinedUserMapper({ ...currUser, ...response }) })
    return successMapper({
      message: 'Username added successfully'
    })
  }

  return errorMapper({
    message: errorCodes[error.code].replaceAll('{placeholder}', 'Username'),
    code: status
  })
}
