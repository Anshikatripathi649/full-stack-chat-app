import {Schema, model} from 'mongoose';

const UserSchema = new Schema( {
    email: {
        type:String,
        required:true,
        unique:true,
    },
    fullname:{
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
        minlength:5,
    },
    profilePic: {
        type: String,
        default:"",
        
    },
},
{timestamps: true}
);

const User = new model("User",UserSchema);

export default User;