import { client } from "./client";
import { GetUserRoleRequest } from "./generated/roles_pb";
import { GetUserRoleResponse } from './generated/roles/GetUserRoleResponse';

export async function getUser(accessToken: string): Promise<GetUserRoleResponse> {
    const getUserRoleRequest = new GetUserRoleRequest()
    getUserRoleRequest.setAccessToken(accessToken)

    return await new Promise<GetUserRoleResponse>((resolve, reject) => {
        client.getUserRole(getUserRoleRequest, (err, res) => {
            if (err) {
                reject(err)
            }
            if (res) {
                resolve(res.toObject())
            }
        })
    })
}