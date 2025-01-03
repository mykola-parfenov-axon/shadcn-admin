import {
  CreateAppClientArgsInput,
  createAppClientArgs,
} from '@/domain/_shared/schema/query-client-shared'
import { initQueryClient } from '@ts-rest/react-query'
import { unAuthContract } from './un-auth-contract'

export const initUnAuthQueryClient = ({
  getIdToken,
}: CreateAppClientArgsInput) => {
  return initQueryClient(unAuthContract, createAppClientArgs({ getIdToken }))
}
