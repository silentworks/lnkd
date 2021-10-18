import supabase from '$lib/db'
import { errorMapper, successMapper } from '$lib/mappers/internal'
import { createListLinkMapper } from '$lib/mappers/link'

export const getListById = async (id) => {
  const { error, data } = await supabase
    .from('lists')
    .select(`*, links(id, title, type, url, list_id, published)`)
    .eq('id', id)
    .single()

  if (!error) {
    return successMapper({
      data: createListLinkMapper(data),
      message: 'List retrieved successfully'
    })
  }

  return errorMapper(error)
}

export const getListBySlug = async (slug) => {
  const { error, data } = await supabase
    .from('lists')
    .select(`*, links(id, title, type, url, list_id, published)`)
    .eq('slug', slug)
    .single()

  if (!error) {
    return successMapper({
      data: createListLinkMapper(data),
      message: 'List retrieved successfully'
    })
  }

  return errorMapper(error)
}
