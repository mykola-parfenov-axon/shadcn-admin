import {
  createAppClientArgs,
  CreateAppClientArgsInput,
} from '@/domain/_shared/schema/query-client-shared'
import { initQueryClient } from '@ts-rest/react-query'
import { userContract } from './user-contract'

export type UserQueryClientInput = {
  getIdToken: () => Promise<string>
}

export const initUserQueryClient = ({
  getIdToken,
}: CreateAppClientArgsInput) => {
  return initQueryClient(userContract, createAppClientArgs({ getIdToken }))
}
