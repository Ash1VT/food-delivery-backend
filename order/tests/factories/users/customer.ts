import { faker } from "@faker-js/faker"
import { PrismaClient } from "@prisma/client"
import { CustomerCreateInputDTO } from "@src/modules/users/dto/customer"
import { CustomerModel, CustomerCreateInput, CustomerUpdateInput } from "@src/modules/users/models/customer"
import { getUniqueBigIntId, getUniqueNumberId } from "@tests/utils/unique"

// Models

export function generateCustomerModel(): CustomerModel {
    return {
        id: getUniqueBigIntId()
    }
}

export function generateCustomerCreateInputModel(): CustomerCreateInput {
    return {
        id: getUniqueBigIntId()
    }
}

export function generateCustomerUpdateInputModel(): CustomerUpdateInput {
    return {
        id: getUniqueBigIntId()
    }
}

// Database Generation

export async function createCustomer(client: PrismaClient): Promise<CustomerModel> {
    const customerData = generateCustomerCreateInputModel()
    return await client.customer.create({
        data: customerData
    })
}

// export async function createManyCustomers(client: PrismaClient, count: number): Promise<CustomerModel[]> {
//     return await Promise.all(
//         Array.from({length: count}, async () => await createCustomer(client))
//     )
// }

// DTOs

export function generateCustomerCreateInputDto(): CustomerCreateInputDTO {
    return {
        id: getUniqueNumberId()
    }
}