import { getUser } from "@src/grpc/getUser";
import { GrpcUser } from '@src/grpc/user.type';

export async function authenticate(accessToken?: string): Promise<GrpcUser | undefined>  {
    if (!accessToken)
        return

    const user = await getUser(accessToken)

    if (!user.role || !user.userId)
        return
    
    return user

}