import { useTsRestQueryClient } from '@ts-rest/react-query'
import { useConst } from '@/hooks/use-const'
import { initUnAuthQueryClient } from './un-auth-query-client'
import { useGetIdToken } from './use-get-id-token'

export const useUnAuthQueryClient = () => {
  const getIdToken = useGetIdToken()

  const unAuthQueryClient = useConst(() => {
    return initUnAuthQueryClient({ getIdToken })
  })

  return useTsRestQueryClient(unAuthQueryClient)
}
