import type { MockMethod } from 'vite-plugin-mock'

export const MockMe: MockMethod[] = [{
  url: '/api/v1/me',
  method: 'get',
  statusCode: 200,
  response: (): Resource<User> => {
    return {
      resource: {
        id: 1,
        email: '1134954328@qq.com',
        updated_at: '2021-08-01T00:00:00.000Z',
        created_at: '2021-08-01T00:00:00.000Z',
      }
    }
  },
}]
