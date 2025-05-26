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

        firstName: {
            type: String,
            required: true,
        },

        lastName: {
            type: String,
            required: true,
        },

        address: {
            type: String,
            required: true,
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