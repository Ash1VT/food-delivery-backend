import { PrismaClient } from '@prisma/client';
import { faker } from "@faker-js/faker"
import { PromocodeCreateInputDTO, PromocodeUpdateInputDTO } from "@src/modules/promotions/dto/promocode"
import { PromocodeModel, PromocodeCreateInput, PromocodeUpdateInput } from "@src/modules/promotions/models/promocode"
import { getUniqueBigIntId } from '@tests/utils/unique';

// Models

export function generatePromocodeModel(restaurantId: bigint): PromocodeModel {

    const maxUsageCount = faker.number.int({
        max: 10000
    })
    const currentUsageCount = faker.number.int({
        max: maxUsageCount - 1
    })

    return {
        id: getUniqueBigIntId(),
        nameIdentifier: faker.lorem.word(5),
        discountPercentage: faker.number.int({
            min: 10,
            max: 100
        }),
        restaurantId,
        validFrom: faker.date.recent(),
        validUntil: faker.date.soon(),
        maxUsageCount,
        currentUsageCount,
        isActive: true
    }
}

export function generatePromocodeCreateInputModel(restaurantId: bigint): PromocodeCreateInput {
    return {
        nameIdentifier: faker.lorem.word(5),
        discountPercentage: faker.number.int({
            min: 10,
            max: 100
        }),
        restaurantId,
        validFrom: faker.date.recent(),
        validUntil: faker.date.soon(),
        maxUsageCount: faker.number.int({
            max: 10000
        })
    }
}

export function generatePromocodeUpdateInputModel(restaurantId?: bigint): PromocodeUpdateInput {
    return {
        nameIdentifier: faker.lorem.word(5),
        discountPercentage: faker.number.int({
            min: 10,
            max: 100
        }),
        validFrom: faker.date.recent(),
        validUntil: faker.date.soon(),
        maxUsageCount: faker.number.int({
            max: 10000
        }),
        restaurantId
    }
}

// Database Generation

export async function createPromocode(client: PrismaClient, restaurantId: bigint): Promise<PromocodeModel> {
    const promocodeData = generatePromocodeCreateInputModel(restaurantId)
    return await client.promocode.create({
        data: promocodeData
    })
}

// DTOs

export function generatePromocodeCreateInputDto(restaurantId: number): PromocodeCreateInputDTO {
    return {
        nameIdentifier: faker.lorem.word(5),
        discountPercentage: faker.number.int({
            min: 10,
            max: 100
        }),
        restaurantId,
        validFrom: faker.date.recent().toString(),
        validUntil: faker.date.soon().toString(),
        maxUsageCount: faker.number.int({
            max: 10000
        }),
    }
}

export function generatePromocodeUpdateInputDto(): PromocodeUpdateInputDTO {
    return {
        discountPercentage: faker.number.int({
            min: 10,
            max: 100
        }),
        validFrom: faker.date.recent().toString(),
        validUntil: faker.date.soon().toString(),
        maxUsageCount: faker.number.int({
            max: 10000
        })
    }
}