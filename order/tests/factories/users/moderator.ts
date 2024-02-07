import { faker } from "@faker-js/faker"
import { PrismaClient } from "@prisma/client"
import { ModeratorCreateInputDTO } from "@src/modules/users/dto/moderator"
import { ModeratorModel, ModeratorCreateInput, ModeratorUpdateInput } from "@src/modules/users/models/moderator"
import { getUniqueBigIntId, getUniqueNumberId } from "@tests/utils/unique"

// Models

export function generateModeratorModel(): ModeratorModel {
    return {
        id: getUniqueBigIntId()
    }
}

export function generateModeratorCreateInputModel(): ModeratorCreateInput {
    return {
        id: getUniqueBigIntId()
    }
}

export function generateModeratorUpdateInputModel(): ModeratorUpdateInput {
    return {
        id: getUniqueBigIntId()
    }
}

// Database Generation

export async function createModerator(client: PrismaClient): Promise<ModeratorModel> {
    const moderatorData = generateModeratorCreateInputModel()
    return await client.moderator.create({
        data: moderatorData
    })
}

// export async function createManyModerators(client: PrismaClient, count: number): Promise<ModeratorModel[]> {
//     return await Promise.all(
//         Array.from({length: count}, async () => await createModerator(client))
//     )
// }

// DTOs

export function generateModeratorCreateInputDto(): ModeratorCreateInputDTO {
    return {
        id: getUniqueNumberId()
    }
}