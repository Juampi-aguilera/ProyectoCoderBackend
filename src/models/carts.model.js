import mongoose from "mongoose";

const currentSchema = new mongoose.Schema({
    cartId: Number,
    products: {
        type:[{ 
            productId: mongoose.Schema.Types.ObjectId,
            quantity: Number
        }]
    }
});

currentSchema.pre('findOne', function() {
    this.populate("products.productId");
});

export default currentSchema