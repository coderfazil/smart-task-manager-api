const {verifyToken} = require('../utils/jwt')

const authMiddleware =async (req, res, next) => {
    const token = req.cookies.accessToken;

    if(!token){
      return res.status(401).json({
          success: false,
          message: 'Unauthorized'
      })
    }

        const decode = await verifyToken(token);
    if(!decode){
      return res.status(401).json({
          success: false,
          message: 'Authentication Failed'
      })
    }
    req.user = decode;
    next();
}

module.exports = {
    authMiddleware
};