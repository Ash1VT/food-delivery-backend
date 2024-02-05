import { PrismaClient } from "@prisma/client"
import { clearPostgres } from "./utils/prisma"

afterAll(async () => {
    const prismaClient = new PrismaClient()
    await clearPostgres(prismaClient)
    await prismaClient.$disconnect()
}, 20000)