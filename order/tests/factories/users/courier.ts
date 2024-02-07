import { PrismaClient } from "@prisma/client";
import { CourierCreateInputDTO } from "@src/modules/users/dto/courier";
import { CourierCreateInput, CourierModel, CourierUpdateInput } from "@src/modules/users/models/courier";
import { getUniqueId } from "@tests/utils/unique";

// Models

export function generateCourierModel(): CourierModel {
    return {
        id: getUniqueId()
    }
}

export function generateCourierCreateInputModel(): CourierCreateInput {
    return {
        id: getUniqueId()
    }
}

export function generateCourierUpdateInputModel(): CourierUpdateInput {
    return {
        id: getUniqueId()
    }
}

// Database Generation

export async function createCourier(client: PrismaClient): Promise<CourierModel> {
    const courierData = generateCourierCreateInputModel()
    return await client.courier.create({
        data: courierData
    })
}

// export async function createManyCouriers(client: PrismaClient, count: number): Promise<CourierModel[]> {
//     return await Promise.all(
//         Array.from({length: count}, async () => await createCourier(client))
//     )
// }

// DTOs

export function generateCourierCreateInputDto(): CourierCreateInputDTO {
    return {
        id: getUniqueId()
    }
}