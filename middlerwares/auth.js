const jwt = require("jsonwebtoken");
const User = require("../models/User");


const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    const token = req.headers.authorization.split(" ")[1];
    let user;
    try{
      const { _id } = jwt.verify(token, process.env.SECRET_KEY);
      user = await User.findById(_id).select("_id");
    }catch(error){
      console.log("auth : ",error.message)
      res.status(400).json({ message: error.message });
    }
    if(user){
      req.userId = user._id;
      next();
    }else{
      res.status(400).json({ message: "Invalid Token." });
    }
  } else {
    res.status(400).json({ message: "Token does not exist." });
  }
};

module.exports = auth;
