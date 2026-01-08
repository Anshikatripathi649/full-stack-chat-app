import {Schema, model} from "mongoose";

const messageSchema = new Schema({
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User", // References the User model
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User", // References the User model
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String, // URL to the image (from Cloudinary)
    },
  },
  { timestamps: true } // Automatically creates 'createdAt' and 'updatedAt'
);

const Message = new model("Message", messageSchema);

export default Message;