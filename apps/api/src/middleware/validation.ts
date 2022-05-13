import {
  Joi,
  validate as validateOriginal,
  ValidationError,
} from "express-validation";

export function validate(validation: object) {
  return validateOriginal(validation, {}, {});
}

export function getValidationMessage(err: ValidationError) {
  if (!err) return false;
  if (!err.details) return false;

  const details = err.details;
  if (!details.body && !details.params && !details.query) return false;

  const body = details.body || details.params || details.query;
  if (!Array.isArray(body)) return false;

  if (body.length < 1) return false;
  if (!body[0]) return false;

  const message = body[0].message;
  if (!message) return false;
  return message;
}

const username = Joi.string()
  .regex(/^[a-zA-Z0-9_.]*$/)
  .message(
    "Only Letters, Numbers, Dots, and Underscores are allowed in the username!"
  )
  .min(3)
  .max(20);

export const prefabs = {
  id: Joi.string().uuid(),
  email: Joi.string().email(),
  password: Joi.string().min(6).max(128),
  comment: Joi.string().min(1).max(200),
  refreshToken: Joi.string().min(1),
  googleToken: Joi.string().min(1),
  captchaToken: Joi.string(),
  url: Joi.string().uri().min(1),
  page: Joi.number().min(0).max(1000),
  username,
};

export { Joi } from "express-validation";
