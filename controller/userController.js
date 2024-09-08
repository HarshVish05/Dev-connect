import { validationResult } from "express-validator";
import { User } from "../models/User.js";
import gravatar from "gravatar";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  // validation part
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    //  See if user exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] }); // json is this way cause we want to send the same error as in validation part
    }

    // get users gravatar
    const avatar = gravatar.url(email, {
      size: "200",
      rating: "pg",
      default: "mm",
    });

    // creating a new user instance
    user = new User({
      name,
      email,
      password,
      avatar,
    });

    // encrypt user password
    const salt = await bcryptjs.genSalt(10);

    user.password = await bcryptjs.hash(password, salt);

    // save user to database
    await user.save();

    // return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, 
        process.env.JWT_SECRET, 
        { expiresIn: 360000 }, 
        (err,token)=>{
            if(err) throw err
            res.json({token})
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
};



export const getAuthUser = async(req, res) =>{
    try {

        const user = await User.findById(req.user.id).select('-password') // -password will not return the password
        res.json({user})
        
    } catch (error) {
        console.error(error.message);
        
        res.status(500).send( "Server error")
    }
}


export const login = async(req, res) => {
    // validation part
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    //  See if user exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] }); // json is this way cause we want to send the same error as in validation part
    }

    // checking for password
    const isMatch = await bcryptjs.compare(password, user.password)

    if(!isMatch){
        return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    // return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, 
        process.env.JWT_SECRET, 
        { expiresIn: 360000 }, 
        (err,token)=>{
            if(err) throw err
            res.json({token})
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
}
