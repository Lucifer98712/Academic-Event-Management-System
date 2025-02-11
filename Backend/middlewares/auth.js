const jwt=require("jsonwebtoken");

const auth=(req,res,next)=>{
    const authorizationHeader=req.headers.authorization;
    if(!authorizationHeader){
        res.status(401).json({
          status:"failed",
          message:"Authorization failed; User must be logged in!"
        });
        return;
    }
    //checking authorization header
    const token = authorizationHeader.split("Bearer ")[1];
    try{
      const checkToken = jwt.verify(token,process.env.jwt_salt);
      req.user=checkToken;
      next();
    }catch(e){
      res.status(401).json({
        status:"failed",
        message:"Authorization failed! Invalid token"
      });
    }
    
};
const roleAuth = (roles) => {
  return (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      res.status(401).json({
        status: "failed",
        message: "Authorization failed; User must be logged in!"
      });
      return;
    }
    const token = authorizationHeader.split("Bearer ")[1];
    try {
      const checkToken = jwt.verify(token, process.env.jwt_salt);
      if (!roles.includes(checkToken.role)) {
        return res.status(403).json({
          status: "failed",
          message: "Access denied"
        });
      }
      req.user = checkToken;
      next();
    } catch (e) {
      res.status(401).json({
        status: "failed",
        message: "Authorization failed! Invalid token"
      });
      
    }
    
  };
};



module.exports={auth,roleAuth};