import cors from "cors";

export default () =>
  cors({
    origin: true,
    allowedHeaders: "Authorization, Content-Type",
    credentials: true,
    maxAge: 1000 * 60 * 15,
  });
