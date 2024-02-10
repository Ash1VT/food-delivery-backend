// Original file: protos/roles/roles.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GetUserRoleRequest as _roles_GetUserRoleRequest, GetUserRoleRequest__Output as _roles_GetUserRoleRequest__Output } from '../roles/GetUserRoleRequest';
import type { GetUserRoleResponse as _roles_GetUserRoleResponse, GetUserRoleResponse__Output as _roles_GetUserRoleResponse__Output } from '../roles/GetUserRoleResponse';

export interface RolesServiceClient extends grpc.Client {
  GetUserRole(argument: _roles_GetUserRoleRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_roles_GetUserRoleResponse__Output>): grpc.ClientUnaryCall;
  GetUserRole(argument: _roles_GetUserRoleRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_roles_GetUserRoleResponse__Output>): grpc.ClientUnaryCall;
  GetUserRole(argument: _roles_GetUserRoleRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_roles_GetUserRoleResponse__Output>): grpc.ClientUnaryCall;
  GetUserRole(argument: _roles_GetUserRoleRequest, callback: grpc.requestCallback<_roles_GetUserRoleResponse__Output>): grpc.ClientUnaryCall;
  getUserRole(argument: _roles_GetUserRoleRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_roles_GetUserRoleResponse__Output>): grpc.ClientUnaryCall;
  getUserRole(argument: _roles_GetUserRoleRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_roles_GetUserRoleResponse__Output>): grpc.ClientUnaryCall;
  getUserRole(argument: _roles_GetUserRoleRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_roles_GetUserRoleResponse__Output>): grpc.ClientUnaryCall;
  getUserRole(argument: _roles_GetUserRoleRequest, callback: grpc.requestCallback<_roles_GetUserRoleResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface RolesServiceHandlers extends grpc.UntypedServiceImplementation {
  GetUserRole: grpc.handleUnaryCall<_roles_GetUserRoleRequest__Output, _roles_GetUserRoleResponse>;
  
}

export interface RolesServiceDefinition extends grpc.ServiceDefinition {
  GetUserRole: MethodDefinition<_roles_GetUserRoleRequest, _roles_GetUserRoleResponse, _roles_GetUserRoleRequest__Output, _roles_GetUserRoleResponse__Output>
}
