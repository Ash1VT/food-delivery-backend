import { UserRoleMap } from "./generated/roles/roles_pb"

export type GrpcUser = {
    userId: string,
    role: UserRoleMap[keyof UserRoleMap]
}