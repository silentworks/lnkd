import { withDefault } from './internal'

export const createListMapper = (props) => ({
  id: props.id,
  title: props.title,
  user_id: props.user_id,
  slug: props.slug,
  description: withDefault(props.description),
  published: withDefault(props.published, 0)
})

export const createListTitleDescMapper = (props) => ({
  title: props.title,
  description: withDefault(props.description)
})

export const createLinkMapper = (props) => ({
  user_id: props.user_id,
  list_id: props.list_id,
  title: props.title,
  type: withDefault(props.type, 'website'),
  url: props.url,
  published: withDefault(props.published, false)
})

export const createListLinkMapper = (props) => ({
  ...createListMapper(props),
  links: props.links.map((l) => createLinkMapper(l))
})

export const listMapper = (props) => ({
  id: props.id,
  ...createListLinkMapper(props)
})
