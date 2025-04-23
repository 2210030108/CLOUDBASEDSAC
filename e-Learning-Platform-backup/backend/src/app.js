import dotenv from "dotenv";
dotenv.config({ path: './.env' });

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(cookieParser());

// Student routes
import studentRouter from "./routes/student.routes.js";
app.use("/api/student", studentRouter);

// Teacher routes
import teacherRouter from "./routes/teacher.routes.js";
app.use("/api/teacher", teacherRouter);

// Course routes
import courseRouter from "./routes/course.routes.js";
app.use("/api/course", courseRouter);

// Admin routes
import adminRouter from "./routes/admin.routes.js";
app.use("/api/admin", adminRouter);

// Payment routes
import paymentRouter from "./routes/payment.routes.js";
app.use("/api/payment", paymentRouter);

export { app };