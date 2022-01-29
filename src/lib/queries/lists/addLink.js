import supabase from '$lib/db'
import { errorMapper, successMapper } from '$lib/mappers/internal'
import { createLinkMapper } from '$lib/mappers/link'

export const addLink = async ({ list_id, title, url }) => {
  const linkMap = createLinkMapper({
    list_id,
    title,
    url
  })
  const { error, data } = await supabase.from('links').insert(linkMap)

  if (!error) {
    return successMapper({
      data: createLinkMapper(data),
      message: 'Link added successfully'
    })
  }

  return errorMapper({
    message: error.message
  })
}
