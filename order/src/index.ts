import express from "express";
import dotenv from "dotenv";
import getSettings from "./config";
import { PrismaClient } from '@prisma/client'

const port = 3000
const app = express()

app.get('/', (req, res) => {
    const settings = getSettings()
    res.json({'message': settings})
})

// app.get('/hi', (req, res) => {
    // res.send("Hi!!!!")
// })

// app.disable('etag');
app.listen(port, () => {
    console.log("app started")
})