import { useGetIdToken } from '@/domain/auth/client/use-get-id-token'
import { useTsRestQueryClient } from '@ts-rest/react-query'
import { useConst } from '@/hooks/use-const'
import { initOrganizationsQueryClient } from './organizations-query-client'

export const useOrganizationsQueryClient = () => {
  const getIdToken = useGetIdToken()

  const organizationsQueryClient = useConst(() => {
    return initOrganizationsQueryClient({ getIdToken })
  })

  return useTsRestQueryClient(organizationsQueryClient)
}
