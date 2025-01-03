import { useTsRestQueryClient } from '@ts-rest/react-query'
import { initAuthQueryClient } from './auth-query-cleint'

export const authQueryClient = initAuthQueryClient()

export const useAuthQueryClient = () => {
  return useTsRestQueryClient(authQueryClient)
}
