import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if(!DB_URI){
    throw new Error("Database URI is not defined in environment variables");
}

const connectToTheDatabase = async () => {
    try{
        await mongoose.connect(DB_URI)

        console.log(`Successfully connected to the database in ${NODE_ENV} environment`);
    }catch(error){
        console.error("Error!! Not connecting to the database ", error);
        process.exit(1);
         
    }
}

export default connectToTheDatabase;    