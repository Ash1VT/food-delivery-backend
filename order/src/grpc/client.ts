import { credentials } from "@grpc/grpc-js";
import { RolesServiceClient } from "./generated/roles/roles_grpc_pb";
import serverSettings from "@src/core/setup/settings/serverSettings";

const host = `${serverSettings.variables.rolesGrpcServerHost}:${serverSettings.variables.rolesGrpcServerPort}`

export const client = new RolesServiceClient(host, credentials.createInsecure())