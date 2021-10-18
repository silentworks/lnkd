import supabase from '$lib/db'
import { errorMapper, successMapper } from '$lib/mappers/internal'
import { createListMapper } from '$lib/mappers/link'

export const updateListTitleDesc = async ({ id, title, description }) => {
  const { error, data } = await supabase
    .from('lists')
    .update({ title, description })
    .match({ id: id })
    .single()

  if (!error) {
    return successMapper({
      data: createListMapper(data),
      message: 'Title and description updated successfully'
    })
  }

  return errorMapper({
    message: error.message
  })
}
