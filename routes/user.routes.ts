import dotenv from "dotenv";
import express from "express";

import {
  login,
  register,
  userProfile,
  users,
} from "../controllers/user.controllers";
import verifyToken from "../middlewares/verifyToken";

dotenv.config();
const router = express.Router();

router.get("/", users);

router.post("/register", register);

router.post("/login", login);

router.get("/profile", verifyToken, userProfile);

export default router;
