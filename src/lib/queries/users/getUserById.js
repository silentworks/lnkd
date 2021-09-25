import supabase from '$lib/db'

export const getUserById = async (userId) => {
  const { data } = await supabase.from('users').select('*').eq('id', userId).single()
  return data
}
