import { PrismaClient } from "@prisma/client";

export function getPrismaClient(): PrismaClient {
    return new PrismaClient()
}