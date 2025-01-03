
import { useTsRestQueryClient } from '@ts-rest/react-query'
import { useGetIdToken } from './use-get-id-token'
import { useConst } from '@/hooks/use-const'
import { initUserQueryClient } from './user-query-client'

export const useUserQueryClient = () => {
  const getIdToken = useGetIdToken()

  const userQueryClient = useConst(() => {
    return initUserQueryClient({ getIdToken })
  })

  return useTsRestQueryClient(userQueryClient)
}
