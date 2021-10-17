import supabase from '$lib/db'
import { errorMapper, successMapper } from '$lib/mappers/internal'

export const getAllLists = async () => {
  const { data, error } = await supabase.from('lists').select('*')

  if (!error) {
    return successMapper({
      data,
      message: 'Lists loaded successfully'
    })
  }

  return errorMapper(error)
}
