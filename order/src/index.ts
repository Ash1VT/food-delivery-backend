import express from "express";
import dotenv from "dotenv";
import getSettings from "./config";
import { OrderStatus, PrismaClient } from '@prisma/client'
import OrderRepository from "./repositories/OrderRepository";
import CustomerRepository from "./repositories/CustomerRepository";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unreachable code error
BigInt.prototype.toJSON = function () {
    return this.toString();
};

const app = express()
const settings = getSettings()
const prismaClient = new PrismaClient()
const orderRepository = new OrderRepository(prismaClient)
const customerRepository = new CustomerRepository(prismaClient)

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
    res.json({'message': await orderRepository.create(fuckingShit)})
})

// app.get('/hi', (req, res) => {
    // res.send("Hi!!!!")
// })

// app.disable('etag');
app.listen(settings.variables.appPort, settings.variables.appHost, () => {
    console.log("app started")
})