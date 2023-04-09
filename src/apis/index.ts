import { http } from "../lib/http";
import { LoginData } from "./types";


export const loginApi = (data: LoginData) => http.post<{ jwt: string }>('/api/v1/session', data)

export const sendSmsCodeApi = (data: { email: string }) => http.post('/api/v1/validation_codes', data)

// export const fetchMeApi = (path: string) => get<Resource<User>>(path)

// export const fetchItemsApi = (path: string) => get<Resources<Item>>(path)