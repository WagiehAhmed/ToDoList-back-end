const { userSchema } = require("../utils/validation/validation");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  //check user data
  const { error } = userSchema.validate({ ...req.body });
  if (!error) {
    try {
      // check if user registered before or not
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        throw Error("This email does not exists, please signup.");
      }
      let same = await bcrypt.compare(req.body.password, user.password);
      if (!same) {
        throw Error("Invalid email or password.");
      }
      const token = user.generateToken();
      return res
        .status(201)
        .json({ message: "Welcome.", token, email: user.email });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    return res.status(400).json({ message: "Invalid email or password." });
  }
};

const signup = async (req, res) => {
  //check user data
  const { error } = userSchema.validate({ ...req.body });
  if (!error) {
    try {
      // check if user registered before or not
      var user = await User.findOne({ email: req.body.email });
      if (!user) {
        let { email, password } = req.body;
        // hashing password
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        // create new user and save it to the database
        user = new User({ email, password });
        user = await user.save();
        if (user) {
          return res.status(201).json({ message: "Registered successfully." });
        }
      } else {
        throw Error("this user is already registered");
      }
    } catch (error) {
      return res.status(400).json({ message: error.message});
    }
  } else {
    return res.status(400).json({ message: error.details[0].message });
  }
};

module.exports = {
  login,
  signup,
};
