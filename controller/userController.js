import {validationResult} from 'express-validator'
import {User} from '../models/User.js'
import gravatar from 'gravatar'
import bcryptjs from 'bcryptjs'


export const register = async(req,res) =>{
    // validation part
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }  

    const {name, email, password} = req.body

    try {
         //  See if user exists
         let user = await User.findOne({email})

         if(user){
            return res.status(400).json({errors: [{msg: "User already exists"}]})  // json is this way cause we want to send the same error as in validation part
         }


        // get users gravatar
        const avatar = gravatar.url(email,{
            size:'200',
            rating: 'pg',
            default: 'mm'
        })

        // creating a new user instance
        user = new User({
            name,
            email,
            password,
            avatar
        })


        // encrypt user password
        const salt = await bcryptjs.genSalt(10)

        user.password = await bcryptjs.hash(password, salt)

        // save user to database
        await user.save()

        // return jsonwebtoken
        
        res.send('User registered')

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error")  
    }
   

    
}