import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },

        description:{
            type: String,
            default: 'Lovingly handmade with soft yarn and lots of care, this crochet creation is the perfect blend of charm and coziness. Whether it’s for gifting or collecting, each piece is crafted to bring a little extra warmth and joy to your day.',
        },

        price: {
            type: Number,
            required: true
        },

        categories: {
            type: [String],
            required: true,
            enum: [
                'animals', 'space', 'flowers', 'lovables'
            ]
        },
        

        stock: {
            type: Number,
            required: true,
            min: [0, 'stock cannot be negative']
        },

        image: {
            type: String,
            default: "https://www.reshot.com/preview-assets/icons/RCEK872AJD/image-RCEK872AJD.svg"
        }
        
    }, { timestamps: true }
);

export default mongoose.model('products',productSchema);