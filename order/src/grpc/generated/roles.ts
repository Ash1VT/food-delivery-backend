import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { RolesServiceClient as _roles_RolesServiceClient, RolesServiceDefinition as _roles_RolesServiceDefinition } from './roles/RolesService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  roles: {
    GetUserRoleRequest: MessageTypeDefinition
    GetUserRoleResponse: MessageTypeDefinition
    RolesService: SubtypeConstructor<typeof grpc.Client, _roles_RolesServiceClient> & { service: _roles_RolesServiceDefinition }
    UserRole: EnumTypeDefinition
  }
}

