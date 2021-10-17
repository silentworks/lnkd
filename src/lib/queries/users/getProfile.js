import supabase from '$lib/db'

export const getProfile = async () => {
  const { data } = await supabase.from('profiles').select('*').single()
  return data
}

export const getProfileById = async (userId) => {
  const { data } = await supabase.from('profiles').select('*').eq('user_id', userId).single()
  return data
}
