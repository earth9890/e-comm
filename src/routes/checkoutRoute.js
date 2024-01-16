import express from "express";
import checkoutMiddleware from "../middlewares/checkoutMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/checkout", checkoutMiddleware, async (req, res) => {
  try {
    if (req.discountEligible) {
      const { username } = req.body;
      let user = await User.findOne({ name: username });
      const lastOrder = user.purchaseHistory[user.purchaseHistory.length - 1];

      res.status(200).json({
        message: `Items added to cart, and 10% discount applied using`,
        totalAmount: req.totalAmount,
        lastOrder,
      });
    } else {
      const { username } = req.body;
      let user = await User.findOne({ name: username });
      const lastOrder = user.purchaseHistory[user.purchaseHistory.length - 1];
      res.status(200).json({
        message: "Items added to cart. No discount applied.",
        totalAmount: req.totalAmount,
        lastOrder,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
