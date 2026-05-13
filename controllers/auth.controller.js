import mongoose from "mongoose"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

 
export const signUp = async (req,res,next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const { name, email, password } = req.body;

        //check for exsisting user
        const exsistingUser = await User.findOne({email});

        if(exsistingUser){
            const error = new Error('User Already Exsists');
            error.statusCode = 409;
            throw error;
        }

        if (!name || !email || !password) {
            const error = new Error('Name, email, and password are required');
            error.statusCode = 400;
            throw error;
        }

        // Hashing Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [newUser] = await User.create([{ name, email, password: hashedPassword }], { session });

        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            status: true,
            message: "User Created Successfully",
            data: {
                token,
                user: newUser,
            }
        });
        
    }catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }

}

export const signIn = async (req,res,next) => {

    try{
        const {email, password} = req.body;

        const user =  await User.findOne({email});

        if(!user){
            const error = new Error("User Not found");
            error.statusCode = 404;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid){
            const error = new Error (" Password is Not Valid");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({userId: user._id},JWT_SECRET,{expiresIn: JWT_EXPIRES_IN});

        res.status(200).json({
            success: true,
            message: "User Sucessfully Logged In ",
            data: {
                token,
                user,            }
        });
        
    }catch(error){
        next(error);
    }
}

export const signOut = async (req,res,next) => {
     
}








