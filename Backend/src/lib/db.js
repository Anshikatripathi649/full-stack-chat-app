import mongoose from 'mongoose';

export const connectedDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_ATLAS);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(err){
        console.log(`MongoDB connection error: ${err}`);
    };
};