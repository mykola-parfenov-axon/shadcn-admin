import { z } from 'zod'
import { ZUserEmail, ZUserName } from './auth'

export type IUserId = z.infer<typeof ZUserId>
export const ZUserId = z.string().brand<'UserId'>()

export type IUserRole = z.infer<typeof ZUserRole>
export const ZUserRole = z.literal('ADMIN')

export const ZUser = z.object({
  userId: ZUserId,
  fullName: ZUserName,
  role: ZUserRole,
  email: ZUserEmail,
  createdAt: z.string().datetime(),
})

export type IUser = z.infer<typeof ZUser>
