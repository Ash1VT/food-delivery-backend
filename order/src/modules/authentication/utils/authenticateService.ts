import IBaseService from '@src/core/services/IBaseService';
import getLogger from '@src/core/setup/logger';
import { UserRole } from '@src/grpc/generated/roles/roles_pb';
import { GrpcUser } from '@src/grpc/user.type';
import IUserRepositoryFactory from '@src/modules/users/repositories/factories/interfaces/IUserRepositoryFactory';


const logger = getLogger(module)

export async function authenticateService(service: IBaseService, userRepositoryFactory: IUserRepositoryFactory, user?: GrpcUser): Promise<void>  {
    if (!user)
        return

    const userId = BigInt(user.userId)

    if (user.role === UserRole.USER_ROLE_CUSTOMER) {
        const customer = await userRepositoryFactory.createCustomerRepository().getOne(userId)

        if (!customer) {
            logger.error(`Customer with id=${user.userId} does not exist`)
            return
        }
        
        service.customer = customer
        logger.info(`Authenticated service with Customer with id=${customer.id}`)
        return
    }
    
    if (user.role === UserRole.USER_ROLE_COURIER) {
        const courier = await userRepositoryFactory.createCourierRepository().getOne(userId)

        if (!courier) {
            logger.error(`Courier with id=${user.userId} does not exist`)
            return
        }

        service.courier = courier
        logger.info(`Authenticated service with Courier with id=${courier.id}`)
        return
    }
    
    if (user.role === UserRole.USER_ROLE_RESTAURANT_MANAGER) {
        const restaurantManager = await userRepositoryFactory.createRestaurantManagerRepository().getOne(userId)

        if (!restaurantManager) {
            logger.error(`RestaurantManager with id=${user.userId} does not exist`)
            return
        }

        service.restaurantManager = restaurantManager
        logger.info(`Authenticated service with RestaurantManager with id=${restaurantManager.id}`)
        return
    }
    
    if (user.role === UserRole.USER_ROLE_MODERATOR) {
        const moderator = await userRepositoryFactory.createModeratorRepository().getOne(userId)

        if (!moderator) {
            logger.error(`Moderator with id=${user.userId} does not exist`)
            return
        }
        
        service.moderator = moderator
        logger.info(`Authenticated service with Moderator with id=${moderator.id}`)
        return
    }
}