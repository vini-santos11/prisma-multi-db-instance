import fastify, { FastifyReply, FastifyRequest } from "fastify";
import cors from "@fastify/cors"
import { createPrismaClient } from "./lib/prisma";
import { changeDBName } from "./helpers/change-db-name";

export const app = fastify();

app.decorateRequest("prisma", null);

app.addHook('onRequest', async (request: FastifyRequest, reply: FastifyReply) => {
    let tenantId = request.headers['x-tenant-id'] as string;
    if(tenantId == null) 
        tenantId = "host"

    const databaseUrl = changeDBName("db_" + tenantId);
 
    request.prisma = createPrismaClient(databaseUrl);
})

app.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    const prisma  = request.prisma;

    const users = await prisma.user.findMany();

    reply.send(users).status(202);
})

app.register(cors, {
    origin: "*",
})