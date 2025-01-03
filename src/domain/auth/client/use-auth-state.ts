import { useCallback, useEffect, useMemo, useState } from 'react'
import { differenceInSeconds } from 'date-fns'
import constate from 'constate'
import useLocalStorageState from 'use-local-storage-state'
import { IAuthResponse } from './auth-contract'
import { useAuthQueryClient } from './use-auth-query-client'

const getTokenRefreshInterval = (refreshTokenExpiredAt: string) => {
  const tokenExpirationTime = new Date(refreshTokenExpiredAt)
  const tokenExpiresInSeconds = differenceInSeconds(
    tokenExpirationTime,
    new Date()
  )
  return (tokenExpiresInSeconds / 1.25) * 1000
}

type AuthState =
  | { tag: 'loading' }
  | { tag: 'authenticated'; state: IAuthResponse }
  | { tag: 'unauthenticated' }

const refreshTokenKey = ['refresh-token'] as const

const useAuthState = () => {
  const authQueryClient = useAuthQueryClient()

  const [authState, setAuthState] = useState<AuthState>({ tag: 'loading' })

  const [accessState, setAccessState] =
    useLocalStorageState<IAuthResponse | null>('access-state', {
      defaultValue: null,
    })

  const $$refreshToken = authQueryClient.refreshToken.useMutation({
    mutationKey: refreshTokenKey,
    onSuccess: ({ body }) => {
      setAuthState({ tag: 'authenticated', state: body })
      setAccessState(body)
    },
    onError: ({ status }) => {
      if (status === 418) {
        return
      }
      setAuthState({ tag: 'unauthenticated' })
      setAccessState(null)
    },
  })

  const refreshTokenMutate = $$refreshToken.mutateAsync

  const refreshTokenCallback = useCallback(() => {
    return refreshTokenMutate({})
  }, [refreshTokenMutate])

  useEffect(() => {
    if (accessState === null) {
      refreshTokenCallback()
    } else {
      const tokenExpiresInSeconds = differenceInSeconds(
        new Date(accessState.accessTokenExpiredAt),
        new Date()
      )

      if (tokenExpiresInSeconds >= 0) {
        setAuthState({ tag: 'authenticated', state: accessState })
      } else {
        refreshTokenCallback()
      }
    }
  }, [accessState, refreshTokenCallback])

  const refreshInterval = useMemo(() => {
    if (authState.tag === 'authenticated') {
      return getTokenRefreshInterval(authState.state.refreshTokenExpiredAt)
    }
    return Number.POSITIVE_INFINITY
  }, [authState])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null

    if (
      authState.tag === 'authenticated' &&
      refreshInterval !== Number.POSITIVE_INFINITY
    ) {
      timeoutId = setTimeout(() => {
        refreshTokenCallback()
      }, refreshInterval)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [authState.tag, refreshInterval, refreshTokenCallback])

  const $$issueToken = authQueryClient.issueToken.useMutation({
    onSuccess: ({ body }) => {
      setAuthState({ tag: 'authenticated', state: body })
    },
  })
  const issueTokenMutate = $$issueToken.mutateAsync

  const issueToken = useCallback(
    ({ email, password }: { email: string; password: string }) => {
      return issueTokenMutate(
        {
          body: {
            email,
            password,
          },
        },
        {
          onSuccess: (data) => {
            setAccessState(data.body)
          },
        }
      )
    },
    [issueTokenMutate, setAccessState]
  )

  const onLogOut = useCallback(() => {
    setAuthState({ tag: 'unauthenticated' })
    setAccessState(null)
    $$issueToken.reset()
    $$refreshToken.reset()
  }, [$$issueToken, $$refreshToken, setAccessState])

  return {
    authState,
    $$issueToken,
    issueToken,
    onLogOut,
    refreshToken: refreshTokenCallback,
  }
}

export const [AuthStateProvider, useAuthStateContext] = constate(useAuthState)
