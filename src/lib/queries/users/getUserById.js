import supabase from '$lib/db'

export const getUserById = async (userId) => {
  const { data } = await supabase.from('profiles').select('*').eq('user_id', userId).single()
  return data
}
