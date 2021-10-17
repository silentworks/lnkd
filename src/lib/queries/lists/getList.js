import supabase from '$lib/db'
import { errorMapper, successMapper } from '$lib/mappers/internal'
import { createListMapper } from '$lib/mappers/link'

export const getListBySlug = async (slug) => {
  const { error, data } = await supabase
    .from('lists')
    .select(`*, links(id, title, type, url, list_id, published)`)
    .eq('slug', slug)
    .single()

  if (!error) {
    return successMapper({
      data: createListMapper(data),
      message: 'List retrieved successfully'
    })
  }

  return errorMapper(error)
}
