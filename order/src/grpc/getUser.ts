import getLogger from "@src/core/setup/logger";
import { client } from "./client";
import { GetUserRoleRequest } from "./generated/roles/roles_pb";
import { GrpcUser } from "./user.type";
import { Status } from "@grpc/grpc-js/build/src/constants";

const logger = getLogger(module)

export async function getUser(accessToken: string): Promise<GrpcUser | null> {
    const getUserRoleRequest = new GetUserRoleRequest()
    getUserRoleRequest.setAccessToken(accessToken)

    return await new Promise<GrpcUser | null>((resolve, reject) => {
        client.getUserRole(getUserRoleRequest, (err, res) => {
            if (err) {
                
                if (err.code == Status.UNAUTHENTICATED) {
                    resolve(null)
                }

                logger.info(`Failed to authenticate user: ${err.message}`)
                reject(err)
            }
            if (res) {
                logger.info(`Authenticated User with id=${res.getUserId()} and role=${res.getRole()}`)
                resolve({
                    userId: res.getUserId(),
                    role: res.getRole()
                })
            }
        })
    })
}