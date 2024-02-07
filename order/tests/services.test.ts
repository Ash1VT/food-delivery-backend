import { PromocodeAlreadyExistsWithNameError, PromocodeMaximumUsageError, PromocodeNotActiveError, PromocodeNotBelongsToRestaurantError, PromocodeNotFoundWithNameError, PromocodeUsageError } from './../src/modules/promotions/errors/promocode';
import { RestaurantManagerOwnershipError } from './../src/modules/users/errors/restaurantManager';
import { PromocodeCreateMapper, PromocodeGetMapper, PromocodeUpdateMapper } from './../src/modules/promotions/mappers/instances/promocode';
import { MenuItem, PrismaClient } from "@prisma/client"
import { CourierCreateMapper, CourierGetMapper } from "@src/modules/users/mappers/instances/courier"
import PrismaCourierRepository from "@src/modules/users/repositories/prisma/PrismaCourierRepository"
import CourierService from "@src/modules/users/services/instances/CourierService"
import { createCourier, generateCourierCreateInputDto } from "./factories/users/courier"
import { CustomerCreateMapper } from "@src/modules/users/mappers/instances/customer"
import PrismaCustomerRepository from "@src/modules/users/repositories/prisma/PrismaCustomerRepository"
import CustomerService from "@src/modules/users/services/instances/CustomerService"
import { createCustomer, generateCustomerCreateInputDto } from "./factories/users/customer"
import { ModeratorCreateMapper } from "@src/modules/users/mappers/instances/moderator"
import PrismaModeratorRepository from "@src/modules/users/repositories/prisma/PrismaModeratorRepository"
import { createModerator, generateModeratorCreateInputDto } from "./factories/users/moderator"
import PrismaRestaurantManagerRepository from "@src/modules/users/repositories/prisma/PrismaRestaurantManagerRepository"
import { RestaurantManagerCreateMapper } from "@src/modules/users/mappers/instances/restaurantManager"
import RestaurantManagerService from "@src/modules/users/services/instances/RestaurantManagerService"
import { createRestaurantManager, generateRestaurantManagerCreateInputDto } from "./factories/users/restaurantManager"
import ModeratorService from "@src/modules/users/services/instances/ModeratorService"
import { RestaurantCreateMapper } from "@src/modules/restaurants/mappers/instances/restaurant"
import PrismaRestaurantRepository from "@src/modules/restaurants/repositories/prisma/PrismaRestaurantRepository"
import RestaurantService from "@src/modules/restaurants/services/instances/RestaurantService"
import { createRestaurant, generateRestaurantCreateInputDto } from "./factories/restaurants/restaurant"
import { MenuItemCreateMapper } from "@src/modules/menu/mappers/instances/menuItem"
import PrismaMenuItemRepository from "@src/modules/menu/repositories/prisma/PrismaMenuItemRepository"
import MenuItemService from "@src/modules/menu/services/instances/MenuItemService"
import { createMenuItem, generateMenuItemCreateInputDto } from "./factories/menu/menuItem"
import { PromotionCreateMapper } from "@src/modules/promotions/mappers/instances/promotion"
import PrismaPromotionRepository from "@src/modules/promotions/repositories/prisma/PrismaPromotionRepository"
import PromotionService from "@src/modules/promotions/services/instances/PromotionService"
import { generatePromotionCreateInputDto } from "./factories/promotions/promotion"
import PrismaPromocodeRepository from '@src/modules/promotions/repositories/prisma/PrismaPromocodeRepository';
import PromocodeService from '@src/modules/promotions/services/instances/PromocodeService';
import { createPromocode, generatePromocodeCreateInputDto, generatePromocodeUpdateInputDto } from './factories/promotions/promocode';
import { PermissionDeniedError } from '@src/modules/users/errors/permissions';
import { getUniqueBigIntId, getUniqueNumberId } from './utils/unique';
import { RestaurantNotFoundWithIdError } from '@src/modules/restaurants/errors/restaurant';
import { PromocodeNotFoundWithIdError } from '@src/modules/promotions/errors/promocode';
import { OrderItemGetMapper, OrderItemCreateMapper } from '@src/modules/orders/mappers/instances/orderItem';
import PrismaOrderItemRepository from '@src/modules/orders/repositories/prisma/PrismaOrderItemRepository';
import PrismaOrderRepository from '@src/modules/orders/repositories/prisma/PrismaOrderRepository';
import { createOrder, generateOrderCreateInputDto, generateOrderModel } from './factories/orders/order';
import { generateOrderItemCreateInputDto, generateOrderItemWithOrderCreateInputModel } from './factories/orders/orderItem';
import OrderService from '@src/modules/orders/services/instances/OrderService';
import { OrderItemService } from '@src/modules/orders/services/instances/OrderItemService';
import { OrderNotDeliveringError, OrderNotFoundWithIdError, OrderNotReadyError } from '@src/modules/orders/errors/order';
import { CustomerOwnershipError } from '@src/modules/users/errors/customer';
import { CourierOwnershipError } from '@src/modules/users/errors/courier';
import { MenuItemAllNotInSameRestaurantError, MenuItemAlreadyInOrderError, MenuItemNotFoundWithIdError, MenuItemNotInSameOrderRestaurantError } from '@src/modules/menu/errors/menuItem';
import { OrderGetMapper, OrderCreateMapper } from '@src/modules/orders/mappers/instances/order';
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
                id: Number(courierInstance?.id)
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
                id: Number(customerInstance?.id)
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
                id: Number(moderatorInstance?.id)
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
                id: Number(restaurantManagerInstance?.id)
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
                id: Number(restaurantInstance?.id)
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
            const restaurantInstance = await createRestaurant(prismaClient)
            const restaurantId = Number(restaurantInstance.id)
            
            const menuItemCreateInputDto = generateMenuItemCreateInputDto(restaurantId)

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
                id: Number(menuItemInstance?.id),
                restaurantId: Number(menuItemInstance?.restaurantId)
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
                id: Number(promotionInstance?.id)
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
            const restaurantId = Number(restaurant.id)

            const restaurantManager = await createRestaurantManager(prismaClient, restaurant.id)

            const promocodeInstances = await Promise.all(Array.from({length: manyCount}, async () => await createPromocode(prismaClient, restaurant.id)))

            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository, restaurantManager)

            const expectedResult = promocodeInstances.map((promocodeIntsance) => promocodeCreateMapper.toDto(promocodeIntsance))

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

            const promocodeInstance = await prismaClient.promocode.findFirst({
                where: {
                    id: promocodeCreateOutputDto.id
                }
            })

            const instanceResult = {
                ...promocodeInstance,
                id: undefined,
                restaurantId: Number(promocodeInstance?.restaurantId),
                validFrom: promocodeInstance?.validFrom.toString(),
                validUntil: promocodeInstance?.validUntil.toString(),
            }

            expect(instanceResult).toEqual(expectedResult)
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

        test("should not create one promocode, due to the fact that promocode with such name already exists", async () => {
            const restaurant = await createRestaurant(prismaClient)
            const promocode = await createPromocode(prismaClient, restaurant.id)
            const restaurantManager = await createRestaurantManager(prismaClient, restaurant.id)

            const restaurantId = Number(restaurant.id)
            const promocodeService = new PromocodeService(promocodeGetMapper, promocodeCreateMapper, promocodeUpdateMapper, promocodeRepository, restaurantRepository, restaurantManager)
            
            const promocodeCreateInputDto = generatePromocodeCreateInputDto(restaurantId)
            
            promocodeCreateInputDto.nameIdentifier = promocode.nameIdentifier

            const serviceCall = async () => {
                await promocodeService.create(promocodeCreateInputDto)
            }

            expect(serviceCall).rejects.toThrow(PromocodeAlreadyExistsWithNameError)
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

            const promocodeInstance = await prismaClient.promocode.findFirst({
                where: {
                    id: promocodeId
                }
            })

            const instanceResult = {
                discountPercentage: promocodeInstance?.discountPercentage,
                maxUsageCount: promocodeInstance?.maxUsageCount,
                validFrom: promocodeInstance?.validFrom.toString(),
                validUntil: promocodeInstance?.validUntil.toString(),
            }

            expect(instanceResult).toEqual(expectedResult)
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

            const promocodeInstance = await prismaClient.promocode.findFirst({
                where: {
                    id: promocodeId
                }
            })

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

            const promocodeInstance = await prismaClient.promocode.findFirst({
                where: {
                    id: promocodeId
                }
            })

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
            const orderId = Number(order.id)

            const orderItemService = new OrderItemService(orderItemGetMapper, orderItemCreateMapper, orderItemRepository, orderRepository, menuItemRepository, customer)

            const orderItemsGetOutputs = await orderItemService.getOrderItems(orderId)

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
            const orderId = Number(order.id)

            const orderItemService = new OrderItemService(orderItemGetMapper, orderItemCreateMapper, orderItemRepository, orderRepository, menuItemRepository, undefined, courier)

            const orderItemsGetOutputs = await orderItemService.getOrderItems(orderId)

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
            const orderId = Number(order.id)

            const orderItemService = new OrderItemService(orderItemGetMapper, orderItemCreateMapper, orderItemRepository, orderRepository, menuItemRepository)

            const serviceCall = async () => {
                await orderItemService.getOrderItems(orderId)
            }

            expect(serviceCall).rejects.toThrow(PermissionDeniedError)
        })

        test("should not get all order items, due to non-existent order", async () => {
            const customer = await createCustomer(prismaClient)
            const orderId = getUniqueNumberId()

            const orderItemService = new OrderItemService(orderItemGetMapper, orderItemCreateMapper, orderItemRepository, orderRepository, menuItemRepository, customer)

            const serviceCall = async () => {
                await orderItemService.getOrderItems(orderId)
            }

            expect(serviceCall).rejects.toThrow(OrderNotFoundWithIdError)
        })

        test("should not get all order items, due to the fact that customer does not own order", async () => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())
            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs)
            const orderId = Number(order.id)

            const anotherCustomer = await createCustomer(prismaClient)

            const orderItemService = new OrderItemService(orderItemGetMapper, orderItemCreateMapper, orderItemRepository, orderRepository, menuItemRepository, anotherCustomer)

            const serviceCall = async () => {
                await orderItemService.getOrderItems(orderId)
            }

            expect(serviceCall).rejects.toThrow(CustomerOwnershipError)
        })

        test("should not get all order items, due to the fact that courier does not own order", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())
            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs, courier.id)
            const orderId = Number(order.id)

            const anotherCourier = await createCustomer(prismaClient)

            const orderItemService = new OrderItemService(orderItemGetMapper, orderItemCreateMapper, orderItemRepository, orderRepository, menuItemRepository, undefined, anotherCourier)

            const serviceCall = async () => {
                await orderItemService.getOrderItems(orderId)
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

            const orderId = Number(order.id)
            const menuItemId = Number(menuItem.id)

            const orderItemCreateInput = generateOrderItemCreateInputDto(menuItemId)

            const expectedResult = {
                menuItemName: menuItem.name,
                menuItemImageUrl: menuItem.imageUrl,
                menuItemPrice: menuItem.price,
                orderId: orderId,
                quantity: orderItemCreateInput.quantity
            }

            const orderItemService = new OrderItemService(orderItemGetMapper, orderItemCreateMapper, orderItemRepository, orderRepository, menuItemRepository, customer)

            const orderItemCreateOutput = await orderItemService.addOrderItem(orderId, orderItemCreateInput)

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
                orderId: Number(orderItemInstance?.orderId),
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

            const orderId = Number(order.id)
            const menuItemId = Number(menuItem.id)

            const orderItemCreateInput = generateOrderItemCreateInputDto(menuItemId)

            const orderItemService = new OrderItemService(orderItemGetMapper, orderItemCreateMapper, orderItemRepository, orderRepository, menuItemRepository)

            const serviceCall = async () => {
                await orderItemService.addOrderItem(orderId, orderItemCreateInput)
            }

            expect(serviceCall).rejects.toThrow(PermissionDeniedError)
        })

        test("should not add order item to order, due to non-existent order", async () => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const menuItem = await createMenuItem(prismaClient, restaurant.id)

            const orderId = getUniqueNumberId()
            const menuItemId = Number(menuItem.id)

            const orderItemCreateInput = generateOrderItemCreateInputDto(menuItemId)

            const orderItemService = new OrderItemService(orderItemGetMapper, orderItemCreateMapper, orderItemRepository, orderRepository, menuItemRepository, customer)

            const serviceCall = async () => {
                await orderItemService.addOrderItem(orderId, orderItemCreateInput)
            }

            expect(serviceCall).rejects.toThrow(OrderNotFoundWithIdError)
        })

        test("should not add order item to order, due to non-existent menu item", async () => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())
            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs)

            const orderId = Number(order.id)
            const menuItemId = getUniqueNumberId()

            const orderItemCreateInput = generateOrderItemCreateInputDto(menuItemId)

            const orderItemService = new OrderItemService(orderItemGetMapper, orderItemCreateMapper, orderItemRepository, orderRepository, menuItemRepository, customer)

            const serviceCall = async () => {
                await orderItemService.addOrderItem(orderId, orderItemCreateInput)
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
            
            const orderId = Number(order.id)
            const menuItemId = Number(menuItem.id)

            const anotherCustomer = await createCustomer(prismaClient)

            const orderItemCreateInput = generateOrderItemCreateInputDto(menuItemId)

            const orderItemService = new OrderItemService(orderItemGetMapper, orderItemCreateMapper, orderItemRepository, orderRepository, menuItemRepository, anotherCustomer)

            const serviceCall = async () => {
                await orderItemService.addOrderItem(orderId, orderItemCreateInput)
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

            const orderId = Number(order.id)
            const menuItemId = Number(menuItem.id)

            const orderItemCreateInput = generateOrderItemCreateInputDto(menuItemId)

            const orderItemService = new OrderItemService(orderItemGetMapper, orderItemCreateMapper, orderItemRepository, orderRepository, menuItemRepository, customer)

            const serviceCall = async () => {
                await orderItemService.addOrderItem(orderId, orderItemCreateInput)
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
                    id: getUniqueBigIntId(),
                    name: firstOrderItemCreateInput.menuItemName,
                    imageUrl: firstOrderItemCreateInput.menuItemImageUrl,
                    price: firstOrderItemCreateInput.menuItemPrice,
                    restaurantId: restaurant.id
                }
            })

            const orderId = Number(order.id)
            const menuItemId = Number(menuItem.id)

            const orderItemCreateInput = generateOrderItemCreateInputDto(menuItemId)

            const orderItemService = new OrderItemService(orderItemGetMapper, orderItemCreateMapper, orderItemRepository, orderRepository, menuItemRepository, customer)

            const serviceCall = async () => {
                await orderItemService.addOrderItem(orderId, orderItemCreateInput)
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

            const orderId = Number(order.id)

            const expectedResult = {
                ...order,
                courierId: Number(order.courierId),
                customerId: Number(order.customerId),
                promotionId: undefined,
                createdAt: order.createdAt.toString(),
                actualDeliveryTime: undefined,
                deliveryAcceptedAt: undefined,
                deliveryFinishedAt: undefined,
                id: Number(order.id),
                supposedDeliveryTime: order.supposedDeliveryTime.toString(),
                restaurantId: Number(order.restaurantId),
            }

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository, undefined, undefined, undefined, moderator)

            const orderGetOutputs = await orderService.getMany()

            const result = orderGetOutputs.find((orderGetOutput) => orderGetOutput.id === orderId)

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

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository, undefined, courier)

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

            const customerId = Number(customer.id)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository, customer)

            const orderGetOutputs = await orderService.getCurrentCustomerOrders()

            expect(orderGetOutputs.length).not.toBe(0)

            orderGetOutputs.forEach((orderGetOutput) => {
                expect(orderGetOutput.customerId).toBe(customerId)
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

            const courierId = Number(courier.id)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository, undefined, courier)

            const orderGetOutputs = await orderService.getCurrentCourierOrders()

            expect(orderGetOutputs.length).not.toBe(0)

            orderGetOutputs.forEach((orderGetOutput) => {
                expect(orderGetOutput.courierId).toBe(courierId)
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

            const restaurantId = Number(restaurant.id)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository, undefined, undefined, restaurantManager)

            const orderGetOutputs = await orderService.getRestaurantOrders(restaurantId)

            expect(orderGetOutputs.length).not.toBe(0)

            orderGetOutputs.forEach((orderGetOutput) => {
                expect(orderGetOutput.restaurantId).toBe(restaurantId)
            })

        })

        test("should not get orders of provided restaurant, due to missing restaurant manager", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())
            await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs, courier.id)

            const restaurantId = Number(restaurant.id)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)

            const serviceCall = async () => {
                await orderService.getRestaurantOrders(restaurantId)
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

            const restaurantId = getUniqueNumberId()

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository, undefined, undefined, restaurantManager)

            const serviceCall = async () => {
                await orderService.getRestaurantOrders(restaurantId)
            }

            expect(serviceCall).rejects.toThrow(RestaurantNotFoundWithIdError)
        })

        test("should not get orders of provided restaurant, due to the fact that restaurant manager does not own restaurant", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())
            await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs, courier.id)

            const restaurantId = Number(restaurant.id)

            const anotherRestaurantManager = await createRestaurantManager(prismaClient)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository, undefined, undefined, anotherRestaurantManager)

            const serviceCall = async () => {
                await orderService.getRestaurantOrders(restaurantId)
            }

            expect(serviceCall).rejects.toThrow(RestaurantManagerOwnershipError)
        })


        test("should create order", async () => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const promocode = await createPromocode(prismaClient, restaurant.id)

            const menuItems = await Promise.all(Array.from({length: manyCount}, async () => await createMenuItem(prismaClient, restaurant.id)))
            const menuItemIds = menuItems.map((menuItem) => Number(menuItem.id))
            
            const restaurantId = Number(restaurant.id)

            const orderCreateInputDto = generateOrderCreateInputDto(restaurantId, menuItemIds, promocode.nameIdentifier)

            const totalPrice = orderCreateInputDto.items.reduce((acc, orderItemCreateInputDto) => {
                const menuItem = menuItems.find((menuItem) => orderItemCreateInputDto.menuItemId === Number(menuItem.id)) as MenuItem
                return acc + menuItem.price * orderItemCreateInputDto.quantity
            }, 0)

            const expectedResult = {
                ...orderCreateInputDto,
                status: "PENDING",
                totalPrice: Number(totalPrice.toFixed(2)),
                decountedPrice: Number((Number(totalPrice.toFixed(2)) * (1 - promocode.discountPercentage / 100)).toFixed(2)),
                customerId: Number(customer.id),
                promocodeName: promocode.nameIdentifier,
                promocodeDiscount: promocode.discountPercentage,
                promocode: undefined,
                items: orderCreateInputDto.items.map((orderItemCreateInputDto) => {
                    const menuItem = menuItems.find((menuItem) => orderItemCreateInputDto.menuItemId === Number(menuItem.id)) as MenuItem

                    return {
                        menuItemName: menuItem.name,
                        menuItemImageUrl: menuItem.imageUrl,
                        menuItemPrice: menuItem.price,
                        quantity: orderItemCreateInputDto.quantity
                    }
                })
            }

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository, customer)

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
            const menuItemIds = menuItems.map((menuItem) => Number(menuItem.id))
            
            const restaurantId = Number(restaurant.id)

            const orderCreateInputDto = generateOrderCreateInputDto(restaurantId, menuItemIds, promocode.nameIdentifier)

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
            const menuItemIds = menuItems.map((menuItem) => Number(menuItem.id))
            
            const restaurantId = Number(restaurant.id)

            const orderCreateInputDto = generateOrderCreateInputDto(restaurantId, menuItemIds, promocode.nameIdentifier)

            orderCreateInputDto.restaurantId = getUniqueNumberId()
            
            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository, customer)

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
            const menuItemIds = menuItems.map((menuItem) => Number(menuItem.id))
            
            const restaurantId = Number(restaurant.id)

            const orderCreateInputDto = generateOrderCreateInputDto(restaurantId, menuItemIds, promocode.nameIdentifier)

            orderCreateInputDto.items.push({
                menuItemId: getUniqueNumberId(),
                quantity: faker.number.int({
                    max: 10
                })
            })

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository, customer)

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

            const menuItemIds = menuItems.map((menuItem) => Number(menuItem.id))
            
            const restaurantId = Number(restaurant.id)

            const orderCreateInputDto = generateOrderCreateInputDto(restaurantId, menuItemIds, promocode.nameIdentifier)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository, customer)

            const serviceCall = async () => {
                await orderService.makeOrder(orderCreateInputDto)
            }

            expect(serviceCall).rejects.toThrow(MenuItemAllNotInSameRestaurantError)
        })

        test("should not create order, due to non-existent promocode", async () => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const menuItems = await Promise.all(Array.from({length: manyCount}, async () => await createMenuItem(prismaClient, restaurant.id)))
            
            const menuItemIds = menuItems.map((menuItem) => Number(menuItem.id))
            const restaurantId = Number(restaurant.id)

            const promocode = faker.lorem.word(5)
            const orderCreateInputDto = generateOrderCreateInputDto(restaurantId, menuItemIds, promocode)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository, customer)

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

            const menuItemIds = menuItems.map((menuItem) => Number(menuItem.id))
            const restaurantId = Number(restaurant.id)

            const orderCreateInputDto = generateOrderCreateInputDto(restaurantId, menuItemIds, promocode.nameIdentifier)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository, customer)

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

            const menuItemIds = menuItems.map((menuItem) => Number(menuItem.id))
            const restaurantId = Number(restaurant.id)

            const orderCreateInputDto = generateOrderCreateInputDto(restaurantId, menuItemIds, promocode.nameIdentifier)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository, customer)

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

            const menuItemIds = menuItems.map((menuItem) => Number(menuItem.id))
            const restaurantId = Number(restaurant.id)

            await prismaClient.promocode.update({
                where: {
                    id: promocode.id,
                },
                data: {
                    currentUsageCount: promocode.maxUsageCount
                }
            })
            
            const orderCreateInputDto = generateOrderCreateInputDto(restaurantId, menuItemIds, promocode.nameIdentifier)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository, customer)

            const serviceCall = async () => {
                await orderService.makeOrder(orderCreateInputDto)
            }

            expect(serviceCall).rejects.toThrow(PromocodeUsageError)
        })

        test("should take order for delivery", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())

            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs)
            const orderId = Number(order.id)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository, undefined, courier)

            await prismaClient.order.update({
                where: {
                    id: order.id
                },
                data: {
                    status: "READY"
                }
            })

            await orderService.takeOrder(orderId)

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
            const orderId = Number(order.id)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)

            const serviceCall = async () => {
                await orderService.takeOrder(orderId)
            }

            expect(serviceCall).rejects.toThrow(PermissionDeniedError)
        })

        test("should not take order for delivery, due to non-existent order", async () => {
            const courier = await createCourier(prismaClient)

            const orderId = getUniqueNumberId()

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository, undefined, courier)

            const serviceCall = async () => {
                await orderService.takeOrder(orderId)
            }

            expect(serviceCall).rejects.toThrow(OrderNotFoundWithIdError)
        })

        
        test("should not take order for delivery, due to the fact that order status is not READY", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())

            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs)
            const orderId = Number(order.id)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository, undefined, courier)

            const serviceCall = async () => {
                await orderService.takeOrder(orderId)
            }

            expect(serviceCall).rejects.toThrow(OrderNotReadyError)
        })

        test("should finish order delivery", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())

            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs, courier.id)
            const orderId = Number(order.id)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository, undefined, courier)

            await prismaClient.order.update({
                where: {
                    id: order.id
                },
                data: {
                    status: "DELIVERING"
                }
            })

            await orderService.finishOrderDelivery(orderId)

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
            const orderId = Number(order.id)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository)

            const serviceCall = async () => {
                await orderService.finishOrderDelivery(orderId)
            }

            expect(serviceCall).rejects.toThrow(PermissionDeniedError)
        })

        test("should not finish order delivery, due to non-existent order", async () => {
            const courier = await createCourier(prismaClient)

            const orderId = getUniqueNumberId()

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository, undefined, courier)

            const serviceCall = async () => {
                await orderService.finishOrderDelivery(orderId)
            }

            expect(serviceCall).rejects.toThrow(OrderNotFoundWithIdError)
        })

        test("should not finish order delivery, due to the fact that order is not delivering", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())

            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs, courier.id)
            const orderId = Number(order.id)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository, undefined, courier)

            const serviceCall = async () => {
                await orderService.finishOrderDelivery(orderId)
            }

            expect(serviceCall).rejects.toThrow(OrderNotDeliveringError)
        })

        test("should not finish order delivery, due to the fact that order is not delivering", async () => {
            const customer = await createCustomer(prismaClient)
            const courier = await createCourier(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const orderItemCreateInputs = Array.from({length: manyCount}, () => generateOrderItemWithOrderCreateInputModel())

            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItemCreateInputs, courier.id)
            const orderId = Number(order.id)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository, undefined, courier)

            const serviceCall = async () => {
                await orderService.finishOrderDelivery(orderId)
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
            const orderId = Number(order.id)

            const orderService = new OrderService(orderGetMapper, orderCreateMapper, orderRepository, promocodeRepository, menuItemRepository, restaurantRepository, undefined, anotherCourier)

            await prismaClient.order.update({
                where: {
                    id: order.id
                },
                data: {
                    status: "DELIVERING"
                }
            })
            
            const serviceCall = async () => {
                await orderService.finishOrderDelivery(orderId)
            }

            expect(serviceCall).rejects.toThrow(CourierOwnershipError)
        })
    })

})