import { Pagination } from './pagination'

export type RequestMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'UPDATE' | 'PUT'
export interface FetcherParams {
  endpoint: string
  method: RequestMethod
  headers?: HeadersInit
  body?: BodyInit
  cache?: RequestCache
}

export interface APIDefaultResponse {
  statusCode: number
  message: string
}

export interface APIResponse<T> extends APIDefaultResponse {
  data?: T
  pagination?: Pagination
}
