import User from "../models/user.model.js";
import { json } from "express";
import mongoose from "mongoose"
import bcrypt from "bcryptjs";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

export const getUsers = async (req,res,next) => {
    try{
        const users = await User.find();

        if(!users){
            const error = new Error('Not Users are Avaiable');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "All Users Fetched Sucessfully",
            data: users
        });

    }catch(error){
        next(error);
    }
}

export const getUsersById = async (req,res,next) => {
    try{
        const user = await User.findById(req.params.id).select('-password');

        if(!user){
            const error = new Error ('No Such User Exists');
            error.statusCode=404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message:'Successfully fetched Details',
            data: user
        });

    }catch(error){
        next(error);
    }

}

export const createUser = async (req,res,next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const { name , email, password } = req.body;
    
        //checking for exisiting user
        const exsittingUser = await User.findOne({email});

        if(exsittingUser){
            const error = new Error('User Already Exsists');
            error.statusCode = 400;
            throw error;
        }

        if(!name || !email || !password){
            const error = new Error('Email,Name and Password are required');
            error.statusCode = 400;
            throw error;
        }

        //Hashing Passwords
        const salt = bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hash(password,salt);

        const [newUser] = await User.create([{name,email,password:hashedPassword}], {session});
        
        //JWT Ops
        const token = jwt.sign({userId:newUser._id,}, {JWT_SECRET}, {expiresIn: JWT_EXPIRES_IN});

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: "User Created Sucessfully",
            data:{
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

export const updateUser = async (req,res,next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const { name, email } = req.body;

        const user = await User.findById(req.params.id);

        if(!user){
            const error = new Error('No Such User Exists');
            error.statusCode = 404;
            throw error;
        }

        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();
        
        await session.commitTransaction();
        session.endSession();


        res.status(200).json({
            success: true,
            message: "User Updated Sucessfully",
            data: user
        });

    }catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }

}

export const deleteUser = async (req,res,next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    
    try{
        const user = await User.findById(req.params.id);

        if(!user){
            const error = new Error('No Such User Exists');
            error.statusCode = 404;
            throw error;
        }   

        await user.deleteOne();

        await session.commitTransaction();
        session.endSession();

    }catch(error){ 
        await session.abortTransaction();
        session.endSession();
        next(error);

    }

}