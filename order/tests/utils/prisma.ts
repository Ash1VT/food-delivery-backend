import { Prisma, PrismaClient } from '@prisma/client';

const tables = Prisma.dmmf.datamodel.models
    .map((model) => model.dbName)
    .filter((table) => table);

export const clearPostgres = async (prismaClient: PrismaClient) => {
    await prismaClient.$transaction([
        ...tables.map((table) =>
            prismaClient.$executeRawUnsafe(`TRUNCATE ${table} CASCADE;`),
        ),
    ]);
};