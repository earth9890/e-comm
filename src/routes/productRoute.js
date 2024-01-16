import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.post("/add-product", async (req, res) => {
  try {
    const { name, price } = req.body;

    // Create a new product instance
    const newProduct = new Product({
      name,
      price,
    });

    // Save the product to the database
    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
