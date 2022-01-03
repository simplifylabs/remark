import { Joi, validate as validateOriginal } from "express-validation";

// Validate with options
export function validate(validation: object) {
  return validateOriginal(validation, {}, {});
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getValidationMessage(err: any) {
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

// Custom username validation
const username = Joi.string()
  .regex(/^[a-zA-Z0-9_.]*$/)
  .message(
    "Only Letters, Numbers, Dots, and Underscores are allowed in the username!"
  )
  .min(3)
  .max(20);

// Often used validation models
export const prefabs = {
  id: Joi.string().uuid(),
  email: Joi.string().email(),
  password: Joi.string().min(6).max(128),
  comment: Joi.string().min(1).max(200),
  refreshToken: Joi.string().min(1).max(2000),
  url: Joi.string().uri().min(1).max(2000),
  page: Joi.number().min(0).max(1000),
  username,
};

export { Joi } from "express-validation";
