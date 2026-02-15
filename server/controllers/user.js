import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from '../models/userSchema.js';

const secret = 'test';

export const signin=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const existingUser=await User.findOne({email});
        if(!existingUser)return res.status(404).json({message:'User Not Found'});

        const IsPasswordCorrect=await bcrypt.compare(password,existingUser.password);
        if(!IsPasswordCorrect)return res.status(400).json({message:'Wrong Credentials'});
        const token=jwt.sign({ email: existingUser.email, id: existingUser._id }, secret, { expiresIn: "1h" });
        res.json({result:existingUser,token});
    } catch (error) {
        res.status(500).json({message:'Something Went Wrong'});
    }
};

export const signup=async(req,res)=>{
    const {firstName,lastName,email,password,confirmPassword}=req.body;
    try {
        const existingUser=await User.findOne({email});
        if(existingUser)return res.status(400).json({message:'User Already Exists'});
        if(password!==confirmPassword)return res.status(400).json({message:'Passwords Dont Match'});
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
        const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );
        res.json({result,token});
    } catch (error) {
        res.status(500).json({message:'Something Went Wrong'});
    }
};
