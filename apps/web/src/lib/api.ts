import { env } from '../configs/env'

type RequestOptions = RequestInit & {
  token?: string
}

export async function api(path: string, options: RequestOptions = {}) {
  const { token, headers, ...requestOptions } = options

  return fetch(`${env.apiUrl}${path}`, {
    ...requestOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  })
}
