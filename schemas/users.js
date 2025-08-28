import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        name: {
            type: String,
            required: true,
        },

        shippingAddress: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            zip: { type: String, required: true },
            country: { type: String, required: true }
        },

        phone: {
            type: Number,
            required: false
        },

        role: {
            type: String,
            default: "customer"
        },

        password: {
            type: String,
            required: true
        },

        shopping_cart: [
            {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
            }
        ]
    }
)

export default mongoose.model('users', userSchema);