import { PrismaClient } from "@prisma/client"
import { ModeratorModel, ModeratorCreateInput, ModeratorUpdateInput } from "@src/modules/users/models/moderator.models"
import { getUniqueId } from "@tests/utils/unique"

// Models

export function generateModeratorModel(): ModeratorModel {
    return {
        id: getUniqueId()
    }
}

export function generateModeratorCreateInputModel(): ModeratorCreateInput {
    return {
        id: getUniqueId()
    }
}

export function generateModeratorUpdateInputModel(): ModeratorUpdateInput {
    return {
        id: getUniqueId()
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

// export function generateModeratorCreateInputDto(): ModeratorCreateInputDto {
//     return {
//         id: getUniqueId()
//     }
// }