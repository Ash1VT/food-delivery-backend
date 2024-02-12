import { PromocodeAlreadyExistsWithNameError, PromocodeMaximumUsageError, PromocodeNotActiveError, PromocodeNotBelongsToRestaurantError, PromocodeNotFoundWithNameError, PromocodeAmountUsageError, PromocodeExpiredUsageError, PromocodeNotStartUsageError } from '../src/modules/promotions/errors/promocode.errors';
import { RestaurantManagerOwnershipError } from '../src/modules/users/errors/restaurantManager.errors';
import { PromocodeCreateMapper, PromocodeGetMapper, PromocodeUpdateMapper } from '../src/modules/promotions/mappers/implementations/promocode.mappers';
import { MenuItem, PrismaClient } from "@prisma/client"
import { CourierCreateMapper, CourierGetMapper } from "@src/modules/users/mappers/implementations/courier.mappers"
import PrismaCourierRepository from "@src/modules/users/repositories/implementations/prisma/PrismaCourierRepository"
import CourierService from "@src/modules/users/services/implementations/CourierService"
import { createCourier, generateCourierCreateInputDto } from "./factories/users/courier"
import { CustomerCreateMapper } from "@src/modules/users/mappers/implementations/customer.mappers"
import PrismaCustomerRepository from "@src/modules/users/repositories/implementations/prisma/PrismaCustomerRepository"
import CustomerService from "@src/modules/users/services/implementations/CustomerService"
import { createCustomer, generateCustomerCreateInputDto } from "./factories/users/customer"
import { ModeratorCreateMapper } from "@src/modules/users/mappers/implementations/moderator.mappers"
import PrismaModeratorRepository from "@src/modules/users/repositories/implementations/prisma/PrismaModeratorRepository"
import { createModerator, generateModeratorCreateInputDto } from "./factories/users/moderator"
import PrismaRestaurantManagerRepository from "@src/modules/users/repositories/implementations/prisma/PrismaRestaurantManagerRepository"
import { RestaurantManagerCreateMapper } from "@src/modules/users/mappers/implementations/restaurantManager.mappers"
import RestaurantManagerService from "@src/modules/users/services/implementations/RestaurantManagerService"
import { createRestaurantManager, generateRestaurantManagerCreateInputDto } from "./factories/users/restaurantManager"
import ModeratorService from "@src/modules/users/services/implementations/ModeratorService"
import { RestaurantCreateMapper } from "@src/modules/restaurants/mappers/implementations/restaurant.mappers"
import PrismaRestaurantRepository from "@src/modules/restaurants/repositories/implementations/prisma/PrismaRestaurantRepository"
import RestaurantService from "@src/modules/restaurants/services/implementations/RestaurantService"
import { createRestaurant, generateRestaurantCreateInputDto } from "./factories/restaurants/restaurant"
import { MenuItemCreateMapper } from "@src/modules/menu/mappers/implementations/menuItem.mappers"
import PrismaMenuItemRepository from "@src/modules/menu/repositories/implementations/prisma/PrismaMenuItemRepository"
import MenuItemService from "@src/modules/menu/services/implementations/MenuItemService"
import { createMenuItem, generateMenuItemCreateInputDto } from "./factories/menu/menuItem"
import { PromotionCreateMapper } from "@src/modules/promotions/mappers/implementations/promotion.mappers"
import PrismaPromotionRepository from "@src/modules/promotions/repositories/implementations/prisma/PrismaPromotionRepository"
import PromotionService from "@src/modules/promotions/services/implementations/PromotionService"
import { generatePromotionCreateInputDto } from "./factories/promotions/promotion"
import PrismaPromocodeRepository from '@src/modules/promotions/repositories/implementations/prisma/PrismaPromocodeRepository';
import PromocodeService from '@src/modules/promotions/services/implementations/PromocodeService';
import { createPromocode, generatePromocodeCreateInputDto, generatePromocodeUpdateInputDto } from './factories/promotions/promocode';
import { PermissionDeniedError } from '@src/modules/users/errors/permissions.errors';
import { getUniqueId } from './utils/unique';
import { RestaurantNotFoundWithIdError } from '@src/modules/restaurants/errors/restaurant.errors';
import { PromocodeNotFoundWithIdError } from '@src/modules/promotions/errors/promocode.errors';
import { OrderItemGetMapper, OrderItemCreateMapper } from '@src/modules/orders/mappers/implementations/orderItem.mappers';
import PrismaOrderItemRepository from '@src/modules/orders/repositories/implementations/prisma/PrismaOrderItemRepository';
import PrismaOrderRepository from '@src/modules/orders/repositories/implementations/prisma/PrismaOrderRepository';
import { createOrder, generateOrderCreateInputDto, generateOrderModel } from './factories/orders/order';
import { generateOrderItemCreateInputDto, generateOrderItemWithOrderCreateInputModel } from './factories/orders/orderItem';
import OrderService from '@src/modules/orders/services/implementations/OrderService';
import { OrderItemService } from '@src/modules/orders/services/implementations/OrderItemService';
import { OrderNotDeliveringError, OrderNotFoundWithIdError, OrderNotReadyError } from '@src/modules/orders/errors/order.errors';
import { CustomerOwnershipError } from '@src/modules/users/errors/customer.errors';
import { CourierOwnershipError } from '@src/modules/users/errors/courier.errors';
import { MenuItemAllNotInSameRestaurantError, MenuItemAlreadyInOrderError, MenuItemNotFoundWithIdError, MenuItemNotInSameOrderRestaurantError } from '@src/modules/menu/errors/menuItem.errors';
import { OrderGetMapper, OrderCreateMapper } from '@src/modules/orders/mappers/implementations/order.mappers';
import { fa, faker } from '@faker-js/faker';

describe("Tests for Services", () => {
    const prismaClient = new PrismaClient()
    const manyCount = 5

    // COURIER

    describe('Tests for Courier Service', () => {
        const courierCreateMapper = new CourierCreateMapper()
        const courierRepository = new PrismaCourierRepository(prismaClient)

        test("should create one courier", async () => {
            const courierService = new CourierService(courierCreateMapper, courierRepository)
            const courierCreateInputDto = generateCourierCreateInputDto()

            const expectedResult = {
                ...courierCreateInputDto
            }
            
            const courierCreateOutputDto = await courierService.create(courierCreateInputDto)

            const result = {
                ...courierCreateOutputDto
            }

            expect(result).toEqual(expectedResult)

            const courierInstance = await prismaClient.courier.findFirst({
                where: {
                    id: courierCreateOutputDto.id
                }
            })

            const instanceResult = {
                id: courierInstance?.id
            }

            expect(instanceResult).toEqual(expectedResult)
        })

    })

    // CUSTOMER

    describe('Tests for Customer Service', () => {
        const customerCreateMapper = new CustomerCreateMapper()
        const customerRepository = new PrismaCustomerRepository(prismaClient)

        test("should create one customer", async () => {
            const customerService = new CustomerService(customerCreateMapper, customerRepository)
            const customerCreateInputDto = generateCustomerCreateInputDto()

            const expectedResult = {
                ...customerCreateInputDto
            }
            
            const customerCreateOutputDto = await customerService.create(customerCreateInputDto)

            const result = {
                ...customerCreateOutputDto
            }

            expect(result).toEqual(expectedResult)

            const customerInstance = await prismaClient.customer.findFirst({
                where: {
                    id: customerCreateOutputDto.id
                }
            })

            const instanceResult = {
                id: customerInstance?.id
            }

            expect(instanceResult).toEqual(expectedResult)
        })

    })

    // MODERATOR

    describe('Tests for Moderator Service', () => {
        const moderatorCreateMapper = new ModeratorCreateMapper()
        const moderatorRepository = new PrismaModeratorRepository(prismaClient)

        test("should create one moderator", async () => {
            const moderatorService = new ModeratorService(moderatorCreateMapper, moderatorRepository)
            const moderatorCreateInputDto = generateModeratorCreateInputDto()

            const expectedResult = {
                ...moderatorCreateInputDto
            }
            
            const moderatorCreateOutputDto = await moderatorService.create(moderatorCreateInputDto)

            const result = {
                ...moderatorCreateOutputDto
            }

            expect(result).toEqual(expectedResult)

            const moderatorInstance = await prismaClient.moderator.findFirst({
                where: {
                    id: moderatorCreateOutputDto.id
                }
            })

            const instanceResult = {
                id: moderatorInstance?.id
            }

            expect(instanceResult).toEqual(expectedResult)
        })
    })

    // RESTAURANT MANAGER

    describe('Tests for Restaurant Manager Service', () => {
        const restaurantManagerCreateMapper = new RestaurantManagerCreateMapper()
        const restaurantManagerRepository = new PrismaRestaurantManagerRepository(prismaClient)

        test("should create one restaurant manager", async () => {
            const restaurantManagerService = new RestaurantManagerService(restaurantManagerCreateMapper, restaurantManagerRepository)
            const restaurantManagerCreateInputDto = generateRestaurantManagerCreateInputDto()

            const expectedResult = {
                ...restaurantManagerCreateInputDto
            }
            
            const restaurantManagerCreateOutputDto = await restaurantManagerService.create(restaurantManagerCreateInputDto)

            const result = {
                ...restaurantManagerCreateOutputDto
            }

            expect(result).toEqual(expectedResult)

            const restaurantManagerInstance = await prismaClient.restaurantManager.findFirst({
                where: {
                    id: restaurantManagerCreateOutputDto.id
                }
            })

            const instanceResult = {
                id: restaurantManagerInstance?.id
            }

            expect(instanceResult).toEqual(expectedResult)
        })
    })

    // RESTAURANT

    describe('Tests for Restaurant Service', () => {
        const restaurantCreateMapper = new RestaurantCreateMapper()
        const restaurantRepository = new PrismaRestaurantRepository(prismaClient)

        test("should create one restaurant", async () => {
            const restaurantService = new RestaurantService(restaurantCreateMapper, restaurantRepository)
            const restaurantCreateInputDto = generateRestaurantCreateInputDto()

            const expectedResult = {
                ...restaurantCreateInputDto
            }
            
            const restaurantCreateOutputDto = await restaurantService.create(restaurantCreateInputDto)

            const result = {
                ...restaurantCreateOutputDto
            }

            expect(result).toEqual(expectedResult)

            const restaurantInstance = await prismaClient.restaurant.findFirst({
                where: {
                    id: restaurantCreateOutputDto.id
                }
            })

            const instanceResult = {
                id: restaurantInstance?.id
            }

            expect(instanceResult).toEqual(expectedResult)
        })
    })

    // MENU ITEM

    describe('Tests for Menu Item Service', () => {
        const menuItemCreateMapper = new MenuItemCreateMapper()
        const menuItemRepository = new PrismaMenuItemRepository(prismaClient)

        test("should create one menu item", async () => {
            const menuItemService = new MenuItemService(menuItemCreateMapper, menuItemRepository)
            const restaurant = await createRestaurant(prismaClient)
            
            const menuItemCreateInputDto = generateMenuItemCreateInputDto(restaurant.id)

            const expectedResult = {
                ...menuItemCreateInputDto
            }
            
            const menuItemCreateOutputDto = await menuItemService.create(menuItemCreateInputDto)

            const result = {
                ...menuItemCreateOutputDto
            }

            expect(result).toEqual(expectedResult)

            const menuItemInstance = await prismaClient.menuItem.findFirst({
                where: {
                    id: menuItemCreateOutputDto.id
                }
            })

            const instanceResult = {
                ...menuItemInstance,
                id: menuItemInstance?.id,
                restaurantId: menuItemInstance?.restaurantId
            }

            expect(instanceResult).toEqual(expectedResult)
        })
    })

    // PROMOTION

    describe('Tests for Promotion Service', () => {
        const prismaClient = new PrismaClient()
        const promotionCreateMapper = new PromotionCreateMapper()
        const promotionRepository = new PrismaPromotionRepository(prismaClient)

        afterAll(async () => {
            await prismaClient.$disconnect()
        })

        test("should create one promotion", async () => {
            const promotionService = new PromotionService(promotionCreateMapper, promotionRepository)
            
            const promotionCreateInputDto = generatePromotionCreateInputDto()

            const expectedResult = {
                ...promotionCreateInputDto
            }
            
            const promotionCreateOutputDto = await promotionService.create(promotionCreateInputDto)

            const result = {
                ...promotionCreateOutputDto
            }

            expect(result).toEqual(expectedResult)

            const promotionInstance = await prismaClient.promotion.findFirst({
                where: {
                    id: promotionCreateOutputDto.id
                }
            })

            const instanceResult = {
                id: promotionInstance?.id
            }

            expect(instanceResult).toEqual(expectedResult)
        })
    })

    // PROMOCODE

    describe('Tests for Promocode Service', () => {
        const promocodeGetMapper = new PromocodeGetMapper()
        const promocodeCreateMapper = new PromocodeCreateMapper()
        const promocodeUpdateMapper = new PromocodeUpdateMapper()
        const promocodeRepository = new PrismaPromocodeRepository(prismaClient)
        const restaurantRepository = new PrismaRestaurantRepository(prismaClient)

        test("should get all restaurant promocodes", async () => {
            const restaurant = await createRestaurant(prismaClient)

            const restaurantManager = await createRestaurantManager(prismaClient, restaurant.id)

            const promocodeInstances = await Promise.all(Array.from({length: manyCount}, async () => await createPromocode(prismaClient, restaurant.id)))

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository)
            promocodeService.restaurantManager = restaurantManager

            const expectedResult = promocodeInstances.map((promocodeIntsance) => promocodeCreateMapper.toDto(promocodeIntsance))

            const result = await promocodeService.getRestaurantPromocodes(restaurant.id)
        
            expect(result).toEqual(expect.arrayContaining(expectedResult))
        })

        test("should not get all restaurant promocodes, due to missing restaurant manager", async () => {
            const restaurant = await createRestaurant(prismaClient)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository)

            const serviceCall = async () => {
                await promocodeService.getRestaurantPromocodes(restaurant.id)
            }

            expect(serviceCall).rejects.toThrow(PermissionDeniedError)
        })

        test("should not get all restaurant promocodes, due to the fact that restaurant manager does not own restaurant", async () => {
            const restaurant = await createRestaurant(prismaClient)

            const restaurantManager = await createRestaurantManager(prismaClient)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository)
            promocodeService.restaurantManager = restaurantManager

            const serviceCall = async () => {
                await promocodeService.getRestaurantPromocodes(restaurant.id)
            }

            expect(serviceCall).rejects.toThrow(RestaurantManagerOwnershipError)
        })

        test("should create one promocode", async () => {
            const restaurant = await createRestaurant(prismaClient)

            const restaurantManager = await createRestaurantManager(prismaClient, restaurant.id)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository)
            promocodeService.restaurantManager = restaurantManager
            
            const promocodeCreateInputDto = generatePromocodeCreateInputDto(restaurant.id)

            const expectedResult = {
                ...promocodeCreateInputDto,
                validFrom: promocodeCreateInputDto.validFrom.toISOString(),
                validUntil: promocodeCreateInputDto.validUntil.toISOString(),
                currentUsageCount: 0,
                isActive: true
            }
            
            const promocodeCreateOutputDto = await promocodeService.create(promocodeCreateInputDto)

            const result = {
                ...promocodeCreateOutputDto,
                id: undefined
            }

            expect(result).toEqual(expectedResult)

            const promocodeInstance = await prismaClient.promocode.findFirst({
                where: {
                    id: promocodeCreateOutputDto.id
                }
            })

            const instanceResult = {
                ...promocodeInstance,
                id: undefined,
                restaurantId: promocodeInstance?.restaurantId,
                validFrom: promocodeInstance?.validFrom.toISOString(),
                validUntil: promocodeInstance?.validUntil.toISOString(),
            }

            expect(instanceResult).toEqual(expectedResult)
        })

        test("should not create one promocode, due to missing restaurant manager", async () => {
            const restaurant = await createRestaurant(prismaClient)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository)
            
            const promocodeCreateInputDto = generatePromocodeCreateInputDto(restaurant.id)
            
            const serviceCall = async () => {
                await promocodeService.create(promocodeCreateInputDto)
            }

            expect(serviceCall).rejects.toThrow(PermissionDeniedError)
        })

        test("should not create one promocode, due to the fact that promocode with such name already exists", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const promocode = await createPromocode(prismaClient, restaurant.id)
            const restaurantManager = await createRestaurantManager(prismaClient, restaurant.id)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository)
            promocodeService.restaurantManager = restaurantManager
            
            const promocodeCreateInputDto = generatePromocodeCreateInputDto(restaurant.id)
            
            promocodeCreateInputDto.nameIdentifier = promocode.nameIdentifier

            const serviceCall = async () => {
                await promocodeService.create(promocodeCreateInputDto)
            }

            expect(serviceCall).rejects.toThrow(PromocodeAlreadyExistsWithNameError)
        })

        test("should not create one promocode, due to non-existent restaurant", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const restaurantManager = await createRestaurantManager(prismaClient, restaurant.id)
            
            const nonExistentRestaurantId = getUniqueId()

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository)
            promocodeService.restaurantManager = restaurantManager
            
            const promocodeCreateInputDto = generatePromocodeCreateInputDto(nonExistentRestaurantId)
            
            const serviceCall = async () => {
                await promocodeService.create(promocodeCreateInputDto)
            }

            expect(serviceCall).rejects.toThrow(RestaurantNotFoundWithIdError)
        })

        test("should not create one promocode, due to the fact that restaurant manager does not own restaurant", async () => {
            const restaurant = await createRestaurant(prismaClient)

            const restaurantManager = await createRestaurantManager(prismaClient)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository)
            promocodeService.restaurantManager = restaurantManager
            
            const promocodeCreateInputDto = generatePromocodeCreateInputDto(restaurant.id)
            
            const serviceCall = async () => {
                await promocodeService.create(promocodeCreateInputDto)
            }

            expect(serviceCall).rejects.toThrow(RestaurantManagerOwnershipError)
        })

        test("should update one promocode", async () => {
            const restaurant = await createRestaurant(prismaClient)

            const restaurantManager = await createRestaurantManager(prismaClient, restaurant.id)
            const promocode = await createPromocode(prismaClient, restaurant.id)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository)
            promocodeService.restaurantManager = restaurantManager
            
            const promocodeUpdateInputDto = generatePromocodeUpdateInputDto()

            const expectedResult = {
                ...promocodeUpdateInputDto,
                validFrom: promocodeUpdateInputDto.validFrom.toISOString(),
                validUntil: promocodeUpdateInputDto.validUntil.toISOString(),
            }
            
            const promocodeUpdateOutputDto = await promocodeService.update(promocode.id, promocodeUpdateInputDto)

            const result = {
                ...promocodeUpdateOutputDto,
                id: undefined,
                nameIdentifier: undefined,
                currentUsageCount: undefined,
                isActive: undefined,
                restaurantId: undefined
            }

            expect(result).toEqual(expectedResult)

            const promocodeInstance = await prismaClient.promocode.findFirst({
                where: {
                    id: promocode.id
                }
            })

            const instanceResult = {
                discountPercentage: promocodeInstance?.discountPercentage,
                maxUsageCount: promocodeInstance?.maxUsageCount,
                validFrom: promocodeInstance?.validFrom.toISOString(),
                validUntil: promocodeInstance?.validUntil.toISOString(),
            }

            expect(instanceResult).toEqual(expectedResult)
        })

        test("should not update one promocode, due to missing restaurant manager", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const promocode = await createPromocode(prismaClient, restaurant.id)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository)
            
            const promocodeUpdateInputDto = generatePromocodeUpdateInputDto()
            
            const serviceCall = async () => {
                await promocodeService.update(promocode.id, promocodeUpdateInputDto)
            }

            expect(serviceCall).rejects.toThrow(PermissionDeniedError)
        })

        test("should not update one promocode, due to non-existent promocode", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const restaurantManager = await createRestaurantManager(prismaClient, restaurant.id)

            const nonExistentPromocodeId = getUniqueId()

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository)
            promocodeService.restaurantManager = restaurantManager
            
            const promocodeUpdateInputDto = generatePromocodeUpdateInputDto()
            
            const serviceCall = async () => {
                await promocodeService.update(nonExistentPromocodeId, promocodeUpdateInputDto)
            }

            expect(serviceCall).rejects.toThrow(PromocodeNotFoundWithIdError)
        })

        test("should not update one promocode, due to the fact that restaurant manager does not own restaurant", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const restaurantManager = await createRestaurantManager(prismaClient)
            const promocode = await createPromocode(prismaClient, restaurant.id)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository)
            promocodeService.restaurantManager = restaurantManager
            
            const promocodeUpdateInputDto = generatePromocodeUpdateInputDto()
            
            const serviceCall = async () => {
                await promocodeService.update(promocode.id, promocodeUpdateInputDto)
            }

            expect(serviceCall).rejects.toThrow(RestaurantManagerOwnershipError)
        })

        test("should not update one promocode, due to the fact that newly max usage count is less than current usage count", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const restaurantManager = await createRestaurantManager(prismaClient, restaurant.id)
            const promocode = await createPromocode(prismaClient, restaurant.id)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository)
            promocodeService.restaurantManager = restaurantManager
            
            const promocodeUpdateInputDto = generatePromocodeUpdateInputDto()
            promocodeUpdateInputDto.maxUsageCount = promocode.currentUsageCount - 1

            const serviceCall = async () => {
                await promocodeService.update(promocode.id, promocodeUpdateInputDto)
            }

            expect(serviceCall).rejects.toThrow(PromocodeMaximumUsageError)
        })

        test("should activate promocode", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const restaurantManager = await createRestaurantManager(prismaClient, restaurant.id)
            const promocode = await createPromocode(prismaClient, restaurant.id)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository)
            promocodeService.restaurantManager = restaurantManager

            await promocodeService.activate(promocode.id)

            const promocodeInstance = await prismaClient.promocode.findFirst({
                where: {
                    id: promocode.id
                }
            })

            expect(promocodeInstance?.isActive).toBeTruthy()
        })

        test("should not activate promocode, due to missing restaurant manager", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const promocode = await createPromocode(prismaClient, restaurant.id)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository)

            const serviceCall = async () => {
                await promocodeService.activate(promocode.id)
            }

            expect(serviceCall).rejects.toThrow(PermissionDeniedError)
        })

        test("should not activate promocode, due to non-existent promocode", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const restaurantManager = await createRestaurantManager(prismaClient, restaurant.id)
            const nonExistentPromocodeId = getUniqueId()

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository)
            promocodeService.restaurantManager = restaurantManager

            const serviceCall = async () => {
                await promocodeService.activate(nonExistentPromocodeId)
            }

            expect(serviceCall).rejects.toThrow(PromocodeNotFoundWithIdError)
        })        

        test("should not activate promocode, due to the fact that restaurant manager does not own restaurant", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const restaurantManager = await createRestaurantManager(prismaClient)
            const promocode = await createPromocode(prismaClient, restaurant.id)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository)
            promocodeService.restaurantManager = restaurantManager

            const serviceCall = async () => {
                await promocodeService.activate(promocode.id)
            }

            expect(serviceCall).rejects.toThrow(RestaurantManagerOwnershipError)
        })        
        
        test("should deactivate promocode", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const restaurantManager = await createRestaurantManager(prismaClient, restaurant.id)
            const promocode = await createPromocode(prismaClient, restaurant.id)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository)
            promocodeService.restaurantManager = restaurantManager

            await promocodeService.deactivate(promocode.id)

            const promocodeInstance = await prismaClient.promocode.findFirst({
                where: {
                    id: promocode.id
                }
            })

            expect(promocodeInstance?.isActive).toBeFalsy()
        })

        test("should not deactivate promocode, due to missing restaurant manager", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const promocode = await createPromocode(prismaClient, restaurant.id)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository)

            const serviceCall = async () => {
                await promocodeService.deactivate(promocode.id)
            }

            expect(serviceCall).rejects.toThrow(PermissionDeniedError)
        })

        test("should not deactivate promocode, due to non-existent promocode", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const restaurantManager = await createRestaurantManager(prismaClient, restaurant.id)

            const nonExistentPromocodeId = getUniqueId()

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository)
            promocodeService.restaurantManager = restaurantManager

            const serviceCall = async () => {
                await promocodeService.deactivate(nonExistentPromocodeId)
            }

            expect(serviceCall).rejects.toThrow(PromocodeNotFoundWithIdError)
        })   

        test("should not deactivate promocode, due to the fact that restaurant manager does not own restaurant", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const restaurantManager = await createRestaurantManager(prismaClient)
            const promocode = await createPromocode(prismaClient, restaurant.id)

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository)
            promocodeService.restaurantManager = restaurantManager

            const serviceCall = async () => {
                await promocodeService.deactivate(promocode.id)
            }

            expect(serviceCall).rejects.toThrow(RestaurantManagerOwnershipError)
        })

    })

    // ORDER ITEM

    describe('Tests for Order Item Service', () => {
        const orderItemGetMapper = new OrderItemGetMapper()
        const orderItemCreateMapper = new OrderItemCreateMapper()
        const orderItemRepository = new PrismaOrderItemRepository(prismaClient)
        const orderRepository = new PrismaOrderRepository(prismaClient)
        const menuItemRepository = new PrismaMenuItemRepository(prismaClient)

        test("should get all order items with customer role", async () => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())

            const expectedResult = orderItemCreateInputs.map((orderItemCreateInput) => {
                return {
                    ...orderItemCreateInput
                }
            })

            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs)

            const orderItemService = new OrderItemService(orderItemGetMapper, orderItemCreateMapper, orderItemRepository, orderRepository, menuItemRepository)
            orderItemService.customer = customer


            const orderItemsGetOutputs = await orderItemService.getOrderItems(order.id)

            const result = orderItemsGetOutputs.map((orderItemGetOutput) => {
                return {
                    ...orderItemGetOutput,
                    id: undefined,
                    orderId: undefined
                }
            })
            expect(result.length).not.toBe(0)
            expect(result).toEqual(expect.arrayContaining(expectedResult))

        })

        test("should get all order items with courier role", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())

            const expectedResult = orderItemCreateInputs.map((orderItemCreateInput) => {
                return {
                    ...orderItemCreateInput
                }
            })

            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs, courier.id)

            const orderItemService = new OrderItemService(orderItemGetMapper, orderItemCreateMapper, orderItemRepository, orderRepository, menuItemRepository)
            orderItemService.courier = courier

            const orderItemsGetOutputs = await orderItemService.getOrderItems(order.id)

            const result = orderItemsGetOutputs.map((orderItemGetOutput) => {
                return {
                    ...orderItemGetOutput,
                    id: undefined,
                    orderId: undefined
                }
            })

            expect(result).toEqual(expect.arrayContaining(expectedResult))
        })

        test("should not get all order items, due to missing customer and courier", async () => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())
            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs)

            const orderItemService = new OrderItemService(orderItemGetMapper, orderItemCreateMapper, orderItemRepository, orderRepository, menuItemRepository)

            const serviceCall = async () => {
                await orderItemService.getOrderItems(order.id)
            }

            expect(serviceCall).rejects.toThrow(PermissionDeniedError)
        })

        test("should not get all order items, due to non-existent order", async () => {
            const customer = await createCustomer(prismaClient)

            const nonExistentOrderId = getUniqueId()

            const orderItemService = new OrderItemService(orderItemGetMapper, orderItemCreateMapper, orderItemRepository, orderRepository, menuItemRepository)
            orderItemService.customer = customer

            const serviceCall = async () => {
                await orderItemService.getOrderItems(nonExistentOrderId)
            }

            expect(serviceCall).rejects.toThrow(OrderNotFoundWithIdError)
        })

        test("should not get all order items, due to the fact that customer does not own order", async () => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())
            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs)

            const anotherCustomer = await createCustomer(prismaClient)

            const orderItemService = new OrderItemService(orderItemGetMapper, orderItemCreateMapper, orderItemRepository, orderRepository, menuItemRepository)
            orderItemService.customer = anotherCustomer

            const serviceCall = async () => {
                await orderItemService.getOrderItems(order.id)
            }

            expect(serviceCall).rejects.toThrow(CustomerOwnershipError)
        })

        test("should not get all order items, due to the fact that courier does not own order", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())
            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs, courier.id)

            const anotherCourier = await createCustomer(prismaClient)

            const orderItemService = new OrderItemService(orderItemGetMapper, orderItemCreateMapper, orderItemRepository, orderRepository, menuItemRepository)
            orderItemService.courier = anotherCourier

            const serviceCall = async () => {
                await orderItemService.getOrderItems(order.id)
            }

            expect(serviceCall).rejects.toThrow(CourierOwnershipError)
        })

        test("should add order item to order", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())
            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs, courier.id)
            const menuItem = await createMenuItem(prismaClient, restaurant.id)


            const orderItemCreateInput = generateOrderItemCreateInputDto(menuItem.id)

            const expectedResult = {
                menuItemName: menuItem.name,
                menuItemImageUrl: menuItem.imageUrl,
                menuItemPrice: menuItem.price,
                orderId: order.id,
                quantity: orderItemCreateInput.quantity
            }

            const orderItemService = new OrderItemService(orderItemGetMapper, orderItemCreateMapper, orderItemRepository, orderRepository, menuItemRepository)
            orderItemService.customer = customer

            const orderItemCreateOutput = await orderItemService.addOrderItem(order.id, orderItemCreateInput)

            const result = {
                ...orderItemCreateOutput,
                id: undefined
            }

            expect(result).toEqual(expectedResult)

            const orderItemInstance = await prismaClient.orderItem.findFirst({
                where: {
                    id: orderItemCreateOutput.id
                }
            }) 

            const instanceExpectedResult = {
                menuItemName: orderItemInstance?.menuItemName,
                menuItemImageUrl: orderItemInstance?.menuItemImageUrl,
                menuItemPrice: orderItemInstance?.menuItemPrice,
                orderId: orderItemInstance?.orderId,
                quantity: orderItemInstance?.quantity
            }

            expect(result).toEqual(instanceExpectedResult)
        })

        test("should not add order item to order, due to missing customer", async () => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())
            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs)
            const menuItem = await createMenuItem(prismaClient, restaurant.id)

            const orderItemCreateInput = generateOrderItemCreateInputDto(menuItem.id)

            const orderItemService = new OrderItemService(orderItemGetMapper, orderItemCreateMapper, orderItemRepository, orderRepository, menuItemRepository)

            const serviceCall = async () => {
                await orderItemService.addOrderItem(order.id, orderItemCreateInput)
            }

            expect(serviceCall).rejects.toThrow(PermissionDeniedError)
        })

        test("should not add order item to order, due to non-existent order", async () => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const menuItem = await createMenuItem(prismaClient, restaurant.id)

            const nonExistentOrderId = getUniqueId()

            const orderItemCreateInput = generateOrderItemCreateInputDto(menuItem.id)

            const orderItemService = new OrderItemService(orderItemGetMapper, orderItemCreateMapper, orderItemRepository, orderRepository, menuItemRepository)
            orderItemService.customer = customer

            const serviceCall = async () => {
                await orderItemService.addOrderItem(nonExistentOrderId, orderItemCreateInput)
            }

            expect(serviceCall).rejects.toThrow(OrderNotFoundWithIdError)
        })

        test("should not add order item to order, due to non-existent menu item", async () => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())
            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs)

            const nonExistentMenuItemId = getUniqueId()

            const orderItemCreateInput = generateOrderItemCreateInputDto(nonExistentMenuItemId)

            const orderItemService = new OrderItemService(orderItemGetMapper, orderItemCreateMapper, orderItemRepository, orderRepository, menuItemRepository)
            orderItemService.customer = customer

            const serviceCall = async () => {
                await orderItemService.addOrderItem(order.id, orderItemCreateInput)
            }

            expect(serviceCall).rejects.toThrow(MenuItemNotFoundWithIdError)
        })

        test("should not add order item to order, due to the fact that customer does not own order", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())
            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs, courier.id)
            const menuItem = await createMenuItem(prismaClient, restaurant.id)
            
            const anotherCustomer = await createCustomer(prismaClient)

            const orderItemCreateInput = generateOrderItemCreateInputDto(menuItem.id)

            const orderItemService = new OrderItemService(orderItemGetMapper, orderItemCreateMapper, orderItemRepository, orderRepository, menuItemRepository)
            orderItemService.customer = anotherCustomer

            const serviceCall = async () => {
                await orderItemService.addOrderItem(order.id, orderItemCreateInput)
            }

            expect(serviceCall).rejects.toThrow(CustomerOwnershipError)
        })

        test("should not add order item to order, due to the fact that menu item is not in the same restaurant as order", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())
            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs, courier.id)

            const anotherRestaurant = await createRestaurant(prismaClient)
            const menuItem = await createMenuItem(prismaClient, anotherRestaurant.id)

            const orderItemCreateInput = generateOrderItemCreateInputDto(menuItem.id)

            const orderItemService = new OrderItemService(orderItemGetMapper, orderItemCreateMapper, orderItemRepository, orderRepository, menuItemRepository)
            orderItemService.customer = customer
            
            const serviceCall = async () => {
                await orderItemService.addOrderItem(order.id, orderItemCreateInput)
            }

            expect(serviceCall).rejects.toThrow(MenuItemNotInSameOrderRestaurantError)
        })

        test("should not add order item to order, due to the fact that menu item already in order", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())
            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs, courier.id)

            const firstOrderItemCreateInput = orderItemCreateInputs[0]

            const menuItem = await prismaClient.menuItem.create({
                data: {
                    id: getUniqueId(),
                    name: firstOrderItemCreateInput.menuItemName,
                    imageUrl: firstOrderItemCreateInput.menuItemImageUrl,
                    price: firstOrderItemCreateInput.menuItemPrice,
                    restaurantId: restaurant.id
                }
            })

            const orderItemCreateInput = generateOrderItemCreateInputDto(menuItem.id)

            const orderItemService = new OrderItemService(orderItemGetMapper, orderItemCreateMapper, orderItemRepository, orderRepository, menuItemRepository)
            orderItemService.customer = customer

            const serviceCall = async () => {
                await orderItemService.addOrderItem(order.id, orderItemCreateInput)
            }

            expect(serviceCall).rejects.toThrow(MenuItemAlreadyInOrderError)
        })
    })

    // ORDER

    describe('Tests for Order Service', () => {
        const orderItemGetMapper = new OrderItemGetMapper()
        const orderItemCreateMapper = new OrderItemCreateMapper()
        const orderGetMapper = new OrderGetMapper(orderItemGetMapper)
        const orderCreateMapper = new OrderCreateMapper(orderItemCreateMapper)
        const orderRepository = new PrismaOrderRepository(prismaClient)
        const promocodeRepository = new PrismaPromocodeRepository(prismaClient)
        const menuItemRepository = new PrismaMenuItemRepository(prismaClient)
        const restaurantRepository = new PrismaRestaurantRepository(prismaClient)

        test("should get all orders", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())
            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs, courier.id)
            const moderator = await createModerator(prismaClient)

            const expectedResult = {
                ...order,
                courierId: order.courierId,
                customerId: order.customerId,
                promotionId: undefined,
                createdAt: order.createdAt.toISOString(),
                actualDeliveryTime: undefined,
                deliveryAcceptedAt: undefined,
                deliveryFinishedAt: undefined,
                id: order.id,
                supposedDeliveryTime: order.supposedDeliveryTime.toISOString(),
                restaurantId: order.restaurantId,
            }

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)
            orderService.moderator = moderator
            const orderGetOutputs = await orderService.getMany()

            const result = orderGetOutputs.find((orderGetOutput) => orderGetOutput.id === order.id)

            delete result?.items

            expect(result).toEqual(expectedResult)
        })

        test("should not get all orders, due to missing moderator", async () => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())
            await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)

            const serviceCall = async () => {
                await orderService.getMany()
            }

            expect(serviceCall).rejects.toThrow(PermissionDeniedError)
        })

        test("should get all ready orders", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())
            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs)

            await prismaClient.order.update({
                where: {
                    id: order.id
                },
                data: {
                    status: "READY"
                }
            })

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)
            orderService.courier = courier

            const orderGetOutputs = await orderService.getReadyOrders()

            expect(orderGetOutputs.length).not.toBe(0)

            orderGetOutputs.forEach((orderGetOutput) => {
                expect(orderGetOutput.status).toBe("READY")
            })
        })

        test("should not get all ready orders, due to missing courier", async () => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())
            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs)
            
            await prismaClient.order.update({
                where: {
                    id: order.id
                },
                data: {
                    status: "READY"
                }
            })

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)

            const serviceCall = async () => {
                await orderService.getReadyOrders()
            }

            expect(serviceCall).rejects.toThrow(PermissionDeniedError)
        })

        test("should get orders of provided customer", async () => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())
            await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)
            orderService.customer = customer

            const orderGetOutputs = await orderService.getCurrentCustomerOrders()

            expect(orderGetOutputs.length).not.toBe(0)

            orderGetOutputs.forEach((orderGetOutput) => {
                expect(orderGetOutput.customerId).toBe(customer.id)
            })

        })

        test("should not get orders of provided customer, due to missing customer", async () => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())
            await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)

            const serviceCall = async () => {
                await orderService.getCurrentCustomerOrders()
            }

            expect(serviceCall).rejects.toThrow(PermissionDeniedError)

        })


        test("should get orders of provided courier", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())
            await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs, courier.id)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)
            orderService.courier = courier

            const orderGetOutputs = await orderService.getCurrentCourierOrders()

            expect(orderGetOutputs.length).not.toBe(0)

            orderGetOutputs.forEach((orderGetOutput) => {
                expect(orderGetOutput.courierId).toBe(courier.id)
            })

        })

        test("should not get orders of provided courier, due to missing courier", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())
            await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs, courier.id)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)

            const serviceCall = async () => {
                await orderService.getCurrentCourierOrders()
            }

            expect(serviceCall).rejects.toThrow(PermissionDeniedError)

        })

        test("should get orders of provided restautant", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const restaurantManager = await createRestaurantManager(prismaClient, restaurant.id)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())
            await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs, courier.id)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)
            orderService.restaurantManager = restaurantManager

            const orderGetOutputs = await orderService.getRestaurantOrders(restaurant.id)

            expect(orderGetOutputs.length).not.toBe(0)

            orderGetOutputs.forEach((orderGetOutput) => {
                expect(orderGetOutput.restaurantId).toBe(restaurant.id)
            })

        })

        test("should not get orders of provided restaurant, due to missing restaurant manager", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())
            await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs, courier.id)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)

            const serviceCall = async () => {
                await orderService.getRestaurantOrders(restaurant.id)
            }

            expect(serviceCall).rejects.toThrow(PermissionDeniedError)
        })
        
        test("should not get orders of provided restaurant, due to non-existent restaurant", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const restaurantManager = await createRestaurantManager(prismaClient, restaurant.id)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())
            await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs, courier.id)

            const nonExistentRestaurantId = getUniqueId()

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)
            orderService.restaurantManager = restaurantManager

            const serviceCall = async () => {
                await orderService.getRestaurantOrders(nonExistentRestaurantId)
            }

            expect(serviceCall).rejects.toThrow(RestaurantNotFoundWithIdError)
        })

        test("should not get orders of provided restaurant, due to the fact that restaurant manager does not own restaurant", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())
            await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs, courier.id)

            const anotherRestaurantManager = await createRestaurantManager(prismaClient)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)
            orderService.restaurantManager = anotherRestaurantManager

            const serviceCall = async () => {
                await orderService.getRestaurantOrders(restaurant.id)
            }

            expect(serviceCall).rejects.toThrow(RestaurantManagerOwnershipError)
        })


        test("should create order", async () => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const promocode = await createPromocode(prismaClient, restaurant.id, true)

            const menuItems = await Promise.all(Array.from({length: manyCount}, async () => await createMenuItem(prismaClient, restaurant.id)))
            const menuItemIds = menuItems.map((menuItem) => menuItem.id)
            
            const orderCreateInputDto = generateOrderCreateInputDto(restaurant.id, menuItemIds, promocode.nameIdentifier)

            const totalPrice = orderCreateInputDto.items.reduce((acc, orderItemCreateInputDto) => {
                const menuItem = menuItems.find((menuItem) => orderItemCreateInputDto.menuItemId === menuItem.id) as MenuItem
                return acc + menuItem.price * orderItemCreateInputDto.quantity
            }, 0)

            const expectedResult = {
                ...orderCreateInputDto,
                status: "PENDING",
                totalPrice: Number(totalPrice.toFixed(2)),
                decountedPrice: Number((Number(totalPrice.toFixed(2)) * (1 - promocode.discountPercentage / 100)).toFixed(2)),
                customerId: customer.id,
                promocodeName: promocode.nameIdentifier,
                promocodeDiscount: promocode.discountPercentage,
                promocode: undefined,
                items: orderCreateInputDto.items.map((orderItemCreateInputDto) => {
                    const menuItem = menuItems.find((menuItem) => orderItemCreateInputDto.menuItemId === menuItem.id) as MenuItem

                    return {
                        menuItemName: menuItem.name,
                        menuItemImageUrl: menuItem.imageUrl,
                        menuItemPrice: menuItem.price,
                        quantity: orderItemCreateInputDto.quantity
                    }
                })
            }

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)
            orderService.customer = customer

            const orderCreateOutputDto = await orderService.makeOrder(orderCreateInputDto)

            const result = {
                ...orderCreateOutputDto,
                supposedDeliveryTime: undefined,
                createdAt: undefined,
                id: undefined,
                items: orderCreateOutputDto.items?.map((orderItemCreateOutputDto) => {
                    return {
                        ...orderItemCreateOutputDto,
                        id: undefined,
                        orderId: undefined
                    }
                })
            }

            expect(result).toEqual(expectedResult)
        })

        test("should not create order, due to missing customer", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const promocode = await createPromocode(prismaClient, restaurant.id)

            const menuItems = await Promise.all(Array.from({length: manyCount}, async () => await createMenuItem(prismaClient, restaurant.id)))
            const menuItemIds = menuItems.map((menuItem) => menuItem.id)
            
            const orderCreateInputDto = generateOrderCreateInputDto(restaurant.id, menuItemIds, promocode.nameIdentifier)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)

            const serviceCall = async () => {
                await orderService.makeOrder(orderCreateInputDto)
            }

            expect(serviceCall).rejects.toThrow(PermissionDeniedError)
        })

        test("should not create order, due to non-existent restaurant", async () => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const promocode = await createPromocode(prismaClient, restaurant.id)

            const menuItems = await Promise.all(Array.from({length: manyCount}, async () => await createMenuItem(prismaClient, restaurant.id)))
            const menuItemIds = menuItems.map((menuItem) => menuItem.id)
            
            const orderCreateInputDto = generateOrderCreateInputDto(restaurant.id, menuItemIds, promocode.nameIdentifier)

            orderCreateInputDto.restaurantId = getUniqueId()
            
            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)
            orderService.customer = customer

            const serviceCall = async () => {
                await orderService.makeOrder(orderCreateInputDto)
            }

            expect(serviceCall).rejects.toThrow(RestaurantNotFoundWithIdError)
        })

        test("should not create order, due to non-existent of one menu item", async () => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const promocode = await createPromocode(prismaClient, restaurant.id)

            const menuItems = await Promise.all(Array.from({length: manyCount}, async () => await createMenuItem(prismaClient, restaurant.id)))
            const menuItemIds = menuItems.map((menuItem) => menuItem.id)
            
            const orderCreateInputDto = generateOrderCreateInputDto(restaurant.id, menuItemIds, promocode.nameIdentifier)

            orderCreateInputDto.items.push({
                menuItemId: getUniqueId(),
                quantity: faker.number.int({
                    max: 10
                })
            })

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)
            orderService.customer = customer

            const serviceCall = async () => {
                await orderService.makeOrder(orderCreateInputDto)
            }

            expect(serviceCall).rejects.toThrow(MenuItemNotFoundWithIdError)
        })

        test("should not create order, due to the fact that not all menu items are from one restaurant", async () => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const promocode = await createPromocode(prismaClient, restaurant.id)

            const menuItems = await Promise.all(Array.from({length: manyCount}, async () => await createMenuItem(prismaClient, restaurant.id)))

            const anotherRestaurant = await createRestaurant(prismaClient)
            const anotherMenuItem = await createMenuItem(prismaClient, anotherRestaurant.id)

            menuItems.push(anotherMenuItem)

            const menuItemIds = menuItems.map((menuItem) => menuItem.id)
            
            const orderCreateInputDto = generateOrderCreateInputDto(restaurant.id, menuItemIds, promocode.nameIdentifier)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)
            orderService.customer = customer

            const serviceCall = async () => {
                await orderService.makeOrder(orderCreateInputDto)
            }

            expect(serviceCall).rejects.toThrow(MenuItemAllNotInSameRestaurantError)
        })

        test("should not create order, due to non-existent promocode", async () => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const menuItems = await Promise.all(Array.from({length: manyCount}, async () => await createMenuItem(prismaClient, restaurant.id)))
            
            const menuItemIds = menuItems.map((menuItem) => menuItem.id)

            const promocode = faker.lorem.word(5)
            const orderCreateInputDto = generateOrderCreateInputDto(restaurant.id, menuItemIds, promocode)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)
            orderService.customer = customer

            const serviceCall = async () => {
                await orderService.makeOrder(orderCreateInputDto)
            }

            expect(serviceCall).rejects.toThrow(PromocodeNotFoundWithNameError)
        })

        test("should not create order, due to the fact that promocode does not belongs to restaurant", async () => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const menuItems = await Promise.all(Array.from({length: manyCount}, async () => await createMenuItem(prismaClient, restaurant.id)))
            
            const anotherRestaurant = await createRestaurant(prismaClient)
            const promocode = await createPromocode(prismaClient, anotherRestaurant.id)

            const menuItemIds = menuItems.map((menuItem) => menuItem.id)

            const orderCreateInputDto = generateOrderCreateInputDto(restaurant.id, menuItemIds, promocode.nameIdentifier)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)
            orderService.customer = customer

            const serviceCall = async () => {
                await orderService.makeOrder(orderCreateInputDto)
            }

            expect(serviceCall).rejects.toThrow(PromocodeNotBelongsToRestaurantError)
        })

        test("should not create order, due to the fact that promocode is not active", async () => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const promocode = await createPromocode(prismaClient, restaurant.id)
            const menuItems = await Promise.all(Array.from({length: manyCount}, async () => await createMenuItem(prismaClient, restaurant.id)))
            
            await prismaClient.promocode.update({
                where: {
                    id: promocode.id
                },
                data: {
                    isActive: false
                }
            })

            const menuItemIds = menuItems.map((menuItem) => menuItem.id)

            const orderCreateInputDto = generateOrderCreateInputDto(restaurant.id, menuItemIds, promocode.nameIdentifier)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)
            orderService.customer = customer

            const serviceCall = async () => {
                await orderService.makeOrder(orderCreateInputDto)
            }

            expect(serviceCall).rejects.toThrow(PromocodeNotActiveError)
        })

        test("should not create order, due to the fact that promocode reached maximum amount of usages", async () => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const promocode = await createPromocode(prismaClient, restaurant.id)

            const menuItems = await Promise.all(Array.from({length: manyCount}, async () => await createMenuItem(prismaClient, restaurant.id)))

            const menuItemIds = menuItems.map((menuItem) => menuItem.id)

            await prismaClient.promocode.update({
                where: {
                    id: promocode.id,
                },
                data: {
                    currentUsageCount: promocode.maxUsageCount
                }
            })
            
            const orderCreateInputDto = generateOrderCreateInputDto(restaurant.id, menuItemIds, promocode.nameIdentifier)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)
            orderService.customer = customer

            const serviceCall = async () => {
                await orderService.makeOrder(orderCreateInputDto)
            }

            expect(serviceCall).rejects.toThrow(PromocodeAmountUsageError)
        })

        test("should not create order, due to the fact that promocode have not started yet", async () => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const promocode = await createPromocode(prismaClient, restaurant.id)

            const menuItems = await Promise.all(Array.from({length: manyCount}, async () => await createMenuItem(prismaClient, restaurant.id)))

            const menuItemIds = menuItems.map((menuItem) => menuItem.id)

            await prismaClient.promocode.update({
                where: {
                    id: promocode.id,
                },
                data: {
                    validFrom: faker.date.future(),
                    validUntil: faker.date.future()
                }
            })
            
            const orderCreateInputDto = generateOrderCreateInputDto(restaurant.id, menuItemIds, promocode.nameIdentifier)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)
            orderService.customer = customer

            const serviceCall = async () => {
                await orderService.makeOrder(orderCreateInputDto)
            }

            expect(serviceCall).rejects.toThrow(PromocodeNotStartUsageError)
        })

        test("should not create order, due to the fact that promocode is expired", async () => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const promocode = await createPromocode(prismaClient, restaurant.id)

            const menuItems = await Promise.all(Array.from({length: manyCount}, async () => await createMenuItem(prismaClient, restaurant.id)))

            const menuItemIds = menuItems.map((menuItem) => menuItem.id)

            await prismaClient.promocode.update({
                where: {
                    id: promocode.id,
                },
                data: {
                    validFrom: faker.date.recent(),
                    validUntil: faker.date.recent()
                }
            })
            
            const orderCreateInputDto = generateOrderCreateInputDto(restaurant.id, menuItemIds, promocode.nameIdentifier)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)
            orderService.customer = customer

            const serviceCall = async () => {
                await orderService.makeOrder(orderCreateInputDto)
            }

            expect(serviceCall).rejects.toThrow(PromocodeExpiredUsageError)
        })

        test("should take order for delivery", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())

            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)
            orderService.courier = courier

            await prismaClient.order.update({
                where: {
                    id: order.id
                },
                data: {
                    status: "READY"
                }
            })

            await orderService.takeOrder(order.id)

            const orderInstance = await prismaClient.order.findFirst({
                where: {
                    id: order.id
                }
            })

            expect(orderInstance?.courierId).toBe(courier.id)
            expect(orderInstance?.status).toBe("DELIVERING")
        })

        test("should not take order for delivery, due to missing courier", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())

            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs, courier.id)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)

            const serviceCall = async () => {
                await orderService.takeOrder(order.id)
            }

            expect(serviceCall).rejects.toThrow(PermissionDeniedError)
        })

        test("should not take order for delivery, due to non-existent order", async () => {
            const courier = await createCourier(prismaClient)

            const nonExistentOrderId = getUniqueId()

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)
            orderService.courier = courier

            const serviceCall = async () => {
                await orderService.takeOrder(nonExistentOrderId)
            }

            expect(serviceCall).rejects.toThrow(OrderNotFoundWithIdError)
        })

        
        test("should not take order for delivery, due to the fact that order status is not READY", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())

            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)
            orderService.courier = courier

            const serviceCall = async () => {
                await orderService.takeOrder(order.id)
            }

            expect(serviceCall).rejects.toThrow(OrderNotReadyError)
        })

        test("should finish order delivery", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())

            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs, courier.id)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)
            orderService.courier = courier

            await prismaClient.order.update({
                where: {
                    id: order.id
                },
                data: {
                    status: "DELIVERING"
                }
            })

            await orderService.finishOrderDelivery(order.id)

            const orderInstance = await prismaClient.order.findFirst({
                where: {
                    id: order.id
                }
            })

            expect(orderInstance?.courierId).toBe(courier.id)
            expect(orderInstance?.status).toBe("DELIVERED")
        })

        test("should not finish order delivery, due to missing courier", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())

            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs, courier.id)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)

            const serviceCall = async () => {
                await orderService.finishOrderDelivery(order.id)
            }

            expect(serviceCall).rejects.toThrow(PermissionDeniedError)
        })

        test("should not finish order delivery, due to non-existent order", async () => {
            const courier = await createCourier(prismaClient)

            const nonExistentOrderId = getUniqueId()

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)
            orderService.courier = courier

            const serviceCall = async () => {
                await orderService.finishOrderDelivery(nonExistentOrderId)
            }

            expect(serviceCall).rejects.toThrow(OrderNotFoundWithIdError)
        })

        test("should not finish order delivery, due to the fact that order is not delivering", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())

            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs, courier.id)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)
            orderService.courier = courier

            const serviceCall = async () => {
                await orderService.finishOrderDelivery(order.id)
            }

            expect(serviceCall).rejects.toThrow(OrderNotDeliveringError)
        })

        test("should not finish order delivery, due to the fact that order is not delivering", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())

            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs, courier.id)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)
            orderService.courier = courier

            const serviceCall = async () => {
                await orderService.finishOrderDelivery(order.id)
            }

            expect(serviceCall).rejects.toThrow(OrderNotDeliveringError)
        })

        test("should not finish order delivery, due to the fact that courier does not deliver order", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())

            const anotherCourier = await createCourier(prismaClient)

            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs, courier.id)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)
            orderService.courier = anotherCourier

            await prismaClient.order.update({
                where: {
                    id: order.id
                },
                data: {
                    status: "DELIVERING"
                }
            })
            
            const serviceCall = async () => {
                await orderService.finishOrderDelivery(order.id)
            }

            expect(serviceCall).rejects.toThrow(CourierOwnershipError)
        })
    })

})