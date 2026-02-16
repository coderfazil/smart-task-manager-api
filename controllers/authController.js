const authServices = require('../services/authServices');
const {generateToken} = require("../utils/jwt");
const isProd = process.env.NODE_ENV === "production";
const registerUser = async (req,res,next)=>{
    const {email, password,name} = req.body;
    const response = await authServices.registerUser(email, password,name);
     if(response?.success){
      const accessToken = await generateToken(response.user);
      res.cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: isProd,
          sameSite: isProd ? "none" : "lax",
          maxAge: 24 * 60 * 60 * 1000,
      });

  }
    return res.status(response?.success? 200 : 401).json(
        {
            success:response?.success,
            message:response?.message,
            user:response?.user ? response?.user  : null,
        }
    );

}

const loginUser = async (req,res,next)=>{
    const {email, password} = req.body;
    const response = await authServices.loginUser(email, password);
    if(response?.success){
        const accessToken = await generateToken(response.user);
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

    }
    return res.status(response?.success? 200 : 401).json(
        {
            success:response?.success,
            message:response?.message,
            user:response?.user ? response?.user  : null,
        }
    );
}
const getUser = async (req,res,next)=>{
    return res.status(200).json({
        success:true,
        message:"user authenticated",
        user:req.user

    })
}

const logoutUser = async (req,res,next)=>{
    res.clearCookie('accessToken');
    return res.status(200).json({
        success:true,
        message:'User logged out'
    })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
};