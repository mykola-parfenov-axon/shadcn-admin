import { ClientArgs, tsRestFetchApi } from '@ts-rest/core'

export type CreateAppClientArgsInput = {
  getIdToken: () => Promise<string>
}

export const createAppClientArgs = ({
  getIdToken,
}: CreateAppClientArgsInput) => {
  return {
    baseUrl: '',
    baseHeaders: {
      'Content-Type': 'application/json',
    },
    api: async (args) => {
      const headers = { ...args.headers }

      const idToken = await getIdToken()

      headers['Authorization'] = `Bearer ${idToken}`

      return tsRestFetchApi({
        ...args,
        headers,
      })
    },
  } satisfies ClientArgs
}
