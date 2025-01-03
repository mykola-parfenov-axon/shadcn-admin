import { ApiFetcher, ApiFetcherArgs, tsRestFetchApi } from '@ts-rest/core'
import { initQueryClient } from '@ts-rest/react-query'
import { authContract } from './auth-contract'

type ApiFetcherResponse = Awaited<ReturnType<ApiFetcher>>

const deduplicateRequest = (path: string) => {
  let lastRefresh: {
    date: Date
    response?: ApiFetcherResponse
  } | null = null

  return async (args: ApiFetcherArgs): Promise<ApiFetcherResponse | null> => {
    if (args.path === path) {
      if (
        lastRefresh == null ||
        Date.now() - lastRefresh.date.getTime() > 1000
      ) {
        lastRefresh = { date: new Date() }
        const newResponse = await tsRestFetchApi(args)
        lastRefresh.response = newResponse
        return newResponse
      } else if (lastRefresh.response) {
        return lastRefresh.response
      } else {
        return {
          status: 418,
          body: {},
          headers: new Headers(),
        }
      }
    }
    return null
  }
}

const deduplicateRefresh = deduplicateRequest(
  '/api/billing/admin/tokens/refresh'
)

export const initAuthQueryClient = () => {
  return initQueryClient(authContract, {
    baseUrl: '',
    baseHeaders: {
      'Content-Type': 'application/json',
    },
    api: async (args) => {
      const response = await deduplicateRefresh(args)
      if (response != null) {
        return response
      }
      return tsRestFetchApi(args)
    },
  })
}
