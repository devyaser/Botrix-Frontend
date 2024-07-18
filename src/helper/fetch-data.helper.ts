import { api } from "./api.helper"

export const createUser = async (username: string, email: string, birthday: string, password: string) => {
  return await api.post('/api/auth/signup', { username, email, birthday, password });
}

export const verifyUser = async (code: string) => {
  return await api.post('/api/auth/verify-account', { code });
}