import { PrismaClient } from '@prisma/client';
import { fa, faker } from "@faker-js/faker"
import { PromocodeCreateInputDTO, PromocodeUpdateInputDTO } from "@src/modules/promotions/dto/promocode"
import { PromocodeModel, PromocodeCreateInput, PromocodeUpdateInput } from "@src/modules/promotions/models/promocode"
import { getUniqueId, getUniqueWord } from '@tests/utils/unique';
import moment from 'moment';

// Models

export function generatePromocodeModel(restaurantId: bigint, activeByDate: boolean = false): PromocodeModel {

    const maxUsageCount = faker.number.int({
        max: 10000
    })
    const currentUsageCount = faker.number.int({
        max: maxUsageCount - 1
    })

    let validFrom
    let validUntil

    if (activeByDate) {
        validFrom = faker.date.past()
        validUntil = faker.date.future()
    } else {
        validFrom = faker.date.soon()
        const monthDuration = faker.number.int({
            min: 1,
            max: 10
        })
        validUntil = moment(validFrom).add(monthDuration, "month").toDate()
    }

    return {
        id: getUniqueId(),
        nameIdentifier: getUniqueWord(5),
        discountPercentage: faker.number.int({
            min: 10,
            max: 100
        }),
        restaurantId,
        validFrom,
        validUntil,
        maxUsageCount,
        currentUsageCount,
        isActive: true
    }
}

export function generatePromocodeCreateInputModel(restaurantId: bigint, activeByDate: boolean = false): PromocodeCreateInput {

    let validFrom
    let validUntil

    if (activeByDate) {
        validFrom = faker.date.past()
        validUntil = faker.date.future()
    } else {
        validFrom = faker.date.soon()
        const monthDuration = faker.number.int({
            min: 1,
            max: 10
        })
        validUntil = moment(validFrom).add(monthDuration, "month").toDate()
    }

    return {
        nameIdentifier: getUniqueWord(5),
        discountPercentage: faker.number.int({
            min: 10,
            max: 100
        }),
        restaurantId,
        validFrom,
        validUntil,
        maxUsageCount: faker.number.int({
            max: 10000
        })
    }
}

export function generatePromocodeUpdateInputModel(restaurantId?: bigint, activeByDate: boolean = false): PromocodeUpdateInput {
    let validFrom
    let validUntil

    if (activeByDate) {
        validFrom = faker.date.past()
        validUntil = faker.date.future()
    } else {
        validFrom = faker.date.soon()
        const monthDuration = faker.number.int({
            min: 1,
            max: 10
        })
        validUntil = moment(validFrom).add(monthDuration, "month").toDate()
    }

    return {
        nameIdentifier: getUniqueWord(5),
        discountPercentage: faker.number.int({
            min: 10,
            max: 100
        }),
        validFrom,
        validUntil,
        maxUsageCount: faker.number.int({
            max: 10000
        }),
        restaurantId
    }
}

// Database Generation

export async function createPromocode(client: PrismaClient, restaurantId: bigint, activeByDate: boolean = false): Promise<PromocodeModel> {
    const promocodeData = generatePromocodeCreateInputModel(restaurantId, activeByDate)
    return await client.promocode.create({
        data: promocodeData
    })
}

// DTOs

export function generatePromocodeCreateInputDto(restaurantId: bigint, activeByDate: boolean = false): PromocodeCreateInputDTO {
    let validFrom
    let validUntil

    if (activeByDate) {
        validFrom = faker.date.past()
        validUntil = faker.date.future()
    } else {
        validFrom = faker.date.soon()
        const monthDuration = faker.number.int({
            min: 1,
            max: 10
        })
        validUntil = moment(validFrom).add(monthDuration, "month").toDate()
    }

    return {
        nameIdentifier: getUniqueWord(5),
        discountPercentage: faker.number.int({
            min: 10,
            max: 100
        }),
        restaurantId,
        validFrom,
        validUntil,
        maxUsageCount: faker.number.int({
            max: 10000
        }),
    }
}

export function generatePromocodeUpdateInputDto(activeByDate: boolean = false): PromocodeUpdateInputDTO {
    let validFrom
    let validUntil

    if (activeByDate) {
        validFrom = faker.date.past()
        validUntil = faker.date.future()
    } else {
        validFrom = faker.date.soon()
        const monthDuration = faker.number.int({
            min: 1,
            max: 10
        })
        validUntil = moment(validFrom).add(monthDuration, "month").toDate()
    }
    
    return {
        discountPercentage: faker.number.int({
            min: 10,
            max: 100
        }),
        validFrom,
        validUntil,
        maxUsageCount: faker.number.int({
            max: 10000
        })
    }
}