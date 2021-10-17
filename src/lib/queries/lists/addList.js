import { session } from '$app/stores'
import supabase from '$lib/db'
import { successMapper, errorMapper } from '$lib/mappers/internal'
import { createListMapper } from '$lib/mappers/link'

export const addList = async ({ title, slug, description }) => {
  const list = createListMapper({
    title,
    description,
    slug
  })
  const { error, data } = await supabase.from('lists').insert(list)

  if (!error) {
    return successMapper({
      message: 'List added successfully'
    })
  }

  return errorMapper(error)
}
