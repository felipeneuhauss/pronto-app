import {
  ROLE_ADMIN,
  ROLE_BENEFICIARY,
  ROLE_CONTRACTOR,
  ROLE_DEPENDENT,
  ROLE_SELLER
} from '../shared/consts'
import { RoleEntity, UserEntity } from 'shared/mappers'

export const ADMIN = 'ADMIN'
export const SELLER = 'SELLER'
export const COMMERCIAL_ASSISTANT = 'COMMERCIAL_ASSISTANT'
export type Role = 'ADMIN' | 'SELLER' | 'COMMERCIAL_ASSISTANT';

export const getProfile = (user: UserEntity): Role => {
  const adminProfile = user?.roles.find((role: RoleEntity) => role.id === ROLE_ADMIN)
  if (adminProfile) {
    return ADMIN
  }
  return SELLER
}

export const isSeller = (user: UserEntity) => {
  return user?.roles.find((role: RoleEntity) => role.id === ROLE_SELLER)
}

export const isBeneficiary = (user: UserEntity) => {
  return user?.roles.find((role: RoleEntity) => role.id === ROLE_BENEFICIARY)
}

export const isContractor = (user: UserEntity) => {
  return user?.roles.find((role: RoleEntity) => role.id === ROLE_CONTRACTOR)
}

export const isDependent = (user: UserEntity) => {
  return user?.roles.find((role: RoleEntity) => role.id === ROLE_DEPENDENT)
}

export const isCommercialAssistant = (user: UserEntity) => {
  return user?.roles.find((role: RoleEntity) => role.id === ROLE_SELLER)
}
