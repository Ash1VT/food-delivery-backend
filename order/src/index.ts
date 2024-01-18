import express from "express";
import dotenv from "dotenv";
import getSettings from "./config";
import { OrderStatus, Prisma, PrismaClient } from '@prisma/client'
import ICustomerRepository from "./repositories/interfaces/ICustomerRepository";
import IMenuItemRepository from "./repositories/interfaces/IMenuItemRepository";
import PrismaMenuItemRepository from "./repositories/prisma/PrismaMenuItemRepository";
import PrismaCustomerRepository from "./repositories/prisma/PrismaCustomerRepository";
import PrismaOrderRepository from "./repositories/prisma/PrismaOrderRepository";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unreachable code error
BigInt.prototype.toJSON = function () {
    return this.toString();
};

const app = express()
const settings = getSettings()
const prismaClient = new PrismaClient()
const orderRepository = new PrismaOrderRepository(prismaClient)
const customerRepository: ICustomerRepository = new PrismaCustomerRepository(prismaClient)
const menuItemRepository: IMenuItemRepository = new PrismaMenuItemRepository(prismaClient)
const date = new Date()

const fuckingShit = {
    customerId: 1,
    restaurantId: 0,
    supposedDeliveryTime: date,
    totalPrice: 12.00,
    decountedPrice: 13.00,
    items: {
        create: [
            {
                menuItemId: 1,
                quantity: 2
            }
        ]
    }
}

app.get('/', async (req, res) => {
    res.json({'message': await customerRepository.getMany()})
})

// app.get('/hi', (req, res) => {
    // res.send("Hi!!!!")
// })

// app.disable('etag');
app.listen(settings.variables.appPort, settings.variables.appHost, () => {
    console.log("app started")
})