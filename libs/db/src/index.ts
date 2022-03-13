import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const User = client.user;
export const Post = client.post;
export const Url = client.url;
export const Vote = client.vote;
export const Feedback = client.feedback;
export const Notification = client.notification;

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
