import { initContract } from '@ts-rest/core'

const c = initContract()

export const unAuthContract = c.router(
  {
    logout: {
      method: 'DELETE',
      path: '/admin/tokens/me',
      body: null,
      responses: {
        204: c.type(),
      },
    },
  },
  {
    strictStatusCodes: true,
    pathPrefix: '/api/billing',
  }
)
