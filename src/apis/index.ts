import { ajax } from "../lib/ajax";

type Data = {
  email: string
  code: string
}

export const fetchSessionApi = (data: Data) => ajax.post('/api/v1/session', data)

export const fetchMeApi = (path: string) => ajax.get<Resource<User>>(path)

export const fetchItemsApi = (path: string) => ajax.get<Resources<Item>>(path)