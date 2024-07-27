import dotenv from "dotenv";
import express from "express";

import {
  login,
  register,
  adminProfile,
} from "../controllers/admin.controllers";
import verifyToken from "../middlewares/verifyToken";

dotenv.config();
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/profile", verifyToken, adminProfile);

export default router;
