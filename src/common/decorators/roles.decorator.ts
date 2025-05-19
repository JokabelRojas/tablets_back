import { SetMetadata } from '@nestjs/common'

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
export type Role = 'user' | 'admin'

export type KeyRoles = {
  USER: 'user'
  ADMIN: 'admin'
}
export const ROLES_KEY = 'roles'
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)

export const { ADMIN, USER }: KeyRoles = {
  ADMIN: 'admin',
  USER: 'user',
}
