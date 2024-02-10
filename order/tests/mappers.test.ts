import { MenuItemCreateInputDto, MenuItemUpdateInputDto } from '@src/modules/menu/dto/menuItem.dto';
import { CourierCreateInputDto, CourierGetOutputDto } from '../src/modules/users/dto/courier.dto';
import { CourierCreateMapper, CourierGetMapper } from "@src/modules/users/mappers/implementations/courier.mappers"
import { generateCourierCreateInputDto, generateCourierModel } from "./factories/users/courier"
import { CustomerCreateMapper, CustomerGetMapper } from '@src/modules/users/mappers/implementations/customer.mappers';
import { generateCustomerCreateInputDto, generateCustomerModel } from './factories/users/customer';
import { ModeratorGetMapper, ModeratorCreateMapper } from '@src/modules/users/mappers/implementations/moderator.mappers';
import { generateModeratorModel, generateModeratorCreateInputDto } from './factories/users/moderator';
import { RestaurantManagerGetMapper, RestaurantManagerCreateMapper } from '@src/modules/users/mappers/implementations/restaurantManager.mappers';
import { generateRestaurantManagerModel, generateRestaurantManagerCreateInputDto } from './factories/users/restaurantManager';
import { generateRestaurantCreateInputDto, generateRestaurantModel } from './factories/restaurants/restaurant';
import { MenuItemGetMapper, MenuItemCreateMapper, MenuItemUpdateMapper } from '@src/modules/menu/mappers/implementations/menuItem.mappers';
import { RestaurantGetMapper, RestaurantCreateMapper } from '@src/modules/restaurants/mappers/implementations/restaurant.mappers';
import { generateMenuItemModel, generateMenuItemCreateInputDto, generateMenuItemUpdateInputDto, generateMenuItemCreateInputModel, generateMenuItemUpdateInputModel } from './factories/menu/menuItem';
import { faker } from '@faker-js/faker';
import { PromotionGetMapper, PromotionCreateMapper } from '@src/modules/promotions/mappers/implementations/promotion.mappers';
import { generatePromotionModel, generatePromotionCreateInputDto } from './factories/promotions/promotion';
import { CourierModel } from '@src/modules/users/models/courier.models';
import { CustomerModel } from '@src/modules/users/models/customer.models';
import { CustomerCreateInputDto } from '@src/modules/users/dto/customer.dto';
import { ModeratorModel } from '@src/modules/users/models/moderator.models';
import { ModeratorCreateInputDto } from '@src/modules/users/dto/moderator.dto';
import { RestaurantManagerModel } from '@src/modules/users/models/restaurantManager.models';
import { RestaurantManagerCreateInputDto } from '@src/modules/users/dto/restaurantManager.dto';
import { RestaurantCreateInputDto } from '@src/modules/restaurants/dto/restaurant.dto';
import { RestaurantModel } from '@src/modules/restaurants/models/restaurant.models';
import { MenuItemModel } from '@src/modules/menu/models/menuItem.models';
import { PromotionCreateInputDto } from '@src/modules/promotions/dto/promotion.dto';
import { PromotionModel } from '@src/modules/promotions/models/promotion.models';
import { generatePromocodeCreateInputDto, generatePromocodeModel, generatePromocodeUpdateInputDto } from './factories/promotions/promocode';
import { PromocodeCreateInputDto, PromocodeUpdateInputDto } from '@src/modules/promotions/dto/promocode.dto';
import { PromocodeGetMapper, PromocodeCreateMapper, PromocodeUpdateMapper } from '@src/modules/promotions/mappers/implementations/promocode.mappers';
import { PromocodeModel } from '@src/modules/promotions/models/promocode.models';
import { OrderItemCreateInputDto } from '@src/modules/orders/dto/orderItem.dto';
import { OrderItemGetMapper, OrderItemCreateMapper } from '@src/modules/orders/mappers/implementations/orderItem.mappers';
import { OrderItemModel } from '@src/modules/orders/models/orderItem.models';
import { generateOrderItemModel, generateOrderItemCreateInputDto } from './factories/orders/orderItem';
import { OrderAdditionalData, OrderItemAdditionalData, OrderItemWithOrderAdditionalData } from '@src/modules/orders/mappers/additionalData';
import { OrderCreateInputDto } from '@src/modules/orders/dto/order.dto';
import { OrderGetMapper, OrderCreateMapper } from '@src/modules/orders/mappers/implementations/order.mappers';
import { OrderModel } from '@src/modules/orders/models/order.models';
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
                    id: courierInstance.id
                }
            }

            test("should map courier database model to get output dto model", () => {
                testDatabaseToDtoMapper(generateCourierModel, getExpectedDtoResult, courierGetMapper)
            })
    
        })
    
        describe("Tests for Courier Create Mapper", () => {
    
            const courierCreateMapper = new CourierCreateMapper()
            
            const getExpectedDbResult = (courierDto: CourierCreateInputDto): object => {
                return {
                    id: courierDto.id
                }
            }

            const getExpectedDtoResult = (courierInstance: CourierModel): object => {
                return {
                    id: courierInstance.id
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
                    id: customerInstance.id
                }
            }

            test("should map customer database model to get output dto model", () => {
                testDatabaseToDtoMapper(generateCustomerModel, getExpectedDtoResult, customerGetMapper)
            })
    
        })
    
        describe("Tests for Customer Create Mapper", () => {
    
            const customerCreateMapper = new CustomerCreateMapper()
            
            const getExpectedDbResult = (courierDto: CustomerCreateInputDto): object => {
                return {
                    id: courierDto.id
                }
            }

            const getExpectedDtoResult = (courierInstance: CustomerModel): object => {
                return {
                    id: courierInstance.id
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
                    id: moderatorInstance.id
                }
            }

            test("should map moderator database model to get output dto model", () => {
                testDatabaseToDtoMapper(generateModeratorModel, getExpectedDtoResult, moderatorGetMapper)
            })
    
        })
        
        describe("Tests for Moderator Create Mapper", () => {
    
            const moderatorCreateMapper = new ModeratorCreateMapper()
            
            const getExpectedDbResult = (moderatorDto: ModeratorCreateInputDto): object => {
                return {
                    id: moderatorDto.id
                }
            }

            const getExpectedDtoResult = (moderatorInstance: ModeratorModel): object => {
                return {
                    id: moderatorInstance.id
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
            const restaurantId = faker.number.bigInt()
            return generateRestaurantManagerModel(restaurantId)
        }

        describe("Tests for Restaurant Manager Get Mapper", () => {

            const restaurantManagerGetMapper = new RestaurantManagerGetMapper()
    
            const getExpectedDtoResult = (restaurantManagerInstance: RestaurantManagerModel): object => {
                return {
                    id: restaurantManagerInstance.id,
                    restaurantId: restaurantManagerInstance.restaurantId ? restaurantManagerInstance.restaurantId : undefined
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
            
            const getExpectedDbResult = (restaurantManagerDto: RestaurantManagerCreateInputDto): object => {
                return {
                    id: restaurantManagerDto.id
                }
            }

            const getExpectedDtoResult = (restaurantManagerInstance: RestaurantManagerModel): object => {
                return {
                    id: restaurantManagerInstance.id
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
                    id: restaurantInstance.id
                }
            }

            test("should map restaurant database model to get output dto model", () => {
                testDatabaseToDtoMapper(generateRestaurantModel, getExpectedDtoResult, restaurantGetMapper)
            })
    
        })
        
        describe("Tests for Restaurant Create Mapper", () => {
    
            const restaurantCreateMapper = new RestaurantCreateMapper()
    
            const getExpectedDbResult = (restaurantDto: RestaurantCreateInputDto): object => {
                return {
                    id: restaurantDto.id
                }
            }

            const getExpectedDtoResult = (restaurantInstance: RestaurantModel): object => {
                return {
                    id: restaurantInstance.id
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
            const restaurantId = faker.number.bigInt()
            return generateMenuItemModel(restaurantId)
        }

        describe("Tests for Menu Item Get Mapper", () => {

            const menuItemGetMapper = new MenuItemGetMapper()

            const getExpectedDtoResult = (menuItemInstance: MenuItemModel): object => {
                return {
                    id: menuItemInstance.id,
                    name: menuItemInstance.name,
                    imageUrl: menuItemInstance.imageUrl,
                    price: menuItemInstance.price,
                    restaurantId: menuItemInstance.restaurantId
                }
            }

            test("should map menu item database model to get output dto model", () => {
                testDatabaseToDtoMapper(generateFullMenuItemModel, getExpectedDtoResult, menuItemGetMapper)
            })
    
        })
        
        describe("Tests for Menu Item Create Mapper", () => {
    
            const menuItemCreateMapper = new MenuItemCreateMapper()

            const generateFullMenuItemDto = (): MenuItemCreateInputDto => {
                const restaurantId = faker.number.bigInt()
                return generateMenuItemCreateInputDto(restaurantId)
            }

            const getExpectedDbResult = (menuItemDto: MenuItemCreateInputDto): object => {
                return {
                    id: menuItemDto.id,
                    name: menuItemDto.name,
                    imageUrl: menuItemDto.imageUrl,
                    price: menuItemDto.price,
                    restaurantId: menuItemDto.restaurantId
                }
            }

            const getExpectedDtoResult = (menuItemInstance: MenuItemModel): object => {
                return {
                    id: menuItemInstance.id,
                    name: menuItemInstance.name,
                    imageUrl: menuItemInstance.imageUrl,
                    price: menuItemInstance.price,
                    restaurantId: menuItemInstance.restaurantId
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

            const getExpectedDbResult = (menuItemDto: MenuItemUpdateInputDto): object => {
                return {
                    name: menuItemDto.name,
                    imageUrl: menuItemDto.imageUrl,
                    price: menuItemDto.price
                }
            }

            const getExpectedDtoResult = (menuItemInstance: MenuItemModel): object => {
                return {
                    id: menuItemInstance.id,
                    name: menuItemInstance.name,
                    imageUrl: menuItemInstance.imageUrl,
                    price: menuItemInstance.price,
                    restaurantId: menuItemInstance.restaurantId
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
                    id: promotionInstance.id
                }
            }

            test("should map promotion database model to get output dto model", () => {
                testDatabaseToDtoMapper(generatePromotionModel, getExpectedDtoResult, promotionGetMapper)
            })
    
        })
        
        describe("Tests for Promotion Create Mapper", () => {
    
            const promotionCreateMapper = new PromotionCreateMapper()
            
            const getExpectedDbResult = (promotionDto: PromotionCreateInputDto): object => {
                return {
                    id: promotionDto.id
                }
            }

            const getExpectedDtoResult = (promotionInstance: PromotionModel): object => {
                return {
                    id: promotionInstance.id
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
            const restaurantId = faker.number.bigInt()
            return generatePromocodeModel(restaurantId)
        }

        describe("Tests for Promocode Get Mapper", () => {

            const promocodeGetMapper = new PromocodeGetMapper()

            const getExpectedDtoResult = (promocodeInstance: PromocodeModel): object => {
                return {
                    id: promocodeInstance.id,
                    nameIdentifier: promocodeInstance.nameIdentifier,
                    discountPercentage: promocodeInstance.discountPercentage,
                    validFrom: promocodeInstance.validFrom.toISOString(),
                    validUntil: promocodeInstance.validUntil.toISOString(),
                    maxUsageCount: promocodeInstance.maxUsageCount,
                    currentUsageCount: promocodeInstance.currentUsageCount,
                    restaurantId: promocodeInstance.restaurantId,
                    isActive: promocodeInstance.isActive
                }
            }

            test("should map promocode database model to get output dto model", () => {
                testDatabaseToDtoMapper(generateFullPromocodeModel, getExpectedDtoResult, promocodeGetMapper)
            })
    
        })
        
        describe("Tests for Promocode Create Mapper", () => {
    
            const promocodeCreateMapper = new PromocodeCreateMapper()

            const generateFullPromocodeDto = (): PromocodeCreateInputDto => {
                const restaurantId = faker.number.bigInt()
                return generatePromocodeCreateInputDto(restaurantId)
            }

            const getExpectedDbResult = (promocodeDto: PromocodeCreateInputDto): object => {
                return {
                    nameIdentifier: promocodeDto.nameIdentifier,
                    discountPercentage: promocodeDto.discountPercentage,
                    validFrom: new Date(promocodeDto.validFrom),
                    validUntil: new Date(promocodeDto.validUntil),
                    maxUsageCount: promocodeDto.maxUsageCount,
                    restaurantId: promocodeDto.restaurantId
                }
            }

            const getExpectedDtoResult = (promocodeInstance: PromocodeModel): object => {
                return {
                    id: promocodeInstance.id,
                    nameIdentifier: promocodeInstance.nameIdentifier,
                    discountPercentage: promocodeInstance.discountPercentage,
                    validFrom: promocodeInstance.validFrom.toISOString(),
                    validUntil: promocodeInstance.validUntil.toISOString(),
                    maxUsageCount: promocodeInstance.maxUsageCount,
                    currentUsageCount: promocodeInstance.currentUsageCount,
                    restaurantId: promocodeInstance.restaurantId,
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

            const getExpectedDbResult = (promocodeDto: PromocodeUpdateInputDto): object => {
                return {
                    discountPercentage: promocodeDto.discountPercentage,
                    validFrom: new Date(promocodeDto.validFrom),
                    validUntil: new Date(promocodeDto.validUntil),
                    maxUsageCount: promocodeDto.maxUsageCount,
                }
            }

            const getExpectedDtoResult = (promocodeInstance: PromocodeModel): object => {
                return {
                    id: promocodeInstance.id,
                    nameIdentifier: promocodeInstance.nameIdentifier,
                    discountPercentage: promocodeInstance.discountPercentage,
                    validFrom: promocodeInstance.validFrom.toISOString(),
                    validUntil: promocodeInstance.validUntil.toISOString(),
                    maxUsageCount: promocodeInstance.maxUsageCount,
                    currentUsageCount: promocodeInstance.currentUsageCount,
                    restaurantId: promocodeInstance.restaurantId,
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
            const orderId = faker.number.bigInt()
            return generateOrderItemModel(orderId)
        }

        describe("Tests for Order Item Get Mapper", () => {

            const orderItemGetMapper = new OrderItemGetMapper()

            const getExpectedDtoResult = (orderItemInstance: OrderItemModel): object => {
                return {
                    id: orderItemInstance.id,
                    orderId: orderItemInstance.orderId,
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

            const generateFullOrderItemDto = (): OrderItemCreateInputDto => {
                const menuItemId = faker.number.bigInt()
                return generateOrderItemCreateInputDto(menuItemId)
            }

            const generateOrderItemAdditionalData = (): OrderItemAdditionalData => {
                const orderItemInstance = generateFullOrderItemModel()
                return {
                    menuItemName: orderItemInstance.menuItemName,
                    menuItemImageUrl: orderItemInstance.menuItemImageUrl,
                    menuItemPrice: orderItemInstance.menuItemPrice,
                    orderId: orderItemInstance.orderId
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

            const getExpectedDbResult = (orderItemDto: OrderItemCreateInputDto, additionalData: OrderItemAdditionalData): object => {
                return {
                    menuItemName: additionalData.menuItemName,
                    menuItemImageUrl: additionalData.menuItemImageUrl,
                    menuItemPrice: additionalData.menuItemPrice,
                    orderId: additionalData.orderId,
                    quantity: orderItemDto.quantity
                }
            }

            const getExpectedDbResultWithOrder = (orderItemDto: OrderItemCreateInputDto, additionalData: OrderItemWithOrderAdditionalData): object => {
                return {
                    menuItemName: additionalData.menuItemName,
                    menuItemImageUrl: additionalData.menuItemImageUrl,
                    menuItemPrice: additionalData.menuItemPrice,
                    quantity: orderItemDto.quantity
                }
            }

            const getExpectedDtoResult = (orderItemInstance: OrderItemModel): object => {
                return {
                    id: orderItemInstance.id,
                    orderId: orderItemInstance.orderId,
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
            const customerId = faker.number.bigInt()
            const restaurantId = faker.number.bigInt()
            const courierId = faker.number.bigInt()
            const promotionId = faker.number.bigInt()
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
            const customerId = faker.number.bigInt()
            const restaurantId = faker.number.bigInt()
            return generateOrderModel(customerId, restaurantId, "READY", 0)
        }

        describe("Tests for Order Get Mapper", () => {
            
            const orderItemGetMapper = new OrderItemGetMapper()
            const orderGetMapper = new OrderGetMapper(orderItemGetMapper)

            const getExpectedDtoResult = (orderInstance: OrderModel): object => {
                const orderItems = orderInstance.items?.map((orderItemInstance) => {
                    return {
                        id: orderItemInstance.id,
                        orderId: orderItemInstance.orderId,
                        menuItemName: orderItemInstance.menuItemName,
                        menuItemImageUrl: orderItemInstance.menuItemImageUrl,
                        menuItemPrice: orderItemInstance.menuItemPrice,
                        quantity: orderItemInstance.quantity
                    }
                })

                return {
                    id: orderInstance.id,
                    customerId: orderInstance.customerId,
                    courierId: orderInstance.courierId ? orderInstance.courierId : undefined,
                    restaurantId: orderInstance.restaurantId,
                    status: orderInstance.status,
                    promocodeName: orderInstance.promocodeName ? orderInstance.promocodeName : undefined,
                    promocodeDiscount: orderInstance.promocodeDiscount ? orderInstance.promocodeDiscount : undefined,
                    promotionId: orderInstance.promotionId ? orderInstance.promotionId : undefined,
                    createdAt: orderInstance.createdAt.toISOString(),
                    deliveryAcceptedAt: orderInstance.deliveryAcceptedAt?.toISOString(),
                    supposedDeliveryTime: orderInstance.supposedDeliveryTime.toISOString(),
                    actualDeliveryTime: orderInstance.actualDeliveryTime?.toISOString(),
                    deliveryFinishedAt: orderInstance.deliveryFinishedAt?.toISOString(),
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

            const generateFullOrderDto = (): OrderCreateInputDto => {
                const restaurantId = faker.number.bigInt()
                const promocode = faker.lorem.word(5)
                const promotionId = faker.number.bigInt()
                const menuItemIds = Array.from({length: manyCount}, () => (faker.number.bigInt()))
                return generateOrderCreateInputDto(restaurantId, menuItemIds, promocode, promotionId)
            }

            const generateMinimumOrderDto = (): OrderCreateInputDto => {
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
                    items: orderItemsAdditionalData
                }
            }

            const getExpectedDbResult = (orderDto: OrderCreateInputDto, additionalData: OrderAdditionalData): object => {
                const orderItems = additionalData.items.map((orderItemAdditionalData, index) => {
                    return {
                        menuItemName: orderItemAdditionalData.menuItemName,
                        menuItemImageUrl: orderItemAdditionalData.menuItemImageUrl,
                        menuItemPrice: orderItemAdditionalData.menuItemPrice,
                        quantity: orderDto.items[index].quantity
                    }
                })
                
                return {
                    customerId: additionalData.customerId,
                    restaurantId: orderDto.restaurantId,
                    promocodeName: additionalData.promocodeName,
                    promocodeDiscount: additionalData.promocodeDiscount,
                    promotionId: orderDto.promotionId ? orderDto.promotionId : undefined,
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
                        id: orderItemInstance.id,
                        orderId: orderItemInstance.orderId,
                        menuItemName: orderItemInstance.menuItemName,
                        menuItemImageUrl: orderItemInstance.menuItemImageUrl,
                        menuItemPrice: orderItemInstance.menuItemPrice,
                        quantity: orderItemInstance.quantity
                    }
                })

                return {
                    id: (orderInstance.id),
                    customerId: orderInstance.customerId,
                    courierId: orderInstance.courierId ? orderInstance.courierId : undefined,
                    restaurantId: orderInstance.restaurantId,
                    status: orderInstance.status,
                    promocodeName: orderInstance.promocodeName ? orderInstance.promocodeName : undefined,
                    promocodeDiscount: orderInstance.promocodeDiscount ? orderInstance.promocodeDiscount : undefined,
                    promotionId: orderInstance.promotionId ? orderInstance.promotionId : undefined,
                    createdAt: orderInstance.createdAt.toISOString(),
                    deliveryAcceptedAt: orderInstance.deliveryAcceptedAt?.toISOString(),
                    supposedDeliveryTime: orderInstance.supposedDeliveryTime.toISOString(),
                    actualDeliveryTime: orderInstance.actualDeliveryTime?.toISOString(),
                    deliveryFinishedAt: orderInstance.deliveryFinishedAt?.toISOString(),
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