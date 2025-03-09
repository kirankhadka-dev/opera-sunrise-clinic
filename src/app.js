import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(express.static("public"));

//import routes
import healthcheckRouter from "./routes/healthcheck.routes.js";
import authRouter from "./routes/auth.routes.js";
import adminRouter from "./routes/admin.route.js";

// routes

app.use("/api/v1/healthcheck", healthcheckRouter);

// auth routes
app.use("/api/v1/auth/", authRouter);

// admin routes
app.use("/auth/v1/admin", adminRouter);

export { app };
