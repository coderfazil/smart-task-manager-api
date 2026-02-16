const bcrypt = require('bcrypt');
const userModel = require("../models/User");


const registerUser = async (email, password,name) => {
    try{
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return {
                status: "false",
                message: "User already exists",
            }
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const registeredUser = await userModel.insertOne({
            email:email,
            password: hashPassword,
            name:name
        });
       if(!registeredUser) {
           return {
               success: false,
               message: 'User Not Registered',
           }
       }
           return {
               success:true,
               message: 'User registered successfully',
               user:{
                   id:registeredUser._id,
                   email:registeredUser.email,
                   name: registeredUser.name
               }
           }

    }catch(err){
        console.log("Error while registering user", err);
        return {
            success: false,
            message: err.message,
        }
    }


}

const loginUser = async (email,password)=>{

    try {
        const user = await userModel.findOne({
            email: email
        });
        if (!user) {
            return {
                success: false,
                message: 'User Not Registered',
            }
        }
        const isMatch = await bcrypt.compare(password, user?.password);
        if (!isMatch) {
            return {
                success: false,
                message: 'Incorrect password',
            }
        }
        return {
            success: true,
            message: 'User login successfully',
            user:{
                id: user._id,
                email: user.email,
                name:user.name
            }
        }
    }catch (err){
        console.log("Error while logining user", err);
        return {
            success: false,
            message: err.message,
        }
    }


}

module.exports = {
    registerUser,
    loginUser
};