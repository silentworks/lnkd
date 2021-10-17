import { VITE_PUBLIC_APP_LINK_URL } from '$lib/env'

export const makePublicLink = (displayName, alias) =>
  `${VITE_PUBLIC_APP_LINK_URL}${displayName}/${alias}`

export const makeAppLink = (path) => `${VITE_PUBLIC_APP_LINK_URL}${path}`
