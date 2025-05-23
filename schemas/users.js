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

        orders: {
            type: [Number],
            default: []
        },

        phone: {
            type: Number,
            required: false
        },

        role: {
            type: String,
            required: true,
            default: "customer"
        },

        password: {
            type: String,
            required: true
        }

    }
)

export default mongoose.model('users', userSchema);