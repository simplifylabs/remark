import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const user = client.user;
export const post = client.post;
export const url = client.url;
export const vote = client.vote;
export const feedback = client.feedback;

export * from ".prisma/client";
