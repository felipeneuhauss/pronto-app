import { RoleEntity, UserEntity } from 'shared/mappers';
import {
  ROLE_ADMIN,
  ROLE_BENEFICIARY,
  ROLE_CONTRACTOR,
  ROLE_DEPENDENT,
  ROLE_SELLER,
} from 'shared/consts';

export const ADMIN = 'ADMIN';
export const SELLER = 'SELLER';
export const COMMERCIAL_ASSISTANT = 'COMMERCIAL_ASSISTANT';
export type Role = 'ADMIN' | 'SELLER' | 'COMMERCIAL_ASSISTANT';

export const getProfile = (user: UserEntity): Role => {
  const adminProfile = user?.roles.find((role: RoleEntity) => role.id === ROLE_ADMIN);
  if (adminProfile) {
    return ADMIN;
  }
  return SELLER;
};

// eslint-disable-next-line max-len
export const isSeller = (user: UserEntity) => user?.roles.find((role: RoleEntity) => role.id === ROLE_SELLER);

// eslint-disable-next-line max-len
export const isAdmin = (user: UserEntity) => user?.roles.find((role: RoleEntity) => role.id === ROLE_ADMIN);

// eslint-disable-next-line max-len
export const isBeneficiary = (user: UserEntity) => user?.roles.find((role: RoleEntity) => role.id === ROLE_BENEFICIARY);

// eslint-disable-next-line max-len
export const isContractor = (user: UserEntity) => user?.roles.find((role: RoleEntity) => role.id === ROLE_CONTRACTOR);

// eslint-disable-next-line max-len
export const isDependent = (user: UserEntity) => user?.roles.find((role: RoleEntity) => role.id === ROLE_DEPENDENT);

// eslint-disable-next-line max-len
export const isCommercialAssistant = (user: UserEntity) => user?.roles.find((role: RoleEntity) => role.id === ROLE_SELLER);
