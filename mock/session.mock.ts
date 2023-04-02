import { MockMethod } from "vite-plugin-mock"

export const MockSession: MockMethod[] = [{
  url: '/api/v1/session',
  method: 'post',
  timeout: 100,
  response: (): { jwt: string } => {
    return {
      jwt: 'xxxxxxx'
    }
  }
}]