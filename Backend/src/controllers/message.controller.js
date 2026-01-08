import User from '../models/users.model.js';
import Message from  '../models/message.model.js';
import cloudinary from '../lib/cloudinary.js';
import { getReceiverSocketId, io } from '../lib/socket.js';

export const getUserForSidebar = async (req, res) => {
    try{
        const loggedInUserID = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserID}}).select("-password");

        res.status(200).json(filteredUsers);
    }catch(err){
        console.log(`Error in getUsersForSidebar: ${err.message}`);
        res.status(500).json({error: "Internal server error"})
    }
};

export const getMessages =  async(req, res) => {

    try{
        // other person
        const {id: userToChatId} = req.params;
        // you user
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId: myId, receiverId: userToChatId},
                {senderId:userToChatId, receiverId: myId}
            ]   
        });

        res.status(200).json(messages);

    }catch(err){
        console.log(`Error in getMessages controller: ${err.message}`);
        res.status(500).json({error: "Internal server error"});
    }
};

export const sendMessage = async (req, res) => {
    try{
        const {text, image} = req.body;
        const{ id: receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image) {
            // Upload base64 image tp cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId, 
            text,
            image: imageUrl,
        });

        await newMessage.save();

        // todo : realtime functionality goes here => socket.io
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(200).json(newMessage);
    }catch(err){
        console.log(`Error in sendMessage controller: ${err.message}`);
        res.status(500).json({error: "Internal Server error"});
    }
};