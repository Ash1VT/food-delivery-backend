import { Prisma, PrismaClient } from "@prisma/client"
import { PromotionCreateInputDTO } from "@src/modules/promotions/dto/promotion"
import { PromotionModel, PromotionCreateInput, PromotionUpdateInput } from "@src/modules/promotions/models/promotion"
import { getUniqueId } from "@tests/utils/unique"

// Models

export function generatePromotionModel(): PromotionModel {
    return {
        id: getUniqueId()
    }
}

export function generatePromotionCreateInputModel(): PromotionCreateInput {
    return {
        id: getUniqueId()
    }
}

export function generatePromotionUpdateInputModel(): PromotionUpdateInput {
    return {
        id: getUniqueId()
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
        id: getUniqueId()
    }
}