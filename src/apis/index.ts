import { http } from "../lib/http";
import { LoginData } from "./types";


export const loginApi = (data: LoginData) => http.post<{ jwt: string }>('/api/v1/session', data)

export const sendSmsCodeApi = (data: { email: string }) => http.post('/api/v1/validation_codes', data)

export const getMeApi = () => http.get<Resource<User>>('/api/v1/me')

export const getItemsApi = () => http.get<Resources<Item>>('/api/v1/items')