import { withDefault } from './internal.js'

const userDetailMapper = (user) => ({
  // city: withDefault(user.city),
  country: withDefault(user.country)
  // dob: withDefault(user.dob, null)
})

export const userMapper = (user) => ({
  fullName: withDefault(user.full_name),
  ...userDetailMapper(user)
})

export const userToDBMapper = (user) => ({
  full_name: withDefault(user.fullName),
  ...userDetailMapper(user)
})

export const usersMapper = (users) => users.map((u) => userMapper(u))

export const loggedInUserMapper = (user) => ({
  last_sign_in_at: user.last_sign_in_at,
  authenticated: user.aud === 'authenticated',
  email: user.email,
  id: user.user_id,
  verified: withDefault(user.emailVerification, false),
  username: withDefault(user.username)
})

export const combinedUserMapper = (user) => ({
  ...loggedInUserMapper(user),
  ...userMapper(user)
})
