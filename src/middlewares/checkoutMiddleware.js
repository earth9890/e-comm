import User from "../models/User.js";
import Product from "../models/Product.js";
import { Nth_Order } from "../constants.js";
import { generateCouponCode } from "../utils/couponCodeGenrator.js";
const checkoutMiddleware = async (req, res, next) => {
  try {
    const { username, cartItems } = req.body;

    // Find or Create User if not in database
    let user = await User.findOne({ name: username });

    if (!user) {
      user = new User({ name: username });
      await user.save();
    }
    user = await User.findOne({ name: username });

    // Total amount of products added in cart
    let total = 0;
    let itemsArray = [];

    for (const item of cartItems) {
      const product = await Product.findById(item.productId);
      if (product) {
        total += product.price * item.quantity;
        itemsArray.push({ productId: product._id, quantity: item.quantity });
      }
    }

    // Check if the order is eligible for a discount
    const newOrder = user.orders + 1;
    user.orders = newOrder;

    if (newOrder !== 0 && newOrder % Nth_Order === 0) {
      // Apply a 10% discount to the total amount in the cart
      const discountPercentage = 10;
      const discountAmount = (total * discountPercentage) / 100;
      const discountedTotalAmount = total - discountAmount;

      // Save the updated cart data with the discounted total amount
      req.discountEligible = true;
      req.totalAmount = discountedTotalAmount;

      // Check if the coupon code needs to be created
      if (req.discountEligible) {
        // Make a request to the adminCouponRoute to generate a coupon code
        const couponCode = generateCouponCode(user.name, discountAmount);
        user.purchaseHistory.push({
          orderNumber: newOrder,
          items: itemsArray,
          discountApplied: req.discountEligible,
          totalAmount: req.totalAmount + discountAmount,
          totalAmount_After_Discount: req.totalAmount,
          discountAmount: discountAmount,
          couponCode: couponCode,
        });
      }
      await user.save();
      next();
    } else {
      req.discountEligible = false;
      req.totalAmount = total;

      // Update user's purchase history
      user.purchaseHistory.push({
        orderNumber: newOrder,
        items: itemsArray,
        discountApplied: req.discountEligible,
        totalAmount: req.totalAmount,
      });

      await user.save();
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default checkoutMiddleware;
