import { PrismaClient } from "@prisma/client";

//Пытаемся получить свойство prisma из глобального объекта (global)
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Если в объекте global свойство prisma отсутствует,
// то создаём новый экземпляр класса Prisma,
// и экспортируем его
export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ["query"],
    });

if (process.env.NODE_ENV != "production") globalForPrisma.prisma;
