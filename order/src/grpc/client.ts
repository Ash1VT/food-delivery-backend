import { credentials } from "@grpc/grpc-js";
import { RolesServiceClient } from "./generated/roles_grpc_pb";
import getSettings from "@src/utils/getSettings";

const settings = getSettings()
const host = `${settings.variables.rolesGrpcServerHost}:${settings.variables.rolesGrpcServerPort}`

export const client = new RolesServiceClient(host, credentials.createInsecure())