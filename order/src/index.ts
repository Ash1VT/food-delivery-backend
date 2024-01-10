import express from "express";
import dotenv from "dotenv";
import getSettings from "./config";
import { PrismaClient } from '@prisma/client'

const app = express()
const settings = getSettings()

app.get('/', (req, res) => {
    res.json({'message': settings.variables})
})

// app.get('/hi', (req, res) => {
    // res.send("Hi!!!!")
// })

// app.disable('etag');
app.listen(settings.variables.appPort, settings.variables.appHost, () => {
    console.log("app started")
})