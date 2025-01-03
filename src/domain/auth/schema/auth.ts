import { z } from 'zod'
import zxcvbn from 'zxcvbn'

export type IUserName = z.infer<typeof ZUserName>
export const ZUserName = z.string().trim().min(2).max(40).brand<'UserName'>()

export type IUserEmail = z.infer<typeof ZUserEmail>
export const ZUserEmail = z
  .string()
  .trim()
  .email()
  .toLowerCase()
  .brand<'UserEmail'>()

export const PASSWORD_MIN_SCORE = 3
export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_MAX_LENGTH = 100

export type IUserPassword = z.infer<typeof ZUserPassword>
export const ZUserPassword = z
  .string()
  .min(PASSWORD_MIN_LENGTH, {
    message: `Password must contain at least ${PASSWORD_MIN_LENGTH} characters`,
  })
  .max(PASSWORD_MAX_LENGTH, {
    message: `Password must contain at most ${PASSWORD_MAX_LENGTH} characters`,
  })
  .refine(
    (value) => {
      if (value.length >= PASSWORD_MAX_LENGTH) {
        return true
      }

      const zxcvbnResult = zxcvbn(value)
      return zxcvbnResult.score >= PASSWORD_MIN_SCORE
    },
    {
      message: 'Password is not secure enough',
    },
  )
