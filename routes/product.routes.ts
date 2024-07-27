import multer from "multer";
import express from "express";
import verifyToken from "../middlewares/verifyToken";
import {
  addProduct,
  getProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controllers";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/all", getProducts);

router.post("/add", verifyToken, upload.single("image"), addProduct);

router.get("/get/:id", verifyToken, getOneProduct);

router.put("/update/:id", verifyToken, upload.single("image"), updateProduct);

router.delete("/delete/:id", verifyToken, deleteProduct);

export default router;
