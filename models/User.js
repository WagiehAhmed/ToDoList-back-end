const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true,
        min:5
    },
    password:{
        type:String,
        require:true,
        min:5
    }
},{timestamps:true})

userSchema.methods.generateToken = function(){
    return jwt.sign( {_id : this._id}, process.env.SECRET_KEY);
}

module.exports = mongoose.model("users",userSchema);