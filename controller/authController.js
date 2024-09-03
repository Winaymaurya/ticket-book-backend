
import JWT from "jsonwebtoken"
import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import userModel from "../model/userModel.js"

export const registerController=async(req,res)=>{
  
    try {
        const {name,email,pic,password,isAdmin}=req.body
        console.log(req.body)
       
    if(!name){
        return res.send({message:"Name is Required"})
    }
    if(!email){
        return res.send({message:"email is Required"})
    }
    if(!password){
        return res.send({message:"password is Required"})
    }

    const existingUser= await userModel.findOne({email})
    if(existingUser){
        res.status(200).send({
            success:false,
            message:"User Already Registered Please Login"
        })
    }
    
   const hashedPassword= await hashPassword(password)
   console.log(hashedPassword)

//    save data
      
    const user= await new userModel({name,email,password:hashedPassword,pic,isAdmin}).save();
    res.status(201).send({
        success:true,
        message:"User Created",
        user
    });


    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:"Something went wrong in registration"
        })
    }
    
}



export const loginController=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            res.status(200).send({
                success:false,
                message:"All Fields are required"
            })
        }
        
        const existingUser= await userModel.findOne({email})
        if(!existingUser){
            return res.status(200).send({
                success:false,
                message:"User Not Found Please Register"
            })
        }

        const match=await comparePassword(password,existingUser.password)
        if(!match){
            return res.status(400).send({
                success:false,
                message:"Invalid Password"
            })
        }

        const token =JWT.sign({_id:existingUser._id},process.env.JWT_SECRET,{expiresIn:'7d'})
          
        res.status(200).send({
            success:true,
            message:"Login Successful",
            existingUser,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:"Something went wrong in registration"
        })
    }
}