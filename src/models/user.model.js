import mongoose from 'mongoose' 

const schema = mongoose.Schema({
    first_name:String,
    last_name:String,
    email:{
        type:String,
        unique:true
    },
    age: Number,
    password:String,
    role:{
        type:String,
        default:"user"
    },
    loggedBy:{
        type:String,
        default:"Web"
    }
})
const userModel = mongoose.model("users",schema);
export default userModel;
