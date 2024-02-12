import { client } from "./client";
import { GetUserRoleRequest } from "./generated/roles/roles_pb";
import { GrpcUser } from "./user.type";

export async function getUser(accessToken: string): Promise<GrpcUser> {
    const getUserRoleRequest = new GetUserRoleRequest()
    getUserRoleRequest.setAccessToken(accessToken)

    return await new Promise<GrpcUser>((resolve, reject) => {
        client.getUserRole(getUserRoleRequest, (err, res) => {
            if (err) {
                reject(err)
            }
            if (res) {
                resolve({
                    userId: res.getUserId(),
                    role: res.getRole()
                })
            }
        })
    })
}