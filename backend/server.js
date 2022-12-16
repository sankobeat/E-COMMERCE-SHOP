import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRouter from "./routes/productsRoutes.js";
import userRouter from "./routes/userRoute.js";
import uploadRouter from "./routes/uploadRoute.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import orderRoutes from "./routes/orderRoutes.js";
import bodyParser from "body-parser";
import path from "path";
import morgan from "morgan";

dotenv.config();
connectDB();
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRoutes);
app.use("/api/uploads", uploadRouter);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("api is running");
  });
}

app.use(notFound);

app.use(errorHandler);

app.listen(5000, () => {
  console.log(
    `server is running in ${process.env.NODE_ENV} on port ${port} and dirname is ${__dirname}`
  );
});
