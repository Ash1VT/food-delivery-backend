// GENERATED CODE -- DO NOT EDIT!

// package: roles
// file: roles/roles.proto

import * as roles_roles_pb from "../roles/roles_pb";
import * as grpc from "@grpc/grpc-js";

interface IRolesServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getUserRole: grpc.MethodDefinition<roles_roles_pb.GetUserRoleRequest, roles_roles_pb.GetUserRoleResponse>;
}

export const RolesServiceService: IRolesServiceService;

export interface IRolesServiceServer extends grpc.UntypedServiceImplementation {
  getUserRole: grpc.handleUnaryCall<roles_roles_pb.GetUserRoleRequest, roles_roles_pb.GetUserRoleResponse>;
}

export class RolesServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  getUserRole(argument: roles_roles_pb.GetUserRoleRequest, callback: grpc.requestCallback<roles_roles_pb.GetUserRoleResponse>): grpc.ClientUnaryCall;
  getUserRole(argument: roles_roles_pb.GetUserRoleRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<roles_roles_pb.GetUserRoleResponse>): grpc.ClientUnaryCall;
  getUserRole(argument: roles_roles_pb.GetUserRoleRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<roles_roles_pb.GetUserRoleResponse>): grpc.ClientUnaryCall;
}
