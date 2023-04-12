import { http } from "../lib/http";
import { LoginData } from "./types";


export const loginApi = (data: LoginData) => http.post<{ jwt: string }>('/api/v1/session', data)

export const sendSmsCodeApi = (data: { email: string }) => http.post('/api/v1/validation_codes', data)

export const getMeApi = () => http.get<Resource<User>>('/api/v1/me')

export const getItemsApi = () => http.get<Resources<Item>>('/api/v1/items')


export const getTagApi = (url: string) => http.get<Resource<Tag>>(url)

export const getTagsApi = (url: string) => http.get<Resources<Tag>>(url)

export const createTagApi = (data: Partial<Tag>) => http.post<Resource<Tag>>('/api/v1/tags', data)

export const updateTagApi = (tagId: string, data: Partial<Tag>) =>
  http.patch<Resource<Tag>>(`/api/v1/tags/${tagId}`, data)

export const deleteTagApi = (tagId: string) => http.delete(`/api/v1/tags/${tagId}`)