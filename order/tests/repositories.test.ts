import { PrismaClient } from "@prisma/client"
import { createCourier, generateCourierCreateInputModel, generateCourierUpdateInputModel } from "./factories/users/courier"
import { createCustomer, generateCustomerCreateInputModel, generateCustomerUpdateInputModel } from "./factories/users/customer"
import PrismaCustomerRepository from "@src/modules/users/repositories/implementations/prisma/PrismaCustomerRepository"
import PrismaCourierRepository from '@src/modules/users/repositories/implementations/prisma/PrismaCourierRepository';
import PrismaModeratorRepository from "@src/modules/users/repositories/implementations/prisma/PrismaModeratorRepository"
import { createModerator, generateModeratorCreateInputModel, generateModeratorUpdateInputModel } from "./factories/users/moderator"
import PrismaRestaurantManagerRepository from "@src/modules/users/repositories/implementations/prisma/PrismaRestaurantManagerRepository"
import { createRestaurantManager, generateRestaurantManagerCreateInputModel, generateRestaurantManagerUpdateInputModel } from "./factories/users/restaurantManager"
import PrismaRestaurantRepository from "@src/modules/restaurants/repositories/implementations/prisma/PrismaRestaurantRepository"
import { createRestaurant, generateRestaurantCreateInputModel, generateRestaurantUpdateInputModel } from "./factories/restaurants/restaurant"
import PrismaMenuItemRepository from "@src/modules/menu/repositories/implementations/prisma/PrismaMenuItemRepository"
import { createMenuItem, generateMenuItemCreateInputModel, generateMenuItemUpdateInputModel } from "./factories/menu/menuItem"
import IBaseRepository from "@src/core/repositories/interfaces/IBaseRepository"
import { compareCourierWithCreateInput, compareCourierWithUpdateInput, compareCustomerWithCreateInput, compareCustomerWithUpdateInput, compareMenuItemWithCreateInput, compareMenuItemWithUpdateInput, compareModeratorWithCreateInput, compareModeratorWithUpdateInput, compareOrderItemWithCreateInput, compareOrderItemWithCreateInputWithOrder, compareOrderItemWithUpdateInput, compareOrderWithCreateInput, compareOrderWithUpdateInput, comparePromocodeWithCreateInput, comparePromocodeWithUpdateInput, comparePromotionWithCreateInput, comparePromotionWithUpdateInput, compareRestaurantManagerWithCreateInput, compareRestaurantManagerWithUpdateInput, compareRestaurantWithCreateInput, compareRestaurantWithUpdateInput } from "./utils/comparison"
import { MenuItemCreateInput, MenuItemModel, MenuItemUpdateInput } from "@src/modules/menu/models/menuItem.models"
import { RestaurantCreateInput, RestaurantUpdateInput, RestaurantModel } from "@src/modules/restaurants/models/restaurant.models"
import { RestaurantManagerCreateInput, RestaurantManagerUpdateInput, RestaurantManagerModel } from "@src/modules/users/models/restaurantManager.models"
import { ModeratorCreateInput, ModeratorUpdateInput, ModeratorModel } from "@src/modules/users/models/moderator.models"
import { CustomerCreateInput, CustomerUpdateInput, CustomerModel } from "@src/modules/users/models/customer.models"
import { CourierCreateInput, CourierUpdateInput, CourierModel } from "@src/modules/users/models/courier.models"
import PrismaPromotionRepository from "@src/modules/promotions/repositories/implementations/prisma/PrismaPromotionRepository"
import { PromotionCreateInput, PromotionUpdateInput, PromotionModel } from "@src/modules/promotions/models/promotion.models"
import { generatePromotionCreateInputModel, generatePromotionUpdateInputModel, createPromotion } from "./factories/promotions/promotion"
import { PromocodeCreateInput, PromocodeUpdateInput, PromocodeModel } from "@src/modules/promotions/models/promocode.models"
import PrismaPromocodeRepository from "@src/modules/promotions/repositories/implementations/prisma/PrismaPromocodeRepository"
import { generatePromocodeCreateInputModel, generatePromocodeUpdateInputModel, createPromocode } from "./factories/promotions/promocode"
import { OrderItemCreateInput, OrderItemUpdateInput, OrderItemModel } from "@src/modules/orders/models/orderItem.models"
import PrismaOrderItemRepository from "@src/modules/orders/repositories/implementations/prisma/PrismaOrderItemRepository"
import { generateOrderItemCreateInputModel, generateOrderItemUpdateInputModel, createOrderItem, generateOrderItemWithOrderCreateInputModel } from "./factories/orders/orderItem"
import { createOrder, generateOrderCreateInputModel, generateOrderUpdateInputModel } from "./factories/orders/order"
import { OrderCreateInput, OrderUpdateInput, OrderModel } from "@src/modules/orders/models/order.models"
import PrismaOrderRepository from "@src/modules/orders/repositories/implementations/prisma/PrismaOrderRepository"

describe("Tests for Prisma Repositories", () => {

    const prismaClient = new PrismaClient()
    const manyCount = 5

    beforeAll(async () => {
        (BigInt.prototype as any).toJSON = function () {
            return this.toString();
        };
        await prismaClient.$connect()
    })

    // afterEach(async () => {
    //     await clearPostgres(prismaClient)
    // }, 20000)
    
    afterAll(async () => {
        await prismaClient.$disconnect()
    })

    async function testGetOne<Model extends {id: bigint},
                              CreateInput,
                              UpdateInput,
                              Repository extends IBaseRepository<Model, CreateInput, UpdateInput>
                              >
                              (createInstance: {(): Promise<Model>}, repository: Repository)
    {
        const instance = await createInstance()
        const instanceDb = await repository.getOne(instance.id)
        
        expect(instanceDb).toEqual(instance)
    }

    async function testGetMany<Model extends {id: bigint},
                               CreateInput,
                               UpdateInput,
                               Repository extends IBaseRepository<Model, CreateInput, UpdateInput>
                               >
                               (createManyInstances: {(): Promise<Model[]>}, repository: Repository) 
    {
        const instances = await createManyInstances()
        const instancesDb = await repository.getMany()

        expect(instancesDb.length).not.toBe(0)
        expect(instancesDb).toEqual(expect.arrayContaining(instances))
    }

    async function testCreate<Model extends {id: bigint},
                              CreateInput,
                              UpdateInput,
                              Repository extends IBaseRepository<Model, CreateInput, UpdateInput>
                              >
                              (generateCreateInput: {(): Promise<CreateInput>}, compareWithCreateInput: {(instance: Model, createInput: CreateInput): boolean}, repository: Repository) 
    {
        const createInput = await generateCreateInput()
        const instanceDb = await repository.create(createInput)
        
        const equality = compareWithCreateInput(instanceDb, createInput)

        expect(equality).toBe(true)          
    }

    async function testUpdate<Model extends {id: bigint},
                              CreateInput,
                              UpdateInput,
                              Repository extends IBaseRepository<Model, CreateInput, UpdateInput>
                              >
                              (createInstance: {(): Promise<Model>}, generateUpdateInput: {(): Promise<UpdateInput>}, compareWithUpdateInput: {(instance: Model, updateInput: UpdateInput): boolean}, repository: Repository) 
    {
        const instance = await createInstance()

        const instanceUpdateInput = await generateUpdateInput()

        const instanceDb = await repository.update(instance.id, instanceUpdateInput)

        expect(instanceDb).not.toBe(null)

        const equality = compareWithUpdateInput(instanceDb as Model, instanceUpdateInput)

        expect(equality).toBe(true)
    }

    async function testDelete<Model extends {id: bigint},
                              CreateInput,
                              UpdateInput,
                              Repository extends IBaseRepository<Model, CreateInput, UpdateInput>
                              >
                              (createInstance: {(): Promise<Model>}, repository: Repository) 
    {
        const instance = await createInstance()
        
        await repository.delete(instance.id)

        const instanceDb = await repository.getOne(instance.id)

        expect(instanceDb).toBe(null)
    }

    describe('Tests for Courier Prisma Repository', () => {
        
        const courierPrismaRepository = new PrismaCourierRepository(prismaClient)

        const generateFullCourierCreateInput = async (): Promise<CourierCreateInput> => {
            return generateCourierCreateInputModel()
        }

        const generateFullCourierUpdateInput = async (): Promise<CourierUpdateInput> => {
            return generateCourierUpdateInputModel()
        }

        const createFullCourier = async (): Promise<CourierModel> => {
            return await createCourier(prismaClient)
        }

        const createFullCouriers = async (): Promise<CourierModel[]> => {
            return await Promise.all(Array.from({length: manyCount}, async () => await createFullCourier()))
        }

        test('should get one courier', async () => {
            await testGetOne(createFullCourier, courierPrismaRepository)
        })
    
        test('should get many couriers', async () => {
            await testGetMany(createFullCouriers, courierPrismaRepository)
        })
    
        test('should create courier', async () => {
            await testCreate(generateFullCourierCreateInput, compareCourierWithCreateInput, courierPrismaRepository)
        })
    
        test('should update courier', async () => {
            await testUpdate(createFullCourier, generateFullCourierUpdateInput, compareCourierWithUpdateInput, courierPrismaRepository)
        })
    
        test('should delete courier', async () => {
            await testDelete(createFullCourier, courierPrismaRepository)
        })
    })


    describe('Tests for Customer Prisma Repository', () => {

        const customerPrismaRepository = new PrismaCustomerRepository(prismaClient)

        const generateFullCustomerCreateInput = async (): Promise<CustomerCreateInput> => {
            return generateCustomerCreateInputModel()
        }

        const generateFullCustomerUpdateInput = async (): Promise<CustomerUpdateInput> => {
            return generateCustomerUpdateInputModel()
        }

        const createFullCustomer = async (): Promise<CustomerModel> => {
            return await createCustomer(prismaClient)
        }

        const createFullCustomers = async (): Promise<CustomerModel[]> => {
            return await Promise.all(Array.from({length: manyCount}, async () => await createFullCustomer()))
        }

        test('should get one customer', async () => {
            await testGetOne(createFullCustomer, customerPrismaRepository)
        })
    
        test('should get many customers', async () => {
            await testGetMany(createFullCustomers, customerPrismaRepository)
        })
    
        test('should create customer', async () => {
            await testCreate(generateFullCustomerCreateInput, compareCustomerWithCreateInput, customerPrismaRepository)
        })
    
        test('should update customer', async () => {
            await testUpdate(createFullCustomer, generateFullCustomerUpdateInput, compareCustomerWithUpdateInput, customerPrismaRepository)
        })
    
        test('should delete customer', async () => {
            await testDelete(createFullCustomer, customerPrismaRepository)
        })
    })

    describe('Tests for Moderator Prisma Repository', () => {

        const moderatorPrismaRepository = new PrismaModeratorRepository(prismaClient)

        const generateFullModeratorCreateInput = async (): Promise<ModeratorCreateInput> => {
            return generateModeratorCreateInputModel()
        }

        const generateFullModeratorUpdateInput = async (): Promise<ModeratorUpdateInput> => {
            return generateModeratorUpdateInputModel()
        }

        const createFullModerator = async (): Promise<ModeratorModel> => {
            return await createModerator(prismaClient)
        }

        const createFullModerators = async (): Promise<ModeratorModel[]> => {
            return await Promise.all(Array.from({length: manyCount}, async () => await createFullModerator()))
        }

        test('should get one moderator', async () => {
            await testGetOne(createFullModerator, moderatorPrismaRepository)
        })
    
        test('should get many moderators', async () => {
            await testGetMany(createFullModerators, moderatorPrismaRepository)
        })
    
        test('should create moderator', async () => {
            await testCreate(generateFullModeratorCreateInput, compareModeratorWithCreateInput, moderatorPrismaRepository)
        })
    
        test('should update moderator', async () => {
            await testUpdate(createFullModerator, generateFullModeratorUpdateInput, compareModeratorWithUpdateInput, moderatorPrismaRepository)
        })
    
        test('should delete moderator', async () => {
            await testDelete(createFullModerator, moderatorPrismaRepository)
        })
    })

    describe('Tests for Restaurant Manager Prisma Repository', () => {

        const restaurantManagerPrismaRepository = new PrismaRestaurantManagerRepository(prismaClient)

        const generateFullRestaurantManagerCreateInput = async (): Promise<RestaurantManagerCreateInput> => {
            const restaurant = await createRestaurant(prismaClient)
            return generateRestaurantManagerCreateInputModel(restaurant.id)
        }

        const generateFullRestaurantManagerUpdateInput = async (): Promise<RestaurantManagerUpdateInput> => {
            const restaurant = await createRestaurant(prismaClient)
            return generateRestaurantManagerUpdateInputModel(restaurant.id)
        }

        const createFullRestaurantManager = async (): Promise<RestaurantManagerModel> => {
            const restaurant = await createRestaurant(prismaClient)
            return await createRestaurantManager(prismaClient, restaurant.id)
        }

        const createFullRestaurantManagers = async (): Promise<RestaurantManagerModel[]> => {
            return await Promise.all(Array.from({length: manyCount}, async () => await createFullRestaurantManager()))
        }

        test('should get one restaurant manager', async () => {
            await testGetOne(createFullRestaurantManager, restaurantManagerPrismaRepository)
        })
    
        test('should get many restaurant managers', async () => {
            await testGetMany(createFullRestaurantManagers, restaurantManagerPrismaRepository)
        })
    
        test('should create restaurant manager', async () => {
            await testCreate(generateFullRestaurantManagerCreateInput, compareRestaurantManagerWithCreateInput, restaurantManagerPrismaRepository)
        })
    
        test('should update restaurant manager', async () => {
            await testUpdate(createFullRestaurantManager, generateFullRestaurantManagerUpdateInput, compareRestaurantManagerWithUpdateInput, restaurantManagerPrismaRepository)
        })
    
        test('should delete restaurant manager', async () => {
            await testDelete(createFullRestaurantManager, restaurantManagerPrismaRepository)
        })
    })


    describe('Tests for Restaurant Prisma Repository', () => {

        const restaurantPrismaRepository = new PrismaRestaurantRepository(prismaClient)

        const generateFullRestaurantCreateInput = async (): Promise<RestaurantCreateInput> => {
            return generateRestaurantCreateInputModel()
        }

        const generateFullRestaurantUpdateInput = async (): Promise<RestaurantUpdateInput> => {
            return generateRestaurantUpdateInputModel()
        }

        const createFullRestaurant = async (): Promise<RestaurantModel> => {
            return await createRestaurant(prismaClient)
        }

        const createFullRestaurants = async (): Promise<RestaurantModel[]> => {
            return await Promise.all(Array.from({length: manyCount}, async () => await createFullRestaurant()))
        }

        test('should get one restaurant', async () => {
            await testGetOne(createFullRestaurant, restaurantPrismaRepository)
        })
    
        test('should get many restaurants', async () => {
            await testGetMany(createFullRestaurants, restaurantPrismaRepository)
        })
    
        test('should create restaurant', async () => {
            await testCreate(generateFullRestaurantCreateInput, compareRestaurantWithCreateInput, restaurantPrismaRepository)
        })
    
        test('should update restaurant', async () => {
            await testUpdate(createFullRestaurant, generateFullRestaurantUpdateInput, compareRestaurantWithUpdateInput, restaurantPrismaRepository)
        })
    
        test('should delete restaurant', async () => {
            await testDelete(createFullRestaurant, restaurantPrismaRepository)
        })
    })

    describe('Tests for Menu Item Prisma Repository', () => {

        const menuItemPrismaRepository = new PrismaMenuItemRepository(prismaClient)

        const generateFullMenuItemCreateInput = async (): Promise<MenuItemCreateInput> => {
            const restaurant = await createRestaurant(prismaClient)
            return generateMenuItemCreateInputModel(restaurant.id)
        }

        const generateFullMenuItemUpdateInput = async (): Promise<MenuItemUpdateInput> => {
            const restaurant = await createRestaurant(prismaClient)
            return generateMenuItemUpdateInputModel(restaurant.id)
        }

        const createFullMenuItem = async (): Promise<MenuItemModel> => {
            const restaurant = await createRestaurant(prismaClient)
            return await createMenuItem(prismaClient, restaurant.id)
        }

        const createFullMenuItems = async (): Promise<MenuItemModel[]> => {
            return await Promise.all(Array.from({length: manyCount}, async () => await createFullMenuItem()))
        }

        test('should get one menu item', async () => {
            await testGetOne(createFullMenuItem, menuItemPrismaRepository)
        })
    
        test('should get many menu items', async () => {
            await testGetMany(createFullMenuItems, menuItemPrismaRepository)
        })
    
        test('should create menu item', async () => {
            await testCreate(generateFullMenuItemCreateInput, compareMenuItemWithCreateInput, menuItemPrismaRepository)
        })
    
        test('should update menu item', async () => {
            await testUpdate(createFullMenuItem, generateFullMenuItemUpdateInput, compareMenuItemWithUpdateInput, menuItemPrismaRepository)
        })
    
        test('should delete menu item', async () => {
            await testDelete(createFullMenuItem, menuItemPrismaRepository)
        })
    })

    describe('Tests for Promotion Prisma Repository', () => {

        const promotionPrismaRepository = new PrismaPromotionRepository(prismaClient)

        const generateFullPromotionCreateInput = async (): Promise<PromotionCreateInput> => {
            return generatePromotionCreateInputModel()
        }

        const generateFullPromotionUpdateInput = async (): Promise<PromotionUpdateInput> => {
            return generatePromotionUpdateInputModel()
        }

        const createFullPromotion = async (): Promise<PromotionModel> => {
            return await createPromotion(prismaClient)
        }

        const createFullPromotions = async (): Promise<PromotionModel[]> => {
            return await Promise.all(Array.from({length: manyCount}, async () => await createFullPromotion()))
        }

        test('should get one promotion', async () => {
            await testGetOne(createFullPromotion, promotionPrismaRepository)
        })
    
        test('should get many promotions', async () => {
            await testGetMany(createFullPromotions, promotionPrismaRepository)
        })
    
        test('should create promotion', async () => {
            await testCreate(generateFullPromotionCreateInput, comparePromotionWithCreateInput, promotionPrismaRepository)
        })
    
        test('should update promotion', async () => {
            await testUpdate(createFullPromotion, generateFullPromotionUpdateInput, comparePromotionWithUpdateInput, promotionPrismaRepository)
        })
    
        test('should delete promotion', async () => {
            await testDelete(createFullPromotion, promotionPrismaRepository)
        })
    })

    describe('Tests for Promocode Prisma Repository', () => {

        const promocodePrismaRepository = new PrismaPromocodeRepository(prismaClient)

        const generateFullPromocodeCreateInput = async (): Promise<PromocodeCreateInput> => {
            const promocode = await createRestaurant(prismaClient)
            return generatePromocodeCreateInputModel(promocode.id)
        }

        const generateFullPromocodeUpdateInput = async (): Promise<PromocodeUpdateInput> => {
            const promocode = await createRestaurant(prismaClient)
            return generatePromocodeUpdateInputModel(promocode.id)
        }

        const createFullPromocode = async (): Promise<PromocodeModel> => {
            const promocode = await createRestaurant(prismaClient)
            return await createPromocode(prismaClient, promocode.id)
        }

        const createFullPromocodes = async (): Promise<PromocodeModel[]> => {
            return await Promise.all(Array.from({length: manyCount}, async () => await createFullPromocode()))
        }

        test('should get one promocode', async () => {
            await testGetOne(createFullPromocode, promocodePrismaRepository)
        })

        test('should get one promocode by name', async () => {
            const promocodeInstance = await createFullPromocode()
            const promocodeInstanceDb = await promocodePrismaRepository.getOneByName(promocodeInstance.nameIdentifier)
            
            expect(promocodeInstanceDb).toEqual(promocodeInstance)
        })
        
        test('should get many promocodes', async () => {
            await testGetMany(createFullPromocodes, promocodePrismaRepository)
        })

        test('should get all restaurant promocodes', async () => {
            const restaurantInstance = await createRestaurant(prismaClient)

            const promocodeInstances = await Promise.all(Array.from({length: manyCount}, async () => {
                return await createPromocode(prismaClient, restaurantInstance.id)
            }))

            const promocodeIntancesDb = await promocodePrismaRepository.getRestaurantPromocodes(restaurantInstance.id)
            expect(promocodeIntancesDb).toEqual(expect.arrayContaining(promocodeInstances))
        })
    
        test('should create promocode', async () => {
            await testCreate(generateFullPromocodeCreateInput, comparePromocodeWithCreateInput, promocodePrismaRepository)
        })
    
        test('should update promocode', async () => {
            await testUpdate(createFullPromocode, generateFullPromocodeUpdateInput, comparePromocodeWithUpdateInput, promocodePrismaRepository)
        })
    
        test('should delete promocode', async () => {
            await testDelete(createFullPromocode, promocodePrismaRepository)
        })
    })

    describe('Tests for Order Item Prisma Repository', () => {

        const orderItemPrismaRepository = new PrismaOrderItemRepository(prismaClient)

        const generateFullOrderItemCreateInput = async (): Promise<OrderItemCreateInput> => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const courier = await createCourier(prismaClient)
            const orderItems = Array.from({length: manyCount}, () => {
                return generateOrderItemWithOrderCreateInputModel()
            })

            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItems, courier.id)
            return generateOrderItemCreateInputModel(order.id)
        }

        const generateFullOrderItemUpdateInput = async (): Promise<OrderItemUpdateInput> => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const courier = await createCourier(prismaClient)
            const orderItems = Array.from({length: manyCount}, () => {
                return generateOrderItemWithOrderCreateInputModel()
            })

            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItems, courier.id)
            return generateOrderItemUpdateInputModel(order.id)
        }

        const createFullOrderItem = async (): Promise<OrderItemModel> => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const courier = await createCourier(prismaClient)
            const orderItems = Array.from({length: manyCount}, () => {
                return generateOrderItemWithOrderCreateInputModel()
            })

            const order = await createOrder(prismaClient, customer.id, restaurant.id, orderItems, courier.id)
            return await createOrderItem(prismaClient, order.id)
        }

        const createFullOrderItems = async (): Promise<OrderItemModel[]> => {
            return await Promise.all(Array.from({length: manyCount}, async () => await createFullOrderItem()))
        }

        test('should get one order item', async () => {
            await testGetOne(createFullOrderItem, orderItemPrismaRepository)
        })
    
        test('should get many order items', async () => {
            await testGetMany(createFullOrderItems, orderItemPrismaRepository)
        })

        test('should get all order items by order id', async () => {
            const customerInstance = await createCustomer(prismaClient)
            const restaurantInstance = await createRestaurant(prismaClient)
            const courierInstance = await createCourier(prismaClient)
            const orderItemInstances = Array.from({length: manyCount}, () => {
                return generateOrderItemWithOrderCreateInputModel()
            }).sort((a, b) => a.menuItemName.localeCompare(b.menuItemName))

            const orderInstance = await createOrder(prismaClient, customerInstance.id, restaurantInstance.id, orderItemInstances, courierInstance.id)

            const orderItemInstancesDb = (await orderItemPrismaRepository.getOrderItems(orderInstance.id)).sort((a, b) => a.menuItemName.localeCompare(b.menuItemName))

            const equality = orderItemInstancesDb.every((orderItemInstanceDb, index) => compareOrderItemWithCreateInputWithOrder(orderItemInstanceDb, orderItemInstances[index]))

            expect(equality).toBe(true)
        })

        test('should create order item', async () => {
            await testCreate(generateFullOrderItemCreateInput, compareOrderItemWithCreateInput, orderItemPrismaRepository)
        })
    
        test('should update order item', async () => {
            await testUpdate(createFullOrderItem, generateFullOrderItemUpdateInput, compareOrderItemWithUpdateInput, orderItemPrismaRepository)
        })
    
        test('should delete order item', async () => {
            await testDelete(createFullOrderItem, orderItemPrismaRepository)
        })
    })

    describe('Tests for Order Prisma Repository', () => {

        const orderPrismaRepository = new PrismaOrderRepository(prismaClient)

        const generateFullOrderCreateInput = async (): Promise<OrderCreateInput> => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const courier = await createCourier(prismaClient)
            const orderItems = Array.from({length: manyCount}, () => {
                return generateOrderItemWithOrderCreateInputModel()
            })

            return generateOrderCreateInputModel(customer.id, restaurant.id, orderItems, courier.id)
        }

        const generateFullOrderUpdateInput = async (): Promise<OrderUpdateInput> => {
            const courier = await createCourier(prismaClient)
            return generateOrderUpdateInputModel(courier.id)
        }

        const createFullOrder = async (): Promise<OrderModel> => {
            const customer = await createCustomer(prismaClient)
            const restaurant = await createRestaurant(prismaClient)
            const courier = await createCourier(prismaClient)
            const orders = Array.from({length: manyCount}, () => {
                return generateOrderItemWithOrderCreateInputModel()
            })

            return await createOrder(prismaClient, customer.id, restaurant.id, orders, courier.id)
        }

        const createFullOrders = async (): Promise<OrderModel[]> => {
            return await Promise.all(Array.from({length: manyCount}, async () => await createFullOrder()))
        }

        test('should get one order', async () => {
            await testGetOne(createFullOrder, orderPrismaRepository)
        })

        test('should get one order with items', async () => {
            const orderInstance = await createFullOrder()
            const orderInstanceDb = await orderPrismaRepository.getOne(orderInstance.id, true)

            expect(orderInstanceDb?.items).not.toBe(undefined)

        })
    
        test('should get many orders', async () => {
            await testGetMany(createFullOrders, orderPrismaRepository)
        })

        test('should get many orders with items', async () => {
            const orderInstances = await createFullOrders()
            const orderInstancesDb = await orderPrismaRepository.getMany(true)

            const itemsNotEmpty = orderInstancesDb.every((orderInstanceDb) => orderInstanceDb.items)
            expect(itemsNotEmpty).toBe(true)
        })

        test('should get many orders with READY status', async () => {
            const orderInstances = await createFullOrders()
            const orderInstancesDb = await orderPrismaRepository.getMany(true, "READY")

            const ordersAreWithReadyStatus = orderInstancesDb.every((orderInstanceDb) => orderInstanceDb.status === "READY")
            expect(ordersAreWithReadyStatus).toBe(true)
        })

        test('should get all orders of customer', async () => {
            const customer = await createCustomer(prismaClient)
            for (let i = 0; i < manyCount; i++){
                const restaurant = await createRestaurant(prismaClient)
                const courier = await createCourier(prismaClient)
                const orders = Array.from({length: manyCount}, () => {
                    return generateOrderItemWithOrderCreateInputModel()
                })
                await createOrder(prismaClient, customer.id, restaurant.id, orders, courier.id)
            }

            const orderInstancesDb = await orderPrismaRepository.getCustomerOrders(customer.id)

            const ordersBelongToCustomer = orderInstancesDb.every((orderInstanceDb) => orderInstanceDb.customerId === customer.id)
            expect(ordersBelongToCustomer).toBe(true)
        })

        test('should get all orders of courier', async () => {
            const courier = await createCourier(prismaClient)

            for (let i = 0; i < manyCount; i++){
                const customer = await createCustomer(prismaClient)
                const restaurant = await createRestaurant(prismaClient)
                const orders = Array.from({length: manyCount}, () => {
                    return generateOrderItemWithOrderCreateInputModel()
                })
                await createOrder(prismaClient, customer.id, restaurant.id, orders, courier.id)
            }

            const orderInstancesDb = await orderPrismaRepository.getCourierOrders(courier.id)

            const ordersBelongToCourier = orderInstancesDb.every((orderInstanceDb) => orderInstanceDb.courierId === courier.id)
            expect(ordersBelongToCourier).toBe(true)
        })

        test('should get all orders of restaurant', async () => {
            const restaurant = await createRestaurant(prismaClient)

            for (let i = 0; i < manyCount; i++){
                const customer = await createCustomer(prismaClient)
                const courier = await createCourier(prismaClient)

                const orders = Array.from({length: manyCount}, () => {
                    return generateOrderItemWithOrderCreateInputModel()
                })
                await createOrder(prismaClient, customer.id, restaurant.id, orders, courier.id)
            }

            const orderInstancesDb = await orderPrismaRepository.getRestaurantOrders(restaurant.id)

            const ordersBelongToRestaurant = orderInstancesDb.every((orderInstanceDb) => orderInstanceDb.restaurantId === restaurant.id)
            expect(ordersBelongToRestaurant).toBe(true)
        })

        test('should create order', async () => {
            await testCreate(generateFullOrderCreateInput, compareOrderWithCreateInput, orderPrismaRepository)
        })
    
        test('should update order', async () => {
            await testUpdate(createFullOrder, generateFullOrderUpdateInput, compareOrderWithUpdateInput, orderPrismaRepository)
        })

    })
})