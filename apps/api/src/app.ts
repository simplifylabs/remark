require("module-alias/register");
require("@api/util/logger")();
require("@api/util/dotenv")();

import express from "express";
import cookies from "cookie-parser";
import cors from "@api/middleware/cors";
import error from "@api/middleware/error";
import auth from "@api/router/auth";
import comment from "@api/router/comment";
import user from "@api/router/user";
import feedback from "@api/router/feedback";

const app = express();

// Global Middleware
app.use(express.json());
app.use(cookies());
app.use(cors());

// Routers
app.use("/auth", auth);
app.use("/comment", comment);
app.use("/user", user);
app.use("/feedback", feedback);

// Error Handler
app.use(error());

// 404 Not Found
app.use((_, res) => {
  res.status(404).json({
    error: "NOT_FOUND",
    message: "The requested ressource was not found",
  });
});

// Start the server
if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT, () => {
    console.info(`Remark API is listening on port ${process.env.PORT}`);
  });
}

export const server = app;
