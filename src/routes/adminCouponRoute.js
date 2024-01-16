
import express from "express";
import { generateCouponCode } from "../utils/couponCodeGenrator.js";

const router = express.Router();

router.post("/generate-coupon", async (req, res) => {
  try {
    const { username, discountAmount } = req.body;

    const couponCode = generateCouponCode(username, discountAmount);

   // We save in database and return it to user
    res.status(200).json({ couponCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
