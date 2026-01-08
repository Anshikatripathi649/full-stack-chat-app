import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:"7d"
    });
    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*1000,
        // prevent XSS attackes cross-site-scripting attacks
        httpOnly:true,
        // CSRF attacks cross request forgery attacks
        sameSite: "lax",
        secure: process.env.NODE_ENV !== "development", // only true in production
    });
    return token;
};