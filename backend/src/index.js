// packages
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

// utils,routers and constant
import connectDB from "./config/db.js";
import userRoute from "./routers/user.router.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

// set variable
const app = express();

// set dotenv config
dotenv.config({
  path: "../.env",
});

// set cors options
const corsOption = {
  origin: process.env.CROSS_ORIGIN,
  Credential: true,
};

// set middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());
app.use(cors(corsOption));

// set routes
app.use("/api/users", userRoute);

// set global level error handling middlwere
app.use(errorMiddleware);

/* database connection and app listen to port */
(async () =>
  connectDB().then((resolve) => {
    try {
      app.listen(process.env.PORT, () => {
        const { port } = resolve.connection;
        console.log(`db connect at port ${port}`);
        console.log(`app working => ${process.env.PORT}`);
      });
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }))();
