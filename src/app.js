import express from "express";
import cors from "cors";
import checkoutRoutes from "./routes/checkoutRoute.js";
import productRoutes from "./routes/productRoute.js";
import admincouponRoute from "./routes/adminCouponRoute.js";

// App
const app = express();

// Cors
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// Routes
app.use(checkoutRoutes);
app.use("/products", productRoutes);
app.use(admincouponRoute);

// app.get("get", (req, res) => {

// });
export default app;
