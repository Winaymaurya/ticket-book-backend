import mongoose from "mongoose";


const userSchema= mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
     },
      isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },    
},{timestamps:true})

export default mongoose.model('users',userSchema)