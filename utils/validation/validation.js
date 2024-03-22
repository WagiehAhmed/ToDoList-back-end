const joi = require("joi");

const userSchema = joi.object({
    email:joi.string().email({tlds:{allow:false}}).required().min(5),
    password:joi.string().required().min(5),
}); 

const taskSchema = joi.object({
    title:joi.string().empty().required(),
    content:joi.string().empty().required(),
    userId:joi.object().required(),
}); 

module.exports = {
    userSchema,
    taskSchema
}