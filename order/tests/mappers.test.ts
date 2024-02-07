import { MenuItemCreateInputDTO, MenuItemUpdateInputDTO } from '@src/modules/menu/dto/menuItem';
import { CourierCreateInputDTO, CourierGetOutputDTO } from './../src/modules/users/dto/courier';
import { CourierCreateMapper, CourierGetMapper } from "@src/modules/users/mappers/instances/courier"
import { generateCourierCreateInputDto, generateCourierModel } from "./factories/users/courier"
import { CustomerCreateMapper, CustomerGetMapper } from '@src/modules/users/mappers/instances/customer';
import { generateCustomerCreateInputDto, generateCustomerModel } from './factories/users/customer';
import { ModeratorGetMapper, ModeratorCreateMapper } from '@src/modules/users/mappers/instances/moderator';
import { generateModeratorModel, generateModeratorCreateInputDto } from './factories/users/moderator';
import { RestaurantManagerGetMapper, RestaurantManagerCreateMapper } from '@src/modules/users/mappers/instances/restaurantManager';
import { generateRestaurantManagerModel, generateRestaurantManagerCreateInputDto } from './factories/users/restaurantManager';
import { generateRestaurantCreateInputDto, generateRestaurantModel } from './factories/restaurants/restaurant';
import { MenuItemGetMapper, MenuItemCreateMapper, MenuItemUpdateMapper } from '@src/modules/menu/mappers/instances/menuItem';
import { RestaurantGetMapper, RestaurantCreateMapper } from '@src/modules/restaurants/mappers/instances/restaurant';
import { generateMenuItemModel, generateMenuItemCreateInputDto, generateMenuItemUpdateInputDto, generateMenuItemCreateInputModel, generateMenuItemUpdateInputModel } from './factories/menu/menuItem';
import { faker } from '@faker-js/faker';
import { PromotionGetMapper, PromotionCreateMapper } from '@src/modules/promotions/mappers/instances/promotion';
import { generatePromotionModel, generatePromotionCreateInputDto } from './factories/promotions/promotion';
import { CourierModel } from '@src/modules/users/models/courier';
import { CustomerModel } from '@src/modules/users/models/customer';
import { CustomerCreateInputDTO } from '@src/modules/users/dto/customer';
import { ModeratorModel } from '@src/modules/users/models/moderator';
import { ModeratorCreateInputDTO } from '@src/modules/users/dto/moderator';
import { RestaurantManagerModel } from '@src/modules/users/models/restaurantManager';
import { RestaurantManagerCreateInputDTO } from '@src/modules/users/dto/restaurantManager';
import { RestaurantCreateInputDTO } from '@src/modules/restaurants/dto/restaurant';
import { RestaurantModel } from '@src/modules/restaurants/models/restaurant';
import { MenuItemModel } from '@src/modules/menu/models/menuItem';
import { PromotionCreateInputDTO } from '@src/modules/promotions/dto/promotion';
import { PromotionModel } from '@src/modules/promotions/models/promotion';
import { generatePromocodeCreateInputDto, generatePromocodeModel, generatePromocodeUpdateInputDto } from './factories/promotions/promocode';
import { PromocodeCreateInputDTO, PromocodeUpdateInputDTO } from '@src/modules/promotions/dto/promocode';
import { PromocodeGetMapper, PromocodeCreateMapper, PromocodeUpdateMapper } from '@src/modules/promotions/mappers/instances/promocode';
import { PromocodeModel } from '@src/modules/promotions/models/promocode';
import { OrderItemCreateInputDTO } from '@src/modules/orders/dto/orderItem';
import { OrderItemGetMapper, OrderItemCreateMapper } from '@src/modules/orders/mappers/instances/orderItem';
import { OrderItemModel } from '@src/modules/orders/models/orderItem';
import { generateOrderItemModel, generateOrderItemCreateInputDto } from './factories/orders/orderItem';
import { OrderAdditionalData, OrderItemAdditionalData, OrderItemWithOrderAdditionalData } from '@src/modules/orders/mappers/additionalData';
import { OrderCreateInputDTO } from '@src/modules/orders/dto/order';
import { OrderGetMapper, OrderCreateMapper } from '@src/modules/orders/mappers/instances/order';
import { OrderModel } from '@src/modules/orders/models/order';
import { generateOrderModel, generateOrderCreateInputDto } from './factories/orders/order';

describe("Tests for Data Mappers", () => {

    const manyCount = 5

    function testDatabaseToDtoMapper<DatabaseModel, 
                                     DtoModel, 
                                     Mapper extends {toDto(dbModel: DatabaseModel): DtoModel}>
                                     (generateDatabaseModel: {(): DatabaseModel}, getExpectedResult: {(dbModel: DatabaseModel): object}, mapper: Mapper) 
    {
        const instance = generateDatabaseModel()
        const expectedResult = getExpectedResult(instance)
        const result = mapper.toDto(instance)
        
        expect(result).toEqual(expectedResult)
    }

    function testDtoToDatabaseMapper<DtoModel, 
                                     DatabaseModel,
                                     AdditionalData, 
                                     Mapper extends {toDbModel(dtoModel: DtoModel): DatabaseModel}>
                                     (generateDtoModel: {(): DtoModel}, getExpectedResult: {(dtoModel: DtoModel): object}, mapper: Mapper) 
    {
        const dtoModel = generateDtoModel()
        const expectedResult = getExpectedResult(dtoModel)
        const result = mapper.toDbModel(dtoModel)
        expect(result).toEqual(expectedResult)
    }


    // COURIER

    describe("Tests for Courier Mappers", () => {

        describe("Tests for Courier Get Mapper", () => {

            const courierGetMapper = new CourierGetMapper()
            
            const getExpectedDtoResult = (courierInstance: CourierModel): object => {
                return {
                    id: Number(courierInstance.id)
                }
            }

            test("should map courier database model to get output dto model", () => {
                testDatabaseToDtoMapper(generateCourierModel, getExpectedDtoResult, courierGetMapper)
            })
    
        })
    
        describe("Tests for Courier Create Mapper", () => {
    
            const courierCreateMapper = new CourierCreateMapper()
            
            const getExpectedDbResult = (courierDto: CourierCreateInputDTO): object => {
                return {
                    id: BigInt(courierDto.id)
                }
            }

            const getExpectedDtoResult = (courierInstance: CourierModel): object => {
                return {
                    id: Number(courierInstance.id)
                }
            }

            test("should map courier create input dto model to create input database model", () => {
                testDtoToDatabaseMapper(generateCourierCreateInputDto, getExpectedDbResult, courierCreateMapper)
            })
    
            test("should map courier database model to create output dto model", () => {
                testDatabaseToDtoMapper(generateCourierModel, getExpectedDtoResult, courierCreateMapper)
            })
    
        })
    })

    // CUSTOMER

    describe("Tests for Customer Mappers", () => {

        describe("Tests for Customer Get Mapper", () => {

            const customerGetMapper = new CustomerGetMapper()
            
            const getExpectedDtoResult = (customerInstance: CustomerModel): object => {
                return {
                    id: Number(customerInstance.id)
                }
            }

            test("should map customer database model to get output dto model", () => {
                testDatabaseToDtoMapper(generateCustomerModel, getExpectedDtoResult, customerGetMapper)
            })
    
        })
    
        describe("Tests for Customer Create Mapper", () => {
    
            const customerCreateMapper = new CustomerCreateMapper()
            
            const getExpectedDbResult = (courierDto: CustomerCreateInputDTO): object => {
                return {
                    id: BigInt(courierDto.id)
                }
            }

            const getExpectedDtoResult = (courierInstance: CustomerModel): object => {
                return {
                    id: Number(courierInstance.id)
                }
            }

            test("should map customer create input dto model to create input database model", () => {
                testDtoToDatabaseMapper(generateCustomerCreateInputDto, getExpectedDbResult, customerCreateMapper)
            })
    
            test("should map customer database model to create output dto model", () => {
                testDatabaseToDtoMapper(generateCustomerModel, getExpectedDtoResult, customerCreateMapper)
            })
    
        })
    })

    // MODERATOR

    describe("Tests for Moderator Mappers", () => {

        describe("Tests for Moderator Get Mapper", () => {

            const moderatorGetMapper = new ModeratorGetMapper()
            
            const getExpectedDtoResult = (moderatorInstance: ModeratorModel): object => {
                return {
                    id: Number(moderatorInstance.id)
                }
            }

            test("should map moderator database model to get output dto model", () => {
                testDatabaseToDtoMapper(generateModeratorModel, getExpectedDtoResult, moderatorGetMapper)
            })
    
        })
        
        describe("Tests for Moderator Create Mapper", () => {
    
            const moderatorCreateMapper = new ModeratorCreateMapper()
            
            const getExpectedDbResult = (moderatorDto: ModeratorCreateInputDTO): object => {
                return {
                    id: BigInt(moderatorDto.id)
                }
            }

            const getExpectedDtoResult = (moderatorInstance: ModeratorModel): object => {
                return {
                    id: Number(moderatorInstance.id)
                }
            }

            test("should map moderator create input dto model to create input database model", () => {
                testDtoToDatabaseMapper(generateModeratorCreateInputDto, getExpectedDbResult, moderatorCreateMapper)
            })
    
            test("should map moderator database model to create output dto model", () => {
                testDatabaseToDtoMapper(generateModeratorModel, getExpectedDtoResult, moderatorCreateMapper)
            })
    
        })

    })

    // RESTAURANT MANAGER

    describe("Tests for Restaurant Manager Mappers", () => {

        const generateFullRestaurantManagerModel = (): RestaurantManagerModel => {
            const restaurantId = BigInt(faker.number.int())
            return generateRestaurantManagerModel(restaurantId)
        }

        describe("Tests for Restaurant Manager Get Mapper", () => {

            const restaurantManagerGetMapper = new RestaurantManagerGetMapper()
    
            const getExpectedDtoResult = (restaurantManagerInstance: RestaurantManagerModel): object => {
                return {
                    id: Number(restaurantManagerInstance.id),
                    restaurantId: restaurantManagerInstance.restaurantId ? Number(restaurantManagerInstance.restaurantId) : undefined
                }
            }

            test("should map restaurant manager database model to get output dto model", () => {
                testDatabaseToDtoMapper(generateRestaurantManagerModel, getExpectedDtoResult, restaurantManagerGetMapper)
            })

            test("should map restaurant manager database model to get output dto model including restaurant", () => {
                testDatabaseToDtoMapper(generateFullRestaurantManagerModel, getExpectedDtoResult, restaurantManagerGetMapper)
            })
    
        })
        
        describe("Tests for Restaurant Manager Create Mapper", () => {
    
            const restaurantManagerCreateMapper = new RestaurantManagerCreateMapper()
            
            const getExpectedDbResult = (restaurantManagerDto: RestaurantManagerCreateInputDTO): object => {
                return {
                    id: BigInt(restaurantManagerDto.id)
                }
            }

            const getExpectedDtoResult = (restaurantManagerInstance: RestaurantManagerModel): object => {
                return {
                    id: Number(restaurantManagerInstance.id)
                }
            }
            
            test("should map restaurant manager create input dto model to create input database model", () => {
                testDtoToDatabaseMapper(generateRestaurantManagerCreateInputDto, getExpectedDbResult, restaurantManagerCreateMapper)
            })

            test("should map restaurant manager database model to create output dto model", () => {
                testDatabaseToDtoMapper(generateRestaurantManagerModel, getExpectedDtoResult, restaurantManagerCreateMapper)
            })

        })

    })

    // RESTAURANT

    describe("Tests for Restaurant Mappers", () => {

        describe("Tests for Restaurant Get Mapper", () => {

            const restaurantGetMapper = new RestaurantGetMapper()
            
            const getExpectedDtoResult = (restaurantInstance: RestaurantModel): object => {
                return {
                    id: Number(restaurantInstance.id)
                }
            }

            test("should map restaurant database model to get output dto model", () => {
                testDatabaseToDtoMapper(generateRestaurantModel, getExpectedDtoResult, restaurantGetMapper)
            })
    
        })
        
        describe("Tests for Restaurant Create Mapper", () => {
    
            const restaurantCreateMapper = new RestaurantCreateMapper()
    
            const getExpectedDbResult = (restaurantDto: RestaurantCreateInputDTO): object => {
                return {
                    id: BigInt(restaurantDto.id)
                }
            }

            const getExpectedDtoResult = (restaurantInstance: RestaurantModel): object => {
                return {
                    id: Number(restaurantInstance.id)
                }
            }
            
            test("should map restaurant create input dto model to create input database model", () => {
                testDtoToDatabaseMapper(generateRestaurantCreateInputDto, getExpectedDbResult, restaurantCreateMapper)
            })
    
            test("should map restaurant database model to create output dto model", () => {
                testDatabaseToDtoMapper(generateRestaurantModel, getExpectedDtoResult, restaurantCreateMapper)
            })
    
        })

    })

    // MENU ITEM

    describe("Tests for Menu Item Mappers", () => {

        const generateFullMenuItemModel = (): MenuItemModel => {
            const restaurantId = BigInt(faker.number.int())
            return generateMenuItemModel(restaurantId)
        }

        describe("Tests for Menu Item Get Mapper", () => {

            const menuItemGetMapper = new MenuItemGetMapper()

            const getExpectedDtoResult = (menuItemInstance: MenuItemModel): object => {
                return {
                    id: Number(menuItemInstance.id),
                    name: menuItemInstance.name,
                    imageUrl: menuItemInstance.imageUrl,
                    price: menuItemInstance.price,
                    restaurantId: Number(menuItemInstance.restaurantId)
                }
            }

            test("should map menu item database model to get output dto model", () => {
                testDatabaseToDtoMapper(generateFullMenuItemModel, getExpectedDtoResult, menuItemGetMapper)
            })
    
        })
        
        describe("Tests for Menu Item Create Mapper", () => {
    
            const menuItemCreateMapper = new MenuItemCreateMapper()

            const generateFullMenuItemDto = (): MenuItemCreateInputDTO => {
                const restaurantId = faker.number.int()
                return generateMenuItemCreateInputDto(restaurantId)
            }

            const getExpectedDbResult = (menuItemDto: MenuItemCreateInputDTO): object => {
                return {
                    id: BigInt(menuItemDto.id),
                    name: menuItemDto.name,
                    imageUrl: menuItemDto.imageUrl,
                    price: menuItemDto.price,
                    restaurantId: BigInt(menuItemDto.restaurantId)
                }
            }

            const getExpectedDtoResult = (menuItemInstance: MenuItemModel): object => {
                return {
                    id: Number(menuItemInstance.id),
                    name: menuItemInstance.name,
                    imageUrl: menuItemInstance.imageUrl,
                    price: menuItemInstance.price,
                    restaurantId: Number(menuItemInstance.restaurantId)
                }
            }
            

            test("should map menu item create input dto model to create input database model", () => {
                testDtoToDatabaseMapper(generateFullMenuItemDto, getExpectedDbResult, menuItemCreateMapper)
            })
    
            test("should map menu item database model to create output dto model", () => {
                testDatabaseToDtoMapper(generateFullMenuItemModel, getExpectedDtoResult, menuItemCreateMapper)
            })
    
        })

        describe("Tests for Menu Item Update Mapper", () => {
    
            const menuItemUpdateMapper = new MenuItemUpdateMapper()

            const getExpectedDbResult = (menuItemDto: MenuItemUpdateInputDTO): object => {
                return {
                    name: menuItemDto.name,
                    imageUrl: menuItemDto.imageUrl,
                    price: menuItemDto.price
                }
            }

            const getExpectedDtoResult = (menuItemInstance: MenuItemModel): object => {
                return {
                    id: Number(menuItemInstance.id),
                    name: menuItemInstance.name,
                    imageUrl: menuItemInstance.imageUrl,
                    price: menuItemInstance.price,
                    restaurantId: Number(menuItemInstance.restaurantId)
                }
            }

            test("should map menu item update input dto model to update input database model", () => {
                testDtoToDatabaseMapper(generateMenuItemUpdateInputDto, getExpectedDbResult, menuItemUpdateMapper)
            })
    
            test("should map menu item database model to update output dto model", () => {
                testDatabaseToDtoMapper(generateFullMenuItemModel, getExpectedDtoResult, menuItemUpdateMapper)
            })
    
        })

    })

    // PROMOTION

    describe("Tests for Promotion Mappers", () => {

        describe("Tests for Promotion Get Mapper", () => {

            const promotionGetMapper = new PromotionGetMapper()

            const getExpectedDtoResult = (promotionInstance: PromotionModel): object => {
                return {
                    id: Number(promotionInstance.id)
                }
            }

            test("should map promotion database model to get output dto model", () => {
                testDatabaseToDtoMapper(generatePromotionModel, getExpectedDtoResult, promotionGetMapper)
            })
    
        })
        
        describe("Tests for Promotion Create Mapper", () => {
    
            const promotionCreateMapper = new PromotionCreateMapper()
            
            const getExpectedDbResult = (promotionDto: PromotionCreateInputDTO): object => {
                return {
                    id: BigInt(promotionDto.id)
                }
            }

            const getExpectedDtoResult = (promotionInstance: PromotionModel): object => {
                return {
                    id: Number(promotionInstance.id)
                }
            }

            test("should map promotion create input dto model to create input database model", () => {
                testDtoToDatabaseMapper(generatePromotionCreateInputDto, getExpectedDbResult, promotionCreateMapper)
            })
    
            test("should map promotion database model to create output dto model", () => {
                testDatabaseToDtoMapper(generatePromotionModel, getExpectedDtoResult, promotionCreateMapper)
            })
    
        })

    })

    // PROMOCODE

    describe("Tests for Promocode Mappers", () => {

        const generateFullPromocodeModel = (): PromocodeModel => {
            const restaurantId = BigInt(faker.number.int())
            return generatePromocodeModel(restaurantId)
        }

        describe("Tests for Promocode Get Mapper", () => {

            const promocodeGetMapper = new PromocodeGetMapper()

            const getExpectedDtoResult = (promocodeInstance: PromocodeModel): object => {
                return {
                    id: Number(promocodeInstance.id),
                    nameIdentifier: promocodeInstance.nameIdentifier,
                    discountPercentage: promocodeInstance.discountPercentage,
                    validFrom: promocodeInstance.validFrom.toString(),
                    validUntil: promocodeInstance.validUntil.toString(),
                    maxUsageCount: promocodeInstance.maxUsageCount,
                    currentUsageCount: promocodeInstance.currentUsageCount,
                    restaurantId: Number(promocodeInstance.restaurantId),
                    isActive: promocodeInstance.isActive
                }
            }

            test("should map promocode database model to get output dto model", () => {
                testDatabaseToDtoMapper(generateFullPromocodeModel, getExpectedDtoResult, promocodeGetMapper)
            })
    
        })
        
        describe("Tests for Promocode Create Mapper", () => {
    
            const promocodeCreateMapper = new PromocodeCreateMapper()

            const generateFullPromocodeDto = (): PromocodeCreateInputDTO => {
                const restaurantId = faker.number.int()
                return generatePromocodeCreateInputDto(restaurantId)
            }

            const getExpectedDbResult = (promocodeDto: PromocodeCreateInputDTO): object => {
                return {
                    nameIdentifier: promocodeDto.nameIdentifier,
                    discountPercentage: promocodeDto.discountPercentage,
                    validFrom: new Date(promocodeDto.validFrom),
                    validUntil: new Date(promocodeDto.validUntil),
                    maxUsageCount: promocodeDto.maxUsageCount,
                    restaurantId: BigInt(promocodeDto.restaurantId)
                }
            }

            const getExpectedDtoResult = (promocodeInstance: PromocodeModel): object => {
                return {
                    id: Number(promocodeInstance.id),
                    nameIdentifier: promocodeInstance.nameIdentifier,
                    discountPercentage: promocodeInstance.discountPercentage,
                    validFrom: promocodeInstance.validFrom.toString(),
                    validUntil: promocodeInstance.validUntil.toString(),
                    maxUsageCount: promocodeInstance.maxUsageCount,
                    currentUsageCount: promocodeInstance.currentUsageCount,
                    restaurantId: Number(promocodeInstance.restaurantId),
                    isActive: promocodeInstance.isActive
                }
            }

            test("should map promocode create input dto model to create input database model", () => {
                testDtoToDatabaseMapper(generateFullPromocodeDto, getExpectedDbResult, promocodeCreateMapper)
            })
    
            test("should map promocode database model to create output dto model", () => {
                testDatabaseToDtoMapper(generateFullPromocodeModel, getExpectedDtoResult, promocodeCreateMapper)
            })
    
        })

        describe("Tests for Promocode Update Mapper", () => {
    
            const promocodeUpdateMapper = new PromocodeUpdateMapper()

            const getExpectedDbResult = (promocodeDto: PromocodeUpdateInputDTO): object => {
                return {
                    discountPercentage: promocodeDto.discountPercentage,
                    validFrom: new Date(promocodeDto.validFrom),
                    validUntil: new Date(promocodeDto.validUntil),
                    maxUsageCount: promocodeDto.maxUsageCount,
                }
            }

            const getExpectedDtoResult = (promocodeInstance: PromocodeModel): object => {
                return {
                    id: Number(promocodeInstance.id),
                    nameIdentifier: promocodeInstance.nameIdentifier,
                    discountPercentage: promocodeInstance.discountPercentage,
                    validFrom: promocodeInstance.validFrom.toString(),
                    validUntil: promocodeInstance.validUntil.toString(),
                    maxUsageCount: promocodeInstance.maxUsageCount,
                    currentUsageCount: promocodeInstance.currentUsageCount,
                    restaurantId: Number(promocodeInstance.restaurantId),
                    isActive: promocodeInstance.isActive
                }
            }

            test("should map promocode create input dto model to create input database model", () => {
                testDtoToDatabaseMapper(generatePromocodeUpdateInputDto, getExpectedDbResult, promocodeUpdateMapper)
            })
    
            test("should map promocode database model to create output dto model", () => {
                testDatabaseToDtoMapper(generateFullPromocodeModel, getExpectedDtoResult, promocodeUpdateMapper)
            })
    
        })

    })

    // ORDER ITEM

    describe("Tests for Order Item Mappers", () => {

        const generateFullOrderItemModel = (): OrderItemModel => {
            const orderId = BigInt(faker.number.int())
            return generateOrderItemModel(orderId)
        }

        describe("Tests for Order Item Get Mapper", () => {

            const orderItemGetMapper = new OrderItemGetMapper()

            const getExpectedDtoResult = (orderItemInstance: OrderItemModel): object => {
                return {
                    id: Number(orderItemInstance.id),
                    orderId: Number(orderItemInstance.orderId),
                    menuItemName: orderItemInstance.menuItemName,
                    menuItemImageUrl: orderItemInstance.menuItemImageUrl,
                    menuItemPrice: orderItemInstance.menuItemPrice,
                    quantity: orderItemInstance.quantity
                }
            }

            test("should map order item database model to get output dto model", () => {
                testDatabaseToDtoMapper(generateFullOrderItemModel, getExpectedDtoResult, orderItemGetMapper)
            })
    
        })
        
        describe("Tests for Order Item Create Mapper", () => {
    
            const orderItemCreateMapper = new OrderItemCreateMapper()

            const generateFullOrderItemDto = (): OrderItemCreateInputDTO => {
                const menuItemId = faker.number.int()
                return generateOrderItemCreateInputDto(menuItemId)
            }

            const generateOrderItemAdditionalData = (): OrderItemAdditionalData => {
                const orderItemInstance = generateFullOrderItemModel()
                return {
                    menuItemName: orderItemInstance.menuItemName,
                    menuItemImageUrl: orderItemInstance.menuItemImageUrl,
                    menuItemPrice: orderItemInstance.menuItemPrice,
                    orderId: Number(orderItemInstance.orderId)
                }
            }
            
            const generateOrderItemWithOrderAdditionalData = (): OrderItemWithOrderAdditionalData => {
                const orderItemInstance = generateFullOrderItemModel()
                return {
                    menuItemName: orderItemInstance.menuItemName,
                    menuItemImageUrl: orderItemInstance.menuItemImageUrl,
                    menuItemPrice: orderItemInstance.menuItemPrice
                }
            }

            const getExpectedDbResult = (orderItemDto: OrderItemCreateInputDTO, additionalData: OrderItemAdditionalData): object => {
                return {
                    menuItemName: additionalData.menuItemName,
                    menuItemImageUrl: additionalData.menuItemImageUrl,
                    menuItemPrice: additionalData.menuItemPrice,
                    orderId: BigInt(additionalData.orderId),
                    quantity: orderItemDto.quantity
                }
            }

            const getExpectedDbResultWithOrder = (orderItemDto: OrderItemCreateInputDTO, additionalData: OrderItemWithOrderAdditionalData): object => {
                return {
                    menuItemName: additionalData.menuItemName,
                    menuItemImageUrl: additionalData.menuItemImageUrl,
                    menuItemPrice: additionalData.menuItemPrice,
                    quantity: orderItemDto.quantity
                }
            }

            const getExpectedDtoResult = (orderItemInstance: OrderItemModel): object => {
                return {
                    id: Number(orderItemInstance.id),
                    orderId: Number(orderItemInstance.orderId),
                    menuItemName: orderItemInstance.menuItemName,
                    menuItemImageUrl: orderItemInstance.menuItemImageUrl,
                    menuItemPrice: orderItemInstance.menuItemPrice,
                    quantity: orderItemInstance.quantity
                }
            }

            test("should map order item create input dto model to create input database model", () => {
                const orderDtoModel = generateFullOrderItemDto()
                const additionalData = generateOrderItemAdditionalData()
                const expectedResult = getExpectedDbResult(orderDtoModel, additionalData)

                const result = orderItemCreateMapper.toDbModel(orderDtoModel, additionalData)
                
                expect(result).toEqual(expectedResult)
            })
    
            test("should map order item with order database model to create output dto model", () => {
                const orderDtoModel = generateFullOrderItemDto()
                const additionalData = generateOrderItemWithOrderAdditionalData()
                const expectedResult = getExpectedDbResultWithOrder(orderDtoModel, additionalData)

                const result = orderItemCreateMapper.toDbModelWithOrder(orderDtoModel, additionalData)
                
                expect(result).toEqual(expectedResult)
            })

            test("should map order item database model to create output dto model", () => {
                testDatabaseToDtoMapper(generateFullOrderItemModel, getExpectedDtoResult, orderItemCreateMapper)
            })

        })

    })

    // ORDER

    describe("Tests for Order Mappers", () => {

        const generateFullOrderModel = (): OrderModel => {
            const customerId = BigInt(faker.number.int())
            const restaurantId = BigInt(faker.number.int())
            const courierId = BigInt(faker.number.int())
            const promotionId = BigInt(faker.number.int())
            const promocodeName = faker.lorem.word(5)
            const promocodeDiscount = faker.number.int({
                min: 10,
                max: 100
            })
            const actualDeliveryTime = faker.date.future()
            const deliveryAcceptedTime = faker.date.future()
            const deliveryFinishedTime = faker.date.future()

            return generateOrderModel(customerId, restaurantId, "READY", manyCount, promocodeName, promocodeDiscount, actualDeliveryTime, deliveryAcceptedTime, deliveryFinishedTime, courierId, promotionId)
        }

        const generateMinimumOrderModel = (): OrderModel => {
            const customerId = BigInt(faker.number.int())
            const restaurantId = BigInt(faker.number.int())
            return generateOrderModel(customerId, restaurantId, "READY", 0)
        }

        describe("Tests for Order Get Mapper", () => {
            
            const orderItemGetMapper = new OrderItemGetMapper()
            const orderGetMapper = new OrderGetMapper(orderItemGetMapper)

            const getExpectedDtoResult = (orderInstance: OrderModel): object => {
                const orderItems = orderInstance.items?.map((orderItemInstance) => {
                    return {
                        id: Number(orderItemInstance.id),
                        orderId: Number(orderItemInstance.orderId),
                        menuItemName: orderItemInstance.menuItemName,
                        menuItemImageUrl: orderItemInstance.menuItemImageUrl,
                        menuItemPrice: orderItemInstance.menuItemPrice,
                        quantity: orderItemInstance.quantity
                    }
                })

                return {
                    id: Number(orderInstance.id),
                    customerId: Number(orderInstance.customerId),
                    courierId: orderInstance.courierId ? Number(orderInstance.courierId) : undefined,
                    restaurantId: Number(orderInstance.restaurantId),
                    status: orderInstance.status,
                    promocodeName: orderInstance.promocodeName ? orderInstance.promocodeName : undefined,
                    promocodeDiscount: orderInstance.promocodeDiscount ? orderInstance.promocodeDiscount : undefined,
                    promotionId: orderInstance.promotionId ? Number(orderInstance.promotionId) : undefined,
                    createdAt: orderInstance.createdAt.toString(),
                    deliveryAcceptedAt: orderInstance.deliveryAcceptedAt?.toString(),
                    supposedDeliveryTime: orderInstance.supposedDeliveryTime.toString(),
                    actualDeliveryTime: orderInstance.actualDeliveryTime?.toString(),
                    deliveryFinishedAt: orderInstance.deliveryFinishedAt?.toString(),
                    totalPrice: orderInstance.totalPrice,
                    decountedPrice: orderInstance.decountedPrice,
                    items: orderItems
                }
            }

            test("should map order database model to get output dto model", () => {
                testDatabaseToDtoMapper(generateFullOrderModel, getExpectedDtoResult, orderGetMapper)
            })

            test("should map order database model with only required attributes to get output dto model", () => {
                testDatabaseToDtoMapper(generateMinimumOrderModel, getExpectedDtoResult, orderGetMapper)
            })
    
        })
        
        describe("Tests for Order Create Mapper", () => {
    
            const orderItemCreateMapper = new OrderItemCreateMapper()
            const orderCreateMapper = new OrderCreateMapper(orderItemCreateMapper)

            const generateFullOrderDto = (): OrderCreateInputDTO => {
                const restaurantId = faker.number.int()
                const promocode = faker.lorem.word(5)
                const promotionId = faker.number.int()
                const menuItemIds = Array.from({length: manyCount}, () => (faker.number.int()))
                return generateOrderCreateInputDto(restaurantId, menuItemIds, promocode, promotionId)
            }

            const generateMinimumOrderDto = (): OrderCreateInputDTO => {
                const orderDto = generateFullOrderDto()
                delete orderDto.promotionId
                return orderDto
            }

            const generateOrderAdditionalData = (): OrderAdditionalData => {
                const orderInstance = generateFullOrderModel()
                const orderItemsAdditionalData = orderInstance.items?.map((orderItemInstance) => {
                    return {
                        menuItemName: orderItemInstance.menuItemName,
                        menuItemImageUrl: orderItemInstance.menuItemImageUrl,
                        menuItemPrice: orderItemInstance.menuItemPrice
                    }
                }) as OrderItemAdditionalData[]

                return {
                    customerId: orderInstance.customerId,
                    promocodeName: orderInstance.promocodeName ? orderInstance.promocodeName : undefined,
                    promocodeDiscount: orderInstance.promocodeDiscount ? orderInstance.promocodeDiscount : undefined,
                    supposedDeliveryTime: orderInstance.supposedDeliveryTime,
                    totalPrice: orderInstance.totalPrice,
                    decountedPrice: orderInstance.decountedPrice,
                    itemsAdditionalData: orderItemsAdditionalData
                }
            }

            const getExpectedDbResult = (orderDto: OrderCreateInputDTO, additionalData: OrderAdditionalData): object => {
                const orderItems = additionalData.itemsAdditionalData.map((orderItemAdditionalData, index) => {
                    return {
                        menuItemName: orderItemAdditionalData.menuItemName,
                        menuItemImageUrl: orderItemAdditionalData.menuItemImageUrl,
                        menuItemPrice: orderItemAdditionalData.menuItemPrice,
                        quantity: orderDto.items[index].quantity
                    }
                })
                
                return {
                    customerId: BigInt(additionalData.customerId),
                    restaurantId: BigInt(orderDto.restaurantId),
                    promocodeName: additionalData.promocodeName,
                    promocodeDiscount: additionalData.promocodeDiscount,
                    promotionId: orderDto.promotionId ? BigInt(orderDto.promotionId) : undefined,
                    supposedDeliveryTime: additionalData.supposedDeliveryTime,
                    totalPrice: Number(additionalData.totalPrice.toFixed(2)),
                    decountedPrice: Number(additionalData.decountedPrice.toFixed(2)),
                    items: {
                        create: orderItems
                    }
                }
            }

            const getExpectedDtoResult = (orderInstance: OrderModel): object => {
                const orderItems = orderInstance.items?.map((orderItemInstance) => {
                    return {
                        id: Number(orderItemInstance.id),
                        orderId: Number(orderItemInstance.orderId),
                        menuItemName: orderItemInstance.menuItemName,
                        menuItemImageUrl: orderItemInstance.menuItemImageUrl,
                        menuItemPrice: orderItemInstance.menuItemPrice,
                        quantity: orderItemInstance.quantity
                    }
                })

                return {
                    id: Number(orderInstance.id),
                    customerId: Number(orderInstance.customerId),
                    courierId: orderInstance.courierId ? Number(orderInstance.courierId) : undefined,
                    restaurantId: Number(orderInstance.restaurantId),
                    status: orderInstance.status,
                    promocodeName: orderInstance.promocodeName ? orderInstance.promocodeName : undefined,
                    promocodeDiscount: orderInstance.promocodeDiscount ? orderInstance.promocodeDiscount : undefined,
                    promotionId: orderInstance.promotionId ? Number(orderInstance.promotionId) : undefined,
                    createdAt: orderInstance.createdAt.toString(),
                    deliveryAcceptedAt: orderInstance.deliveryAcceptedAt?.toString(),
                    supposedDeliveryTime: orderInstance.supposedDeliveryTime.toString(),
                    actualDeliveryTime: orderInstance.actualDeliveryTime?.toString(),
                    deliveryFinishedAt: orderInstance.deliveryFinishedAt?.toString(),
                    totalPrice: orderInstance.totalPrice,
                    decountedPrice: orderInstance.decountedPrice,
                    items: orderItems
                }
            }

            test("should map order create input dto model to create input database model", () => {
                const orderDtoModel = generateFullOrderDto()
                const additionalData = generateOrderAdditionalData()
                const expectedResult = getExpectedDbResult(orderDtoModel, additionalData)

                const result = orderCreateMapper.toDbModel(orderDtoModel, additionalData)
                
                expect(result).toEqual(expectedResult)
            })

            test("should map order create input dto model with only required attributes to create input database model", () => {
                const orderDtoModel = generateMinimumOrderDto()
                const additionalData = generateOrderAdditionalData()
                const expectedResult = getExpectedDbResult(orderDtoModel, additionalData)

                const result = orderCreateMapper.toDbModel(orderDtoModel, additionalData)
                
                expect(result).toEqual(expectedResult)
            })
    
    
            test("should map order database model to create output dto model", () => {
                testDatabaseToDtoMapper(generateFullOrderModel, getExpectedDtoResult, orderCreateMapper)
            })

            test("should map order database model with only required attributes to create output dto model", () => {
                testDatabaseToDtoMapper(generateMinimumOrderModel, getExpectedDtoResult, orderCreateMapper)
            })
    
        })

    })

})