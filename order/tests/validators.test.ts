import { OrderStatus } from './../src/modules/orders/models/orderStatus.models';
import { promocodeCreateValidator, promocodeUpdateValidator } from "@src/modules/promotions/validators/promocode.validators"
import { generatePromocodeCreateInputDto, generatePromocodeUpdateInputDto } from "./factories/promotions/promocode"
import { getUniqueId, getUniqueWord } from "./utils/unique"
import { ZodError, z } from 'zod';
import { faker } from '@faker-js/faker';
import moment from 'moment';
import { generateOrderItemCreateInputDto } from './factories/orders/orderItem';
import { orderItemCreateValidator } from '@src/modules/orders/validators/orderItem.validators';
import { generateOrderCreateInputDto } from './factories/orders/order';
import { orderCreateValidator, orderStatusValidator } from '@src/modules/orders/validators/order.validators';

describe("Tests for Validators", () => {

    const manyCount = 5

    describe("Tests for Promocode Validators", () => {
        
        const minPromocodeNameLength = 5
        const maxPromocodeNameLength = 20

        const minPromocodeDiscountAmount = 5
        const maxPromocodeDiscountAmount = 100

        const minPromocodeMaxUsageCount = 1

        test("should successfully validate promocode create input dto", () => {
            const restaurantId = getUniqueId()
            const promocodeCreateInputDto = generatePromocodeCreateInputDto(restaurantId)
            
            const promocodeJsonCreateInput = {
                ...promocodeCreateInputDto,
                validFrom: promocodeCreateInputDto.validFrom.toISOString(),
                validUntil: promocodeCreateInputDto.validUntil.toISOString()
            }

            const result = promocodeCreateValidator.parse(promocodeJsonCreateInput)
            
            expect(result).toEqual(promocodeCreateInputDto)
        })

        test("should not validate promocode create input dto, due to too short name", () => {
            const restaurantId = getUniqueId()
            const promocodeCreateInputDto = generatePromocodeCreateInputDto(restaurantId)
            
            promocodeCreateInputDto.nameIdentifier = getUniqueWord(minPromocodeNameLength - 1)

            const promocodeJsonCreateInput = {
                ...promocodeCreateInputDto,
                validFrom: promocodeCreateInputDto.validFrom.toISOString(),
                validUntil: promocodeCreateInputDto.validUntil.toISOString()
            }

            const validationCall = () => {
                promocodeCreateValidator.parse(promocodeJsonCreateInput)
            }

            expect(validationCall).toThrow(ZodError)
        })

        test("should not validate promocode create input dto, due to too long name", () => {
            const restaurantId = getUniqueId()
            const promocodeCreateInputDto = generatePromocodeCreateInputDto(restaurantId)
            
            promocodeCreateInputDto.nameIdentifier = getUniqueWord(maxPromocodeNameLength + 1)

            const promocodeJsonCreateInput = {
                ...promocodeCreateInputDto,
                validFrom: promocodeCreateInputDto.validFrom.toISOString(),
                validUntil: promocodeCreateInputDto.validUntil.toISOString()
            }

            const validationCall = () => {
                promocodeCreateValidator.parse(promocodeJsonCreateInput)
            }

            expect(validationCall).toThrow(ZodError)
        })

        test("should not validate promocode create input dto, due to too small discount percentage", () => {
            const restaurantId = getUniqueId()
            const promocodeCreateInputDto = generatePromocodeCreateInputDto(restaurantId)
            
            promocodeCreateInputDto.discountPercentage = faker.number.int({
                max: minPromocodeDiscountAmount - 1
            })

            const promocodeJsonCreateInput = {
                ...promocodeCreateInputDto,
                validFrom: promocodeCreateInputDto.validFrom.toISOString(),
                validUntil: promocodeCreateInputDto.validUntil.toISOString()
            }

            const validationCall = () => {
                promocodeCreateValidator.parse(promocodeJsonCreateInput)
            }

            expect(validationCall).toThrow(ZodError)
        })

        test("should not validate promocode create input dto, due to too big discount percentage", () => {
            const restaurantId = getUniqueId()
            const promocodeCreateInputDto = generatePromocodeCreateInputDto(restaurantId)
            
            promocodeCreateInputDto.discountPercentage = faker.number.int({
                min: maxPromocodeDiscountAmount + 1
            })

            const promocodeJsonCreateInput = {
                ...promocodeCreateInputDto,
                validFrom: promocodeCreateInputDto.validFrom.toISOString(),
                validUntil: promocodeCreateInputDto.validUntil.toISOString()
            }

            const validationCall = () => {
                promocodeCreateValidator.parse(promocodeJsonCreateInput)
            }

            expect(validationCall).toThrow(ZodError)
        })

        test("should not validate promocode create input dto, due to too small max usages count", () => {
            const restaurantId = getUniqueId()
            const promocodeCreateInputDto = generatePromocodeCreateInputDto(restaurantId)
            
            promocodeCreateInputDto.maxUsageCount = faker.number.int({
                max: minPromocodeMaxUsageCount - 1
            })

            const promocodeJsonCreateInput = {
                ...promocodeCreateInputDto,
                validFrom: promocodeCreateInputDto.validFrom.toISOString(),
                validUntil: promocodeCreateInputDto.validUntil.toISOString()
            }

            const validationCall = () => {
                promocodeCreateValidator.parse(promocodeJsonCreateInput)
            }

            expect(validationCall).toThrow(ZodError)
        })

        test("should not validate promocode create input dto, due to the fact that valid from date is later than valid until date", () => {
            const restaurantId = getUniqueId()
            const promocodeCreateInputDto = generatePromocodeCreateInputDto(restaurantId)
            
            const validFrom = faker.date.future()
            const monthDuration = 1
            const validUntil = moment(validFrom).subtract(monthDuration, "month").toDate()
            
            promocodeCreateInputDto.validFrom = validFrom
            promocodeCreateInputDto.validUntil = validUntil

            const promocodeJsonCreateInput = {
                ...promocodeCreateInputDto,
                validFrom: promocodeCreateInputDto.validFrom.toISOString(),
                validUntil: promocodeCreateInputDto.validUntil.toISOString()
            }

            const validationCall = () => {
                promocodeCreateValidator.parse(promocodeJsonCreateInput)
            }

            expect(validationCall).toThrow(ZodError)
        })

        test("should not validate promocode create input dto, due to the fact that valid from date is earlier than current date", () => {
            const restaurantId = getUniqueId()
            const promocodeCreateInputDto = generatePromocodeCreateInputDto(restaurantId)
            
            const validFrom = faker.date.recent()
            
            promocodeCreateInputDto.validFrom = validFrom

            const promocodeJsonCreateInput = {
                ...promocodeCreateInputDto,
                validFrom: promocodeCreateInputDto.validFrom.toISOString(),
                validUntil: promocodeCreateInputDto.validUntil.toISOString()
            }

            const validationCall = () => {
                promocodeCreateValidator.parse(promocodeJsonCreateInput)
            }

            expect(validationCall).toThrow(ZodError)
        })

        test("should successfully validate promocode update input dto", () => {
            const promocodeUpdateInputDto = generatePromocodeUpdateInputDto()

            const promocodeJsonUpdateInput = {
                ...promocodeUpdateInputDto,
                validFrom: promocodeUpdateInputDto.validFrom.toISOString(),
                validUntil: promocodeUpdateInputDto.validUntil.toISOString()
            }

            const result = promocodeUpdateValidator.parse(promocodeJsonUpdateInput)
            
            expect(result).toEqual(promocodeUpdateInputDto)
        })

        test("should not validate promocode update input dto, due to the fact that valid from date is later than valid until date", () => {
            const promocodeUpdateInputDto = generatePromocodeUpdateInputDto()
            
            const validFrom = faker.date.future()
            const monthDuration = 1
            const validUntil = moment(validFrom).subtract(monthDuration, "month").toDate()
            
            promocodeUpdateInputDto.validFrom = validFrom
            promocodeUpdateInputDto.validUntil = validUntil

            const promocodeJsonUpdateInput = {
                ...promocodeUpdateInputDto,
                validFrom: promocodeUpdateInputDto.validFrom.toISOString(),
                validUntil: promocodeUpdateInputDto.validUntil.toISOString()
            }

            const validationCall = () => {
                promocodeUpdateValidator.parse(promocodeJsonUpdateInput)
            }
            
            expect(validationCall).toThrow(ZodError)
        })

        test("should not validate promocode update input dto, due to the fact that valid from date is earlier than current date", () => {
            const promocodeUpdateInputDto = generatePromocodeUpdateInputDto()
            
            const validFrom = faker.date.recent()
            
            promocodeUpdateInputDto.validFrom = validFrom

            const promocodeJsonUpdateInput = {
                ...promocodeUpdateInputDto,
                validFrom: promocodeUpdateInputDto.validFrom.toISOString(),
                validUntil: promocodeUpdateInputDto.validUntil.toISOString()
            }

            const validationCall = () => {
                promocodeUpdateValidator.parse(promocodeJsonUpdateInput)
            }

            expect(validationCall).toThrow(ZodError)
        })
    })

    describe("Tests for Order Item Validators", () => {

        const minOrderItemQuantityAmount = 1
        const maxOrderItemQuantityAmount = 100

        test("should successfully validate order item create input dto", () => {
            const menuItemId = getUniqueId()
            const orderItemCreateInputDto = generateOrderItemCreateInputDto(menuItemId)
            
            const orderItemJsonCreateInput = {
                ...orderItemCreateInputDto,
            }

            const result = orderItemCreateValidator.parse(orderItemJsonCreateInput)
            
            expect(result).toEqual(orderItemCreateInputDto)
        })

        test("should not validate order item create input dto, due to too big quantity", () => {
            const menuItemId = getUniqueId()
            const orderItemCreateInputDto = generateOrderItemCreateInputDto(menuItemId)
            
            orderItemCreateInputDto.quantity = faker.number.int({
                min: maxOrderItemQuantityAmount + 1
            })

            const orderItemJsonCreateInput = {
                ...orderItemCreateInputDto,
            }

            const validationCall = () => {
                orderItemCreateValidator.parse(orderItemJsonCreateInput)
            }

            expect(validationCall).toThrow(ZodError)
        })

        test("should not validate order item create input dto, due to too small quantity", () => {
            const menuItemId = getUniqueId()
            const orderItemCreateInputDto = generateOrderItemCreateInputDto(menuItemId)
            
            orderItemCreateInputDto.quantity = faker.number.int({
                max: minOrderItemQuantityAmount - 1
            })

            const orderItemJsonCreateInput = {
                ...orderItemCreateInputDto,
            }

            const validationCall = () => {
                orderItemCreateValidator.parse(orderItemJsonCreateInput)
            }

            expect(validationCall).toThrow(ZodError)
        })
    })

    describe("Tests for Order Validators", () => {

        test("should successfully validate order status", () => {
            const orderStatus = "ready"
            const validatedOrderStatus = orderStatusValidator.parse(orderStatus)

            expect(validatedOrderStatus).toBe("READY")
        })

        test("should not successfully validate order status due to non existent order status", () => {
            const orderStatus = "ready12"

            const validationCall = () => {
                orderStatusValidator.parse(orderStatus)
            }

            expect(validationCall).toThrow(ZodError)
        })


        test("should successfully validate order create input dto", () => {
            const restaurantId = getUniqueId()
            const menuItemIds = Array.from({length: manyCount}, () => getUniqueId())

            const orderCreateInputDto = generateOrderCreateInputDto(restaurantId, menuItemIds)
            
            const orderJsonCreateInput = {
                ...orderCreateInputDto,
            }

            const result = orderCreateValidator.parse(orderJsonCreateInput)
            
            expect(result).toEqual(orderCreateInputDto)
        })

        test("should not validate order create input dto, due to empty order items", () => {
            const restaurantId = getUniqueId()
            const menuItemIds: bigint[] = []

            const orderCreateInputDto = generateOrderCreateInputDto(restaurantId, menuItemIds)
            
            const orderJsonCreateInput = {
                ...orderCreateInputDto,
            }

            const validationCall = () => {
                orderCreateValidator.parse(orderJsonCreateInput)
            }

            expect(validationCall).toThrow(ZodError)
        })

        test("should not validate order create input dto, due to repeated order items", () => {
            const restaurantId = getUniqueId()
            const menuItemIds = Array.from({length: manyCount}, () => getUniqueId())

            menuItemIds.push(menuItemIds[0])
            
            const orderCreateInputDto = generateOrderCreateInputDto(restaurantId, menuItemIds)
            
            const orderJsonCreateInput = {
                ...orderCreateInputDto,
            }

            const validationCall = () => {
                orderCreateValidator.parse(orderJsonCreateInput)
            }

            expect(validationCall).toThrow(ZodError)
        })
    })
})