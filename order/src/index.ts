import express from "express";
import dotenv from "dotenv";
import getSettings from "./config";
import { PrismaClient } from '@prisma/client'
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