import express from 'express'
import {authMiddleware} from '../../middleware/auth.js'
import { getAuthUser } from '../../controller/userController.js'

const router = express.Router()

//  @route     GET api/auth
//  @desc      Test route
//  @access    PUBLIC
router.get('/', authMiddleware, getAuthUser)




export default router
