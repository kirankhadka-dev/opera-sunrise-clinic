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
import patientRouter from "./routes/patient.route.js";
import doctorRouter from "./routes/doctor.route.js";
import appointmentRouter from "./routes/appointment.route.js";
import diagnosisRouter from "./routes/diagnosis.route.js";

// routes

app.use("/api/v1/healthcheck", healthcheckRouter);

// auth routes
app.use("/api/v1/auth/", authRouter);

// admin routes
app.use("/auth/v1/admin", adminRouter);

// patient  routes
app.use("/api/v1/patients", patientRouter);

// doctor routes:
app.use("/api/v1/doctors", doctorRouter);

// apointment routes

app.use("/api/v1/appointments", appointmentRouter);

// diagnosis routes :

app.use("api/v1/diagnosis", diagnosisRouter);

export { app };
