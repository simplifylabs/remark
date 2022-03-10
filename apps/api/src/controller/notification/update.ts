import { Request, Response } from "express";
import { validate, Joi, prefabs } from "@api/middleware/validation";
// import { Notification } from "@db";

const updateNotification = async (req: Request, res: Response) => {
  // TODO
  res.status(200).json({});
};

export default [
  validate({
    params: Joi.object({
      id: prefabs.id.required(),
    }),
    body: Joi.object({
      statements: Joi.array().items(Joi.string().max(200)).max(10).required(),
      comment: Joi.string().max(3000).optional(),
    }),
  }),
  updateNotification,
];
