import express from "express";
import checkoutMiddleware from "../middlewares/checkoutMiddleware.js";

const router = express.Router();

router.post("/checkout", checkoutMiddleware, (req, res) => {
  try {
    if (req.discountEligible) {
      res.status(200).json({
        message: `Items added to cart, and 10% discount applied using`,
        totalAmount: req.totalAmount,
      });
    } else {
      res.status(200).json({
        message: "Items added to cart. No discount applied.",
        totalAmount: req.totalAmount,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
