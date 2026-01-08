import User from '../models/users.model.js';
import bcrypt from 'bcryptjs';
import {generateToken} from '../lib/utils.js';
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const {email, fullName, password} = req.body;
    try{
        if(!email || !fullName || !password) {
            return res.status(400).json({message: "Enter valid details, All fields required!"});
        }
        if(password.length < 5) {
            return res.status(400).json({message: "Password must be at least 5 characters"});
        }
        let user = await User.findOne({email});
        if(user) {
            return res.status(400).json({message:"User already exits with this email"});
        } 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname: fullName.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
        });

        if(newUser) {
            // generate jwt token here
            console.log(newUser._id);
            await newUser.save();
            generateToken(newUser._id,res);
            // res.status(200).json({message:"User Signin Successsfully"});
            res.status(201).json(
                {
                    _id: newUser._id,
                    fullname: newUser.fullname,
                    email: newUser.email,
                    profilePic: newUser.profilePic,
                }
            )
        }else {
            res.status(400).json({message: "Invalid user data"});
        }

    }catch(err){
        console.log(`Error in signup controller ${err.message}`);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({email:email.toLowerCase().trim()});

        if(!user) {
            return res.status(400).json({message: "User not Found, Signup First!"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            profilePic: user.profilePic,
        })
    }catch(err){
        console.log(`Error in login controller ${err.message}`);
        res.status(500).json({message: "Internal Server Error"});
    }
};
 
export const logout = (req, res) => {
    try{
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message: "Logged out successfully"});
    }catch(err){
        console.log(`Error in logout controller ${ err.message}`);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const updateProfile = async(req, res) => {
    try{
        const {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic) {
            return res.status(400).json({message: "Profile picture is required"});
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updateUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new:true});

        res.status(200).json(updateUser);

    }catch(err){
        console.log(`Error in update profile: ${err}`);
        res.status(500).json({message: "Internal server error"});
    }
};

export const checkAuth = (req, res) => {
    try{
        res.status(200).json(req.user);
    }catch(err) {
        console.log(`Error in checkAuth controller ${err.message}`);
        res.status(500).json({error: "Internal Server Error"});
    }
};