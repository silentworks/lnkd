import { VITE_PUBLIC_APP_LINK_URL } from '$lib/env'

export const makePublicLink = (displayName, alias) =>
  `${VITE_PUBLIC_APP_LINK_URL}${displayName}/${alias}`

export const makeAppLink = (path) => `${VITE_PUBLIC_APP_LINK_URL}${path}`

export const slugify = (text) =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')

export const contains = (str, arr) => arr.some((v) => str.includes(v))
