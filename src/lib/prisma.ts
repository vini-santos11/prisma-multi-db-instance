import { PrismaClient } from "@prisma/client";

export function createPrismaClient(databaseUrl: string): PrismaClient {
    console.log(databaseUrl);
    
    return new PrismaClient({
        datasources: {
            db: {
                url: databaseUrl,
            },
        },
    })
}