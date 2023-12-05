const JWT = 'jwt'
const REFRESH_JWT = 'refreshJwt'

export const getJwt = () => window.localStorage.getItem(JWT) || ''

export const setJwt = (jwt: string) => window.localStorage.setItem(JWT, jwt)

export const removeJwt = () => window.localStorage.removeItem(JWT)

export const getRefreshJwt = () => window.localStorage.getItem(REFRESH_JWT) || ''

export const setRefreshJwt = (refreshJwt: string) => window.localStorage.setItem(REFRESH_JWT, refreshJwt)
