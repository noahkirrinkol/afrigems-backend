import express from "express";
import userRoutes from "./user.routes";
import productRoutes from "./product.routes";
import adminRoutes from "./admin.routes";

const router = express.Router();

// User Routes
router.use("/user", userRoutes);

// Admin Routes
router.use("/admin", adminRoutes);

// Product Routes
router.use("/product", productRoutes);

export default router;
