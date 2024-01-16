// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  orders: {
    type: Number,
    default: 0,
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
  purchaseHistory: [
    {
      orderNumber: Number,
      items: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          quantity: Number,
        },
      ],
      discountApplied: Boolean,
      totalAmount: {
        type: Number,
        default: 0,
      },
      totalAmount_After_Discount: {
        type: Number,
        default: 0,
      },
      discountAmount: {
        type: Number,
        default: 0,
      },
      couponCode: {
        type: String,
        default: "",
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
