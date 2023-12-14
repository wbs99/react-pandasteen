import type { MockMethod } from 'vite-plugin-mock'

export const MockSession: MockMethod[] = [
  {
    url: '/api/v1/session',
    method: 'post',
    timeout: 100,
    response: (): { jwt: string; refresh_jwt: string } => {
      return {
        jwt: 'xxxxxxx',
        refresh_jwt: 'yyy'
      }
    }
  },
  {
    url: '/api/v1/refresh_jwt',
    method: 'get',
    statusCode: 200,
    response: (): { jwt: string } => {
      return {
        jwt: 'xxxxxxx'
      }
    }
  },
]
