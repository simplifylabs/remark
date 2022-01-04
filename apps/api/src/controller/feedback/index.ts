import { Request, Response } from "express";
import { validate, Joi } from "@api/middleware/validation";
import { Feedback } from "@db";

const meUser = async (req: Request, res: Response) => {
  try {
    await Feedback.create({
      data: {
        statements: req.body.statements,
        comment: req.body.comment,
      },
    });

    res.status(200).json({});
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
  }
};

export default [
  validate({
    body: Joi.object({
      statements: Joi.array().items(Joi.string().max(200)).required(),
      comment: Joi.string().max(3000).optional(),
    }),
  }),
  meUser,
];
