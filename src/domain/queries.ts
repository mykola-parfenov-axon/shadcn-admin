// import { billingQueryKeys } from './billing/client/billing-contract'
// import { fileQueryKeys } from './file/client/file-contract'
import { QueryKey } from '@tanstack/react-query'
import { mergeQueryKeys } from '@lukemorales/query-key-factory'
import { authQueryKeys } from './auth/client/auth-contract'
import { userQueryKeys } from './auth/client/user-contract'
import { organizationsQueryKeys } from './organizations/client/organizations-contract'

export const qk = mergeQueryKeys(
  authQueryKeys,
  userQueryKeys,
  //   billingQueryKeys,
  //   fileQueryKeys,
  organizationsQueryKeys
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const keyWithParam = <Fn extends (arg: any) => { queryKey: QueryKey }>(
  fn: Fn,
  arg: Parameters<Fn>[0]
): [QueryKey, Parameters<Fn>[0]] => [fn(arg).queryKey, arg]
