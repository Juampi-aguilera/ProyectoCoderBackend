import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const currentSchema = new mongoose.Schema({
    title: String,
    description: String,
    category:{
        type:String,
        enum: ['Musica', 'Cine y Series', 'Deporte'],
        default: 'Cine y Series'
    },
    price: Number,
    thumbnail: {
        type:Array,
        default:[]
    },
    code: Number,
    status: Boolean,
    stock: Boolean,
    id: Number,
});

currentSchema.plugin(mongoosePaginate)

const productsModel = mongoose.model("products", currentSchema)

export default productsModel