import constate from 'constate'
import { IAuthResponse } from './auth-contract'

export type UseAuthInput = Readonly<{
  auth: IAuthResponse
}>

const useAuth = ({ auth }: UseAuthInput) => {
  return auth
}

export const [AuthProvider, useAuthContext] = constate(useAuth, (auth) => auth)
