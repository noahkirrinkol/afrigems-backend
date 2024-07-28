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
import cloudinary from "../config/cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

interface ExtendedParams {
  folder: string;
  format: (
    req: express.Request,
    file: Express.Multer.File
  ) => string | Promise<string>;
  public_id: (req: express.Request, file: Express.Multer.File) => string;
}

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",
    format: async (req, file) => "jpeg" || "png", // supports promises as well
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  } as ExtendedParams, // Use the extended params type
});

const upload = multer({ storage });

router.get("/all", getProducts);

router.post("/add", verifyToken, upload.single("image"), addProduct);

router.get("/get/:id", verifyToken, getOneProduct);

router.put("/update/:id", verifyToken, upload.single("image"), updateProduct);

router.delete("/delete/:id", verifyToken, deleteProduct);

export default router;
