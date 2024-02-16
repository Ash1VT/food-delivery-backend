import IBaseService from '@src/core/services/IBaseService';
import { UserRole } from '@src/grpc/generated/roles/roles_pb';
import { GrpcUser } from '@src/grpc/user.type';
import IUserRepositoryFactory from '@src/modules/users/repositories/factories/interfaces/IUserRepositoryFactory';

export async function authenticateService(service: IBaseService, userRepositoryFactory: IUserRepositoryFactory, user?: GrpcUser): Promise<void>  {
    if (!user)
        return

    const userId = BigInt(user.userId)

    if (user.role === UserRole.USER_ROLE_CUSTOMER) {
        const customer = await userRepositoryFactory.createCustomerRepository().getOne(userId)

        if (customer) {
            service.customer = customer
        }

        return
    }
    
    if (user.role === UserRole.USER_ROLE_COURIER) {
        const courier = await userRepositoryFactory.createCourierRepository().getOne(userId)

        if (courier) {
            service.courier = courier
        }

        return
    }
    
    if (user.role === UserRole.USER_ROLE_RESTAURANT_MANAGER) {
        const restaurantManager = await userRepositoryFactory.createRestaurantManagerRepository().getOne(userId)

        if (restaurantManager) {
            service.restaurantManager = restaurantManager
        }

        return
    }
    
    if (user.role === UserRole.USER_ROLE_MODERATOR) {
        const moderator = await userRepositoryFactory.createModeratorRepository().getOne(userId)

        if (moderator) {
            service.moderator = moderator
        }

        return
    }
}