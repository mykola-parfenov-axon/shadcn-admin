import { z } from 'zod'
import { createQueryKeys } from '@lukemorales/query-key-factory'
import { initContract } from '@ts-rest/core'

const ZAccessToken = z.string().brand<'AccessToken'>()

export type IAuthResponse = z.infer<typeof ZAuthResponse>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ZAuthResponse = z.object({
  /**
   * The access token is used to sign requests that require user authentication.
   */
  accessToken: ZAccessToken,
  /**
   * The time when the access token has been issued by the server.
   */
  createdAt: z.string().datetime(),
  /**
   * The access token is short-lived. Usually its lifetime is counted in minutes. This means the token should be updated frequently while the app is running, and this should happen in background.
   */
  accessTokenExpiredAt: z.string(),
  /**
   * The refresh token is long-lived. Usually its lifetime is counted in days. This token is issued each time in pair with the access token. Refresh token is used to refresh the access token when it expires.
   */
  refreshTokenExpiredAt: z.string(),
})

const c = initContract()

export const authContract = c.router(
  {
    issueToken: {
      method: 'POST',
      path: '/admin/tokens/credentials',
      body: z.object({
        email: z.string(),
        password: z.string(),
      }),
      responses: {
        200: c.type<IAuthResponse>(),
        403: c.type<{ code: 'error_access_denied' }>(),
        404: c.type<{ code: 'error_email_or_password_incorrect' }>(),
      },
    },
    refreshToken: {
      method: 'POST',
      path: '/admin/tokens/refresh',
      body: null,
      responses: {
        200: c.type<IAuthResponse>(),
        404: c.type<{
          code: 'error_refresh_token_not_found'
        }>(),
        418: c.type<{
          code: 'request_deduplicated'
        }>(),
      },
    },
  },
  {
    strictStatusCodes: true,
    pathPrefix: '/api/billing',
  }
)

export const authQueryKeys = createQueryKeys('auth', {
  socialProviders: null,
  confirmationRequest: null,
})
