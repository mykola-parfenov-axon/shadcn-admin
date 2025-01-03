import { z } from 'zod'
import { ZUserName, ZUserPassword } from '@/domain/schema/auth'
import { IUser } from '@/domain/schema/user'
import { createQueryKeys } from '@lukemorales/query-key-factory'
import { initContract } from '@ts-rest/core'

const c = initContract()

export const userContract = c.router(
  {
    getOwnProfile: {
      method: 'GET',
      path: '/admin/users/me',
      responses: {
        200: c.type<IUser>(),
      },
    },
    updateOwnProfile: {
      method: 'PATCH',
      path: '/admin/users/me',
      body: z.object({
        fullName: ZUserName,
      }),
      responses: {
        204: c.type(),
      },
    },
    changePassword: {
      method: 'PATCH',
      path: '/admin/users/me/passwords',
      body: z.object({
        oldPassword: z.string(),
        newPassword: ZUserPassword,
      }),
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

export const userQueryKeys = createQueryKeys('user', {
  ownProfile: null,
})
