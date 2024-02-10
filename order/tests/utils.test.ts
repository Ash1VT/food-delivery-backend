import { Settings } from "@src/config/Settings"
import getSettings from "@src/utils/getSettings"
import settingsCache, { SettingsWrapperFunction, clearCache, getCache } from "@src/utils/settingsCache"

describe("Tests for Utils", () => {


    describe("Tests for getSettings", () => {

        test("should return settings", () => {
            const settings = getSettings()

            expect(settings.variables.appHost).toBeDefined()
            expect(settings.variables.appPort).toBeDefined()
            expect(settings.variables.databaseURL).toBeDefined()
            expect(settings.variables.pgDatabase).toBeDefined()
            expect(settings.variables.pgHost).toBeDefined()
            expect(settings.variables.pgPort).toBeDefined()
            expect(settings.variables.pgUser).toBeDefined()
            expect(settings.variables.pgPassword).toBeDefined()
        })

    })

    describe("Tests for settingsCache", () => {

        beforeEach(() => {
            clearCache()
        })

        const mockSettings: Settings = {
            variables: {
                appHost: 'localhost',
                appPort: 3000,
                databaseURL: 'mongodb://localhost:27017/mydatabase',
                pgDatabase: 'mydatabase',
                pgHost: 'localhost',
                pgPort: '5432',
                pgUser: 'myuser',
                pgPassword: 'mypassword',
                rolesGrpcServerHost: 'localhost',
                rolesGrpcServerPort: 50000
            }
        }

        const mockSettingsFunction: SettingsWrapperFunction = jest.fn().mockReturnValue(mockSettings)
        const cachedFunction = settingsCache(mockSettingsFunction)

        test("cached function should be called once", () => {

            const result1 = cachedFunction()
            expect(result1).toEqual(mockSettings)
            expect(mockSettingsFunction).toHaveBeenCalledTimes(1)

            const result2 = cachedFunction()
            expect(result2).toEqual(mockSettings)
            expect(mockSettingsFunction).toHaveBeenCalledTimes(1)
        })

        test("before first call cache should be empty, after call should not be empty", () => {
            let cache = getCache()
            expect(cache).toBeUndefined()
            
            cachedFunction()    

            cache = getCache()
            expect(cache).toEqual(mockSettings)
        })
    })

    // describe("Tests for mapManyModels", () => {
    //     const manyCount = 5


    //     test("should map many couriers", () => {
    //         const courierGetMapper = new CourierGetMapper()

    //         const courierInstances = Array.from({length: manyCount}, () => generateCourierModel())
    //         const expectedResult = courierInstances.map((courierInstance) => courierGetMapper.toDto(courierInstance))

    //         const courierDtos = mapManyModels(courierInstances, courierGetMapper.toDto)
    //         expect(courierDtos).toEqual(expect.arrayContaining(expectedResult))
    //     })


    //     test("should map many order items with additional data", () => {
    //         const generateOrderItemAdditionalData = (): OrderItemAdditionalData => {
    //             const orderId = BigInt(faker.number.int())
    //             const orderItemInstance = generateOrderItemModel(orderId)
                
    //             return {
    //                 menuItemName: orderItemInstance.menuItemName,
    //                 menuItemImageUrl: orderItemInstance.menuItemImageUrl,
    //                 menuItemPrice: orderItemInstance.menuItemPrice,
    //                 orderId: Number(orderItemInstance.orderId)
    //             }
    //         }

    //         const orderItemCreateMapper = new OrderItemCreateMapper()
    //         const menuItemId = faker.number.int()

    //         const orderItemDtos = Array.from({length: manyCount}, () => generateOrderItemCreateInputDto(menuItemId))
    //         const orderItemsAdditionalData = Array.from({length: manyCount}, () => generateOrderItemAdditionalData())

    //         const expectedResult = orderItemDtos.map((orderItemDto, index) => orderItemCreateMapper.toDbModel(orderItemDto, orderItemsAdditionalData[index]))

    //         const courierDtos = mapManyModelsWithAdditionalData(orderItemDtos, orderItemCreateMapper.toDbModel, orderItemsAdditionalData)
            
    //         expect(courierDtos).toEqual(expect.arrayContaining(expectedResult))
    //     })
    // })

})