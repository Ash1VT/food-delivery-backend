import { PrismaClient } from "@prisma/client"
import { CustomerCreateInputDto } from "@src/modules/users/dto/customer.dto"
import { CustomerModel, CustomerCreateInput, CustomerUpdateInput } from "@src/modules/users/models/customer.models"
import { getUniqueId } from "@tests/utils/unique"

// Models

export function generateCustomerModel(): CustomerModel {
    return {
        id: getUniqueId()
    }
}

export function generateCustomerCreateInputModel(): CustomerCreateInput {
    return {
        id: getUniqueId()
    }
}

export function generateCustomerUpdateInputModel(): CustomerUpdateInput {
    return {
        id: getUniqueId()
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

export function generateCustomerCreateInputDto(): CustomerCreateInputDto {
    return {
        id: getUniqueId()
    }
}