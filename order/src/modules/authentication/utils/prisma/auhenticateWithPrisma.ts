import { Request } from 'express';
import { PrismaClient } from "@prisma/client";
import PrismaUserRepositoryFactory from "@src/modules/users/repositories/factories/implementations/prisma/PrismaUserRepositoryFactory";
import IBaseService from '@src/core/services/IBaseService';
import { authenticate } from '@src/modules/authentication/utils/authenticate';
import { authenticateService } from '@src/modules/authentication/utils/authenticateService';
import { GrpcUser } from '@src/grpc/user.type';

export async function authenticateWithPrisma(request: Request, prismaClient: PrismaClient, service: IBaseService): Promise<GrpcUser | undefined>  {
    const accessToken = request.cookies.access_token
    const userRepositoryFactory = new PrismaUserRepositoryFactory(prismaClient)
    const user = await authenticate(accessToken)
    await authenticateService(service, userRepositoryFactory, user)
    return user
}