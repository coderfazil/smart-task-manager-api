const jwt = require("jsonwebtoken");

async function generateToken(payload){
    try{
        return await jwt.sign(payload, process.env.JWT_SECRET_KEY,{
            expiresIn: process.env.JWT_EXPIRES,
        });
    }catch(err){
        console.error("error while creating token",err);

    }


}
async function verifyToken(token){
    try{
        return await jwt.verify(token, process.env.JWT_SECRET_KEY);
    }catch(err){
        console.error("error while verifying token",err);
    }

}
module.exports = {
    generateToken,
    verifyToken
}