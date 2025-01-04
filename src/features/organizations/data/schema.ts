/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from 'zod'

const organizatonSchema = z.object({
  organizationId: z.string(),
  name: z.string(),
  createdAt: z.string(),
})
export type Organization = z.infer<typeof organizatonSchema>
