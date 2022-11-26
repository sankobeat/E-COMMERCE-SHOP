import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRouter from "./routes/productsRoutes.js";
import userRouter from "./routes/userRoute.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
const port = process.env.PORT || 5000;
dotenv.config();

connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("welcome to homepage");
});

app.use(notFound);

app.use(errorHandler);

app.listen(5000, () => {
  console.log(`server is running in ${process.env.NODE_ENV} on port ${port}`);
});
