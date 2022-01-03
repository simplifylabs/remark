import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default prisma;

export const comment = {
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
