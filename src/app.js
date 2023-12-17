import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with the actual client app domain
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export default app;
