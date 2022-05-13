import { Request, Response } from "express";
import { Joi, validate } from "@api/middleware/validation";
import { getScreenshot } from "@cdn/util/chromium";
import { commentSelect, Post } from "@db";
import limit from "@middleware/limit";
import { getCommentHTML } from "@cdn/util/template";

const commentController = async (req: Request, res: Response) => {
  const post = await Post.findFirst({
    where: {
      OR: [{ id: String(req.query.id) }, { slug: String(req.query.id) }],
    },
    select: { ...commentSelect, replies: false },
  });

  if (!post) return res.status(404).json({ error: "NOT_FOUND" });

  try {
    const html = getCommentHTML(post);
    const file = await getScreenshot(html);
    res.statusCode = 200;
    res.setHeader("Content-Type", `image/jpeg`);
    res.setHeader(
      "Cache-Control",
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
    );
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
    console.error(e);
  }
};

export default [
  limit({ requests: 100, per: "IP" }),
  validate({
    query: Joi.object({
      id: Joi.string().required(),
    }),
  }),
  commentController,
];
