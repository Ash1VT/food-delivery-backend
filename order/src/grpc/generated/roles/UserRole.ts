// Original file: protos/roles/roles.proto

export const UserRole = {
  USER_ROLE_UNSPECIFIED: 'USER_ROLE_UNSPECIFIED',
  USER_ROLE_CUSTOMER: 'USER_ROLE_CUSTOMER',
  USER_ROLE_COURIER: 'USER_ROLE_COURIER',
  USER_ROLE_RESTAURANT_MANAGER: 'USER_ROLE_RESTAURANT_MANAGER',
  USER_ROLE_MODERATOR: 'USER_ROLE_MODERATOR',
} as const;

export type UserRole =
  | 'USER_ROLE_UNSPECIFIED'
  | 0
  | 'USER_ROLE_CUSTOMER'
  | 1
  | 'USER_ROLE_COURIER'
  | 2
  | 'USER_ROLE_RESTAURANT_MANAGER'
  | 3
  | 'USER_ROLE_MODERATOR'
  | 4

export type UserRole__Output = typeof UserRole[keyof typeof UserRole]
