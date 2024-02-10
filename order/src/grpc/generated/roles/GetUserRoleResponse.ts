// Original file: protos/roles/roles.proto

import type { UserRole as _roles_UserRole, UserRole__Output as _roles_UserRole__Output } from '../roles/UserRole';
import type { Long } from '@grpc/proto-loader';

export interface GetUserRoleResponse {
  'userId'?: (number | string | Long);
  'role'?: (_roles_UserRole);
}

export interface GetUserRoleResponse__Output {
  'userId': (string);
  'role': (_roles_UserRole__Output);
}
