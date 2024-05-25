import getLogger from "@src/core/setup/logger";
import { getUser } from "@src/grpc/getUser";
import { GrpcUser } from '@src/grpc/user.type';


const logger = getLogger(module)

export async function authenticate(accessToken?: string): Promise<GrpcUser | undefined>  {
    if (!accessToken) {
        logger.info('Authenticated as anonymous user')
        return
    }

    const user = await getUser(accessToken)

    if (!user.role || !user.userId) {
        logger.info('Authenticated as anonymous user')
        return
    }
    
    return user

}