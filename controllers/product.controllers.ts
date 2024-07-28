import { Request, Response } from "express";
import Product from "../models/product";

const BASE_URL = process.env.BASE_URL;

export const addProduct = async (req: Request, res: Response) => {
  const { title, price, description, category } = req.body;
  const imagePath = req.file ? req.file.path : "";

  const product = new Product({
    title,
    price,
    description,
    category,
    image: imagePath,
  });

  try {
    const savedProduct = await product.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully.",
      data: savedProduct,
    });
  } catch (err: any) {
    res.status(400).json({ sucess: false, message: err.message });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json({
      success: true,

      data: products,
    });
  } catch (err: any) {
    res.status(500).json({ sucess: false, message: err.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.json({
      success: true,
      message: "Product updated successfully!",
      data: updatedProduct,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    await Product.deleteOne({ _id: req.params.id });
    res.json({ sucess: true, message: "Product deleted" });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getOneProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.json({ success: true, data: product });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
