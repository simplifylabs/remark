import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const user = client.user;
export const post = client.post;
export const url = client.url;
export const vote = client.vote;
export const feedback = client.feedback;

export const commentSelect = {
  id: true,
  comment: true,
  author: {
    select: {
      id: true,
      username: true,
    },
  },
  upvotes: true,
  downvotes: true,
  createdAt: true,
  replies: {
    orderBy: [
      {
        upvotes: "desc",
      },
      {
        downvotes: "asc",
      },
    ],
    select: {
      id: true,
      comment: true,
      author: {
        select: {
          id: true,
          username: true,
        },
      },
      upvotes: true,
      downvotes: true,
      createdAt: true,
      replyId: true,
      replies: false,
    },
  },
};

export const prisma = client;
export * from ".prisma/client";
