import { APIDefaultResponse, APIResponse, FetcherParams } from '@/interfaces/fetcher'

const fetcher = async <T = unknown>(params: FetcherParams): Promise<APIResponse<T>> => {
  try {
    const { headers, method, endpoint, body, cache } = params
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      ...headers,
    }

    const apiURL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3030'

    const defaultCache: RequestCache = cache ? cache : 'no-cache'
    const url = `${apiURL}/${endpoint}`
    const res = await fetch(url, { method, headers: defaultHeaders, body, cache: defaultCache })
    const json = await res.json()

    return {
      statusCode: json?.statusCode ?? res.status,
      message: json?.message ?? res.statusText,
      data: json,
      pagination: json?.pagination ?? undefined,
    }
  } catch (error: unknown) {
    const err = error as APIDefaultResponse
    return {
      statusCode: err?.statusCode || 500,
      message: err?.message ?? 'Something went wrong',
    }
  }
}
export default fetcher
