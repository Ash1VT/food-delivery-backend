import { faker } from "@faker-js/faker"
import { PrismaClient } from "@prisma/client"
import { DeliveryInformationCreateInput, DeliveryInformationModel, DeliveryInformationUpdateInput } from "@src/modules/orders/models/deliveryInformation.models"
import { getUniqueId } from "@tests/utils/unique"

// Models

export function generateDeliveryInformationModel(): DeliveryInformationModel {
    const deliveryInformationId = getUniqueId()
    const originAddress = faker.location.streetAddress()
    const destinationAddress = faker.location.streetAddress()

    return {
        id: deliveryInformationId,
        deliveryType: "WALKING",
        deliveryAcceptedAt: new Date(Date.now()),
        deliveryDistance: 1,
        supposedDeliveryTime: 1000,
        originAddress,
        destinationAddress,
    }
}

export function generateDeliveryInformationCreateInputModel(): DeliveryInformationCreateInput {
    return {
        originAddress: faker.location.streetAddress(),
        destinationAddress: faker.location.streetAddress(),
    }
}

export function generateOrderUpdateInputModel(): DeliveryInformationUpdateInput {
    return {
        deliveryType: "WALKING",
        deliveryDistance: 1,
        supposedDeliveryTime: 1000,
        deliveryAcceptedAt: new Date(Date.now()),
    }
}

// Database Generation

export async function createDeliveryInformation(client: PrismaClient): Promise<DeliveryInformationModel> {
    const deliveryInformationData = generateDeliveryInformationCreateInputModel()
    return await client.deliveryInformation.create({
        data: deliveryInformationData
    })
}