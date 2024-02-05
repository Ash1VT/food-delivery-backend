import { PromocodeMaximumUsageError } from './../src/modules/promotions/errors/promocode';
import { RestaurantManagerOwnershipError } from './../src/modules/users/errors/restaurantManager';
import { PromocodeCreateMapper, PromocodeGetMapper, PromocodeUpdateMapper } from './../src/modules/promotions/mappers/instances/promocode';
import { PrismaClient } from "@prisma/client"
import { CourierCreateMapper, CourierGetMapper } from "@src/modules/users/mappers/instances/courier"
import PrismaCourierRepository from "@src/modules/users/repositories/prisma/PrismaCourierRepository"
import CourierService from "@src/modules/users/services/instances/CourierService"
import { generateCourierCreateInputDto } from "./factories/users/courier"
import { CustomerCreateMapper } from "@src/modules/users/mappers/instances/customer"
import PrismaCustomerRepository from "@src/modules/users/repositories/prisma/PrismaCustomerRepository"
import CustomerService from "@src/modules/users/services/instances/CustomerService"
import { generateCustomerCreateInputDto } from "./factories/users/customer"
import { ModeratorCreateMapper } from "@src/modules/users/mappers/instances/moderator"
import PrismaModeratorRepository from "@src/modules/users/repositories/prisma/PrismaModeratorRepository"
import { generateModeratorCreateInputDto } from "./factories/users/moderator"
import PrismaRestaurantManagerRepository from "@src/modules/users/repositories/prisma/PrismaRestaurantManagerRepository"
import { RestaurantManagerCreateMapper } from "@src/modules/users/mappers/instances/restaurantManager"
import RestaurantManagerService from "@src/modules/users/services/instances/RestaurantManagerService"
import { createRestaurantManager, generateRestaurantManagerCreateInputDto, generateRestaurantManagerModel } from "./factories/users/restaurantManager"
import ModeratorService from "@src/modules/users/services/instances/ModeratorService"
import { RestaurantCreateMapper } from "@src/modules/restaurants/mappers/instances/restaurant"
import PrismaRestaurantRepository from "@src/modules/restaurants/repositories/prisma/PrismaRestaurantRepository"
import RestaurantService from "@src/modules/restaurants/services/instances/RestaurantService"
import { createRestaurant, generateRestaurantCreateInputDto } from "./factories/restaurants/restaurant"
import { MenuItemCreateMapper } from "@src/modules/menu/mappers/instances/menuItem"
import PrismaMenuItemRepository from "@src/modules/menu/repositories/prisma/PrismaMenuItemRepository"
import MenuItemService from "@src/modules/menu/services/instances/MenuItemService"
import { generateMenuItemCreateInputDto } from "./factories/menu/menuItem"
import { PromotionCreateMapper, PromotionGetMapper } from "@src/modules/promotions/mappers/instances/promotion"
import PrismaPromotionRepository from "@src/modules/promotions/repositories/prisma/PrismaPromotionRepository"
import PromotionService from "@src/modules/promotions/services/instances/PromotionService"
import { generatePromotionCreateInputDto } from "./factories/promotions/promotion"
import PrismaPromocodeRepository from '@src/modules/promotions/repositories/prisma/PrismaPromocodeRepository';
import PromocodeService from '@src/modules/promotions/services/instances/PromocodeService';
import { createPromocode, generatePromocodeCreateInputDto, generatePromocodeUpdateInputDto } from './factories/promotions/promocode';
import { mapManyModels } from '@src/utils/mapManyModels';
import { PermissionDeniedError } from '@src/modules/users/errors/permissions';
import { getUniqueNumberId } from './utils/unique';
import { RestaurantNotFoundWithIdError } from '@src/modules/restaurants/errors/restaurant';
import { PromocodeNotFoundWithIdError } from '@src/modules/promotions/errors/promocode';

describe("Tests for Services", () => {

    const manyCount = 5

    // COURIER

    describe('Tests for Courier Service', () => {
        const prismaClient = new PrismaClient()
        const courierCreateMapper = new CourierCreateMapper()
        const courierRepository = new PrismaCourierRepository(prismaClient)

        test("should create one courier", async () => {
            const courierService = new CourierService(courierCreateMapper, courierRepository)
            const courierCreateInputDto = generateCourierCreateInputDto()

            const expectedResult = {
                ...courierCreateInputDto
            }
            
            const result = await courierService.create(courierCreateInputDto)

            expect(result).toEqual(expectedResult)
        })

    })

    // CUSTOMER

    describe('Tests for Customer Service', () => {

        const prismaClient = new PrismaClient()
        const customerCreateMapper = new CustomerCreateMapper()
        const customerRepository = new PrismaCustomerRepository(prismaClient)

        test("should create one customer", async () => {
            const customerService = new CustomerService(customerCreateMapper, customerRepository)
            const customerCreateInputDto = generateCustomerCreateInputDto()

            const expectedResult = {
                ...customerCreateInputDto
            }
            
            const result = await customerService.create(customerCreateInputDto)

            expect(result).toEqual(expectedResult)
        })

    })

    // MODERATOR

    describe('Tests for Moderator Service', () => {
        const prismaClient = new PrismaClient()
        const moderatorCreateMapper = new ModeratorCreateMapper()
        const moderatorRepository = new PrismaModeratorRepository(prismaClient)

        test("should create one moderator", async () => {
            const moderatorService = new ModeratorService(moderatorCreateMapper, moderatorRepository)
            const moderatorCreateInputDto = generateModeratorCreateInputDto()

            const expectedResult = {
                ...moderatorCreateInputDto
            }
            
            const result = await moderatorService.create(moderatorCreateInputDto)

            expect(result).toEqual(expectedResult)
        })
    })

    // RESTAURANT MANAGER

    describe('Tests for Restaurant Manager Service', () => {
        const prismaClient = new PrismaClient()
        const restaurantManagerCreateMapper = new RestaurantManagerCreateMapper()
        const restaurantManagerRepository = new PrismaRestaurantManagerRepository(prismaClient)

        test("should create one restaurant manager", async () => {
            const restaurantManagerService = new RestaurantManagerService(restaurantManagerCreateMapper, restaurantManagerRepository)
            const restaurantManagerCreateInputDto = generateRestaurantManagerCreateInputDto()

            const expectedResult = {
                ...restaurantManagerCreateInputDto
            }
            
            const result = await restaurantManagerService.create(restaurantManagerCreateInputDto)

            expect(result).toEqual(expectedResult)
        })
    })

    // RESTAURANT

    describe('Tests for Restaurant Service', () => {
        const prismaClient = new PrismaClient()
        const restaurantCreateMapper = new RestaurantCreateMapper()
        const restaurantRepository = new PrismaRestaurantRepository(prismaClient)

        test("should create one restaurant", async () => {
            const restaurantService = new RestaurantService(restaurantCreateMapper, restaurantRepository)
            const restaurantCreateInputDto = generateRestaurantCreateInputDto()

            const expectedResult = {
                ...restaurantCreateInputDto
            }
            
            const result = await restaurantService.create(restaurantCreateInputDto)

            expect(result).toEqual(expectedResult)
        })
    })

    // MENU ITEM

    describe('Tests for Menu Item Service', () => {
        const prismaClient = new PrismaClient()
        const menuItemCreateMapper = new MenuItemCreateMapper()
        const menuItemRepository = new PrismaMenuItemRepository(prismaClient)

        test("should create one menu item", async () => {
            const menuItemService = new MenuItemService(menuItemCreateMapper, menuItemRepository)
            const restaurantInstance = await createRestaurant(prismaClient)
            const restaurantId = Number(restaurantInstance.id)
            
            const menuItemCreateInputDto = generateMenuItemCreateInputDto(restaurantId)

            const expectedResult = {
                ...menuItemCreateInputDto
            }
            
            const result = await menuItemService.create(menuItemCreateInputDto)

            expect(result).toEqual(expectedResult)
        })
    })

    // PROMOTION

    describe('Tests for Promotion Service', () => {
        const prismaClient = new PrismaClient()
        const promotionCreateMapper = new PromotionCreateMapper()
        const promotionRepository = new PrismaPromotionRepository(prismaClient)

        test("should create one promotion", async () => {
            const promotionService = new PromotionService(promotionCreateMapper, promotionRepository)
            
            const promotionCreateInputDto = generatePromotionCreateInputDto()

            const expectedResult = {
                ...promotionCreateInputDto
            }
            
            const result = await promotionService.create(promotionCreateInputDto)

            expect(result).toEqual(expectedResult)
        })
    })

    // PROMOCODE

    describe('Tests for Promocode Service', () => {
        const prismaClient = new PrismaClient()
        const promocodeGetMapper = new PromocodeGetMapper()
        const promocodeCreateMapper = new PromocodeCreateMapper()
        const promocodeUpdateMapper = new PromocodeUpdateMapper()
        const promocodeRepository = new PrismaPromocodeRepository(prismaClient)
        const restaurantRepository = new PrismaRestaurantRepository(prismaClient)

        test("should get all restaurant promocodes", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const restaurantId = Number(restaurant.id)

            const restaurantManager = await createRestaurantManager(prismaClient, restaurant.id)

            const promocodeInstances = await Promise.all(Array.from({length: manyCount}, async () => await createPromocode(prismaClient, restaurant.id)))

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository, restaurantManager)

            const expectedResult = mapManyModels(promocodeInstances, promocodeCreateMapper.toDto)

            const result = await promocodeService.getRestaurantPromocodes(restaurantId)
        
            expect(result).toEqual(expect.arrayContaining(expectedResult))
        })

        test("should not get all restaurant promocodes, due to missing restaurant manager", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const restaurantId = Number(restaurant.id)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository)

            const serviceCall = async () => {
                await promocodeService.getRestaurantPromocodes(restaurantId)
            }

            expect(serviceCall).rejects.toThrow(PermissionDeniedError)
        })

        test("should not get all restaurant promocodes, due to the fact that restaurant manager does not own restaurant", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const restaurantId = Number(restaurant.id)

            const restaurantManager = await createRestaurantManager(prismaClient)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository, restaurantManager)

            const serviceCall = async () => {
                await promocodeService.getRestaurantPromocodes(restaurantId)
            }

            expect(serviceCall).rejects.toThrow(RestaurantManagerOwnershipError)
        })

        // ENSURE THAT IT IS IN DATABASE !!!!
        test("should create one promocode", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const restaurantId = Number(restaurant.id)

            const restaurantManager = await createRestaurantManager(prismaClient, restaurant.id)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository, restaurantManager)
            
            const promocodeCreateInputDto = generatePromocodeCreateInputDto(restaurantId)

            const expectedResult = {
                ...promocodeCreateInputDto,
                currentUsageCount: 0,
                isActive: true
            }
            
            const promocodeCreateOutputDto = await promocodeService.create(promocodeCreateInputDto)

            const result = {
                ...promocodeCreateOutputDto,
                id: undefined
            }

            expect(result).toEqual(expectedResult)
        })

        test("should not create one promocode, due to missing restaurant manager", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const restaurantId = Number(restaurant.id)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository)
            
            const promocodeCreateInputDto = generatePromocodeCreateInputDto(restaurantId)
            
            const serviceCall = async () => {
                await promocodeService.create(promocodeCreateInputDto)
            }

            expect(serviceCall).rejects.toThrow(PermissionDeniedError)
        })

        test("should not create one promocode, due to non-existent restaurant", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const restaurantManager = await createRestaurantManager(prismaClient, restaurant.id)
            
            const nonExistentRestaurantId = getUniqueNumberId()

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository, restaurantManager)
            
            const promocodeCreateInputDto = generatePromocodeCreateInputDto(nonExistentRestaurantId)
            
            const serviceCall = async () => {
                await promocodeService.create(promocodeCreateInputDto)
            }

            expect(serviceCall).rejects.toThrow(RestaurantNotFoundWithIdError)
        })

        test("should not create one promocode, due to the fact that restaurant manager does not own restaurant", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const restaurantId = Number(restaurant.id)

            const restaurantManager = await createRestaurantManager(prismaClient)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository, restaurantManager)
            
            const promocodeCreateInputDto = generatePromocodeCreateInputDto(restaurantId)
            
            const serviceCall = async () => {
                await promocodeService.create(promocodeCreateInputDto)
            }

            expect(serviceCall).rejects.toThrow(RestaurantManagerOwnershipError)
        })

        // ENSUTE THAT PROMOCODE IS REALLY UPDATED IN DATABASE
        test("should update one promocode", async () => {
            const restaurant = await createRestaurant(prismaClient)

            const restaurantManager = await createRestaurantManager(prismaClient, restaurant.id)
            const promocode = await createPromocode(prismaClient, restaurant.id)
            const promocodeId = Number(promocode.id)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository, restaurantManager)
            
            const promocodeUpdateInputDto = generatePromocodeUpdateInputDto()

            const expectedResult = {
                ...promocodeUpdateInputDto
            }
            
            const promocodeUpdateOutputDto = await promocodeService.update(promocodeId, promocodeUpdateInputDto)

            const result = {
                ...promocodeUpdateOutputDto,
                id: undefined,
                nameIdentifier: undefined,
                currentUsageCount: undefined,
                isActive: undefined,
                restaurantId: undefined
            }

            expect(result).toEqual(expectedResult)
        })

        test("should not update one promocode, due to missing restaurant manager", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const promocode = await createPromocode(prismaClient, restaurant.id)
            const promocodeId = Number(promocode.id)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository)
            
            const promocodeUpdateInputDto = generatePromocodeUpdateInputDto()
            
            const serviceCall = async () => {
                await promocodeService.update(promocodeId, promocodeUpdateInputDto)
            }

            expect(serviceCall).rejects.toThrow(PermissionDeniedError)
        })

        test("should not update one promocode, due to non-existent promocode", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const restaurantManager = await createRestaurantManager(prismaClient, restaurant.id)

            const promocodeId = getUniqueNumberId()

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository, restaurantManager)
            
            const promocodeUpdateInputDto = generatePromocodeUpdateInputDto()
            
            const serviceCall = async () => {
                await promocodeService.update(promocodeId, promocodeUpdateInputDto)
            }

            expect(serviceCall).rejects.toThrow(PromocodeNotFoundWithIdError)
        })

        test("should not update one promocode, due to the fact that restaurant manager does not own restaurant", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const restaurantManager = await createRestaurantManager(prismaClient)
            const promocode = await createPromocode(prismaClient, restaurant.id)

            const promocodeId = Number(promocode.id)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository, restaurantManager)
            
            const promocodeUpdateInputDto = generatePromocodeUpdateInputDto()
            
            const serviceCall = async () => {
                await promocodeService.update(promocodeId, promocodeUpdateInputDto)
            }

            expect(serviceCall).rejects.toThrow(RestaurantManagerOwnershipError)
        })

        test("should not update one promocode, due to the fact that newly max usage count is less than current usage count", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const restaurantManager = await createRestaurantManager(prismaClient, restaurant.id)
            const promocode = await createPromocode(prismaClient, restaurant.id)

            const promocodeId = Number(promocode.id)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository, restaurantManager)
            
            const promocodeUpdateInputDto = generatePromocodeUpdateInputDto()
            promocodeUpdateInputDto.maxUsageCount = promocode.currentUsageCount - 1

            const serviceCall = async () => {
                await promocodeService.update(promocodeId, promocodeUpdateInputDto)
            }

            expect(serviceCall).rejects.toThrow(PromocodeMaximumUsageError)
        })

        test("should activate promocode", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const restaurantManager = await createRestaurantManager(prismaClient, restaurant.id)
            const promocode = await createPromocode(prismaClient, restaurant.id)

            const promocodeId = Number(promocode.id)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository, restaurantManager)

            await promocodeService.activate(promocodeId)

            const promocodeInstance = await promocodeRepository.getOne(promocodeId)

            expect(promocodeInstance?.isActive).toBeTruthy()
        })

        test("should not activate promocode, due to missing restaurant manager", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const promocode = await createPromocode(prismaClient, restaurant.id)

            const promocodeId = Number(promocode.id)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository)

            const serviceCall = async () => {
                await promocodeService.activate(promocodeId)
            }

            expect(serviceCall).rejects.toThrow(PermissionDeniedError)
        })

        test("should not activate promocode, due to non-existent promocode", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const restaurantManager = await createRestaurantManager(prismaClient, restaurant.id)
            const promocodeId = getUniqueNumberId()

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository, restaurantManager)

            const serviceCall = async () => {
                await promocodeService.activate(promocodeId)
            }

            expect(serviceCall).rejects.toThrow(PromocodeNotFoundWithIdError)
        })        

        test("should not activate promocode, due to the fact that restaurant manager does not own restaurant", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const restaurantManager = await createRestaurantManager(prismaClient)
            const promocode = await createPromocode(prismaClient, restaurant.id)

            const promocodeId = Number(promocode.id)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository, restaurantManager)

            const serviceCall = async () => {
                await promocodeService.activate(promocodeId)
            }

            expect(serviceCall).rejects.toThrow(RestaurantManagerOwnershipError)
        })        
        
        test("should deactivate promocode", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const restaurantManager = await createRestaurantManager(prismaClient, restaurant.id)
            const promocode = await createPromocode(prismaClient, restaurant.id)

            const promocodeId = Number(promocode.id)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository, restaurantManager)

            await promocodeService.deactivate(promocodeId)

            const promocodeInstance = await promocodeRepository.getOne(promocodeId)

            expect(promocodeInstance?.isActive).toBeFalsy()
        })

        test("should not deactivate promocode, due to missing restaurant manager", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const promocode = await createPromocode(prismaClient, restaurant.id)

            const promocodeId = Number(promocode.id)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository)

            const serviceCall = async () => {
                await promocodeService.deactivate(promocodeId)
            }

            expect(serviceCall).rejects.toThrow(PermissionDeniedError)
        })

        test("should not deactivate promocode, due to non-existent promocode", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const restaurantManager = await createRestaurantManager(prismaClient, restaurant.id)
            const promocodeId = getUniqueNumberId()

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository, restaurantManager)

            const serviceCall = async () => {
                await promocodeService.deactivate(promocodeId)
            }

            expect(serviceCall).rejects.toThrow(PromocodeNotFoundWithIdError)
        })   

        test("should not deactivate promocode, due to the fact that restaurant manager does not own restaurant", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const restaurantManager = await createRestaurantManager(prismaClient)
            const promocode = await createPromocode(prismaClient, restaurant.id)

            const promocodeId = Number(promocode.id)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository, restaurantManager)

            const serviceCall = async () => {
                await promocodeService.deactivate(promocodeId)
            }

            expect(serviceCall).rejects.toThrow(RestaurantManagerOwnershipError)
        })

    })

    // ORDER ITEM

    describe('Tests for Order Item Service', () => {

    })

    // ORDER

    describe('Tests for Order Service', () => {

    })

})