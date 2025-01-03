import {
  CreateAppClientArgsInput,
  createAppClientArgs,
} from '@/domain/_shared/schema/query-client-shared'
import { initQueryClient } from '@ts-rest/react-query'
import { organizationsContract } from './organizations-contract'

export const initOrganizationsQueryClient = ({
  getIdToken,
}: CreateAppClientArgsInput) => {
  return initQueryClient(
    organizationsContract,
    createAppClientArgs({ getIdToken })
  )
}
