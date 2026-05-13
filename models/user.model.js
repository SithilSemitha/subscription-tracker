import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String,
        required: [true, " User name in required "],
        trim: true,
        minLength: 2,
        maxLength: 40,
    },
    email: {
        type: String,
        required: [true, "User Email is Required "],
        trim: true,
        unique: true,
        lowercase: true,
        match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address" ]
    },
    password: {
        type: String,
        required: [true, "User Password is Required "],
        minLength: 6,
        maxLength: 128,
    }
}, {timestamps: true});


const User = mongoose.model("User", userSchema);
export default User;