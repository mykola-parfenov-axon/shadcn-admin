import { differenceInMinutes } from 'date-fns'
import { useEventCallback } from '@/hooks/use-event-callback'
import { useAuthStateContext } from './use-auth-state'

export const useGetIdToken = () => {
  const { authState, onLogOut, refreshToken } = useAuthStateContext()

  return useEventCallback(async (): Promise<string> => {
    if (authState.tag !== 'authenticated') {
      onLogOut()
      throw new Error('error')
    }

    const { accessTokenExpiredAt, accessToken } = authState.state

    const tokenExpirationTime = new Date(accessTokenExpiredAt)
    const tokenExpiresInMinutes = differenceInMinutes(
      tokenExpirationTime,
      new Date()
    )

    if (tokenExpiresInMinutes < 5) {
      const newToken = await refreshToken()
      return newToken.body.accessToken
    }

    return accessToken

    /**
     * ... from stackoverflow:
     *
     * Then, in Firebase, the token gets expired when the user session is revoked or disabled. Revocation happens during big account changes, eg. when the user updates their email or password in another session or the user sessions are revoked via the Admin SDK.

      The error will be thrown and the user is signed out and deactivated. The expectation is to sign in again or re-authenticate the user.
     */
  })
}
