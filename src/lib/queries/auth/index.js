import supabase from '$lib/db'
import { errorMapper, successMapper } from '$lib/mappers/internal'

export const signInMagicLink = async ({ email, redirectTo }) => {
  const { error, data } = await supabase.auth.signIn({ email }, { redirectTo })

  if (!error) {
    return successMapper({
      message: 'Check your email for a magic link'
    })
  }

  return errorMapper({
    message: error.message,
    code: 400
  })
}

export const signInGitHub = async ({ redirectTo }) => {
  const { error } = await supabase.auth.signIn({ provider: 'github' }, { redirectTo })

  if (!error) {
    return successMapper({
      message: 'Redirecting to GitHub...'
    })
  }

  return errorMapper({
    message: error.message,
    code: 400
  })
}

export const signOut = async () => {
  const { data, error } = await supabase.auth.signOut()

  if (!error) {
    return successMapper({
      message: 'Logged out successfully'
    })
  }

  return errorMapper({
    message: error.message,
    code: error.code
  })
}
