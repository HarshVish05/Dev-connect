import express from 'express'
import {login, register} from '../../controller/userController.js'
import {check} from 'express-validator'
import { authMiddleware } from '../../middleware/auth.js'

const router = express.Router()

//  @route     POST api/users/register
//  @desc      register users
//  @access    PUBLIC
router.post('/register', [                         // middle part acts as a middleware where we validate the body
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Enter a valid email address').isEmail(),
    check('password', "Password must be of length 6 or more").isLength({min:6})
], register)


router.post('/login', [
    check('email', 'Enter a valid email address').isEmail(),
    check('password', "Password is required").exists()
], login)


export default router
