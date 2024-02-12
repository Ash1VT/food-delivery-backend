import { Prisma, PrismaClient } from "@prisma/client"
import { PromotionCreateInputDto } from "@src/modules/promotions/dto/promotion.dto"
import { PromotionModel, PromotionCreateInput, PromotionUpdateInput } from "@src/modules/promotions/models/promotion.models"
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

export function generatePromotionCreateInputDto(): PromotionCreateInputDto {
    return {
        id: getUniqueId()
    }
}