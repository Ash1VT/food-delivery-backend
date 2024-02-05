import { faker } from "@faker-js/faker"
import { Prisma, PrismaClient } from "@prisma/client"
import { PromotionCreateInputDTO } from "@src/modules/promotions/dto/promotion"
import { PromotionModel, PromotionCreateInput, PromotionUpdateInput } from "@src/modules/promotions/models/promotion"
import { getUniqueBigIntId, getUniqueNumberId } from "@tests/utils/unique"
type f = Prisma.OrderCreateInput
// Models

export function generatePromotionModel(): PromotionModel {
    return {
        id: getUniqueBigIntId()
    }
}

export function generatePromotionCreateInputModel(): PromotionCreateInput {
    return {
        id: getUniqueBigIntId()
    }
}

export function generatePromotionUpdateInputModel(): PromotionUpdateInput {
    return {
        id: getUniqueBigIntId()
    }
}

// Database Generation

export async function createPromotion(client: PrismaClient): Promise<PromotionModel> {
    const promotioneData = generatePromotionCreateInputModel()
    return await client.promotion.create({
        data: promotioneData
    })
}

// DTOs

export function generatePromotionCreateInputDto(): PromotionCreateInputDTO {
    return {
        id: getUniqueNumberId()
    }
}