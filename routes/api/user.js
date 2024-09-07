import express from 'express'
import {register} from '../../controller/userController.js'
import {check, validationResult} from 'express-validator'

const router = express.Router()

//  @route     POST api/users
//  @desc      register users
//  @access    PUBLIC
router.post('/register', [                         // middle part acts as a middleware where we validate the body
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Enter a valid email address').isEmail(),
    check('password', "Password must be of length 6 or more").isLength({min:6})
], register)


export default router
