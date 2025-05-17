import * as argon from 'argon2'

export const hashPassword = async (password: string) =>
  await argon.hash(password)

export const verifyPassword = async (hashPassword: string, password: string) =>
  await argon.verify(hashPassword, password)
