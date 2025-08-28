import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: false // Changed to not required
  },

  email: {
    type: String,
    required: false // Optional email
  },

  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],

  total: {
    type: Number,
    required: true
  },

  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true }
  },

  status: {
    type: String,
    enum: ["pending", "paid", "shipped", "cancelled"],
    default: "pending"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("orders", orderSchema);

