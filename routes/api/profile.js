import express from 'express'
import { authMiddleware } from '../../middleware/auth.js'
import { addEducation, addExperience, createAndUpdateProfile, deleteEducation, deleteExperience, deleteProfile, getAllProfiles, getGitHub, getMyProfile, getProfileByUserId } from '../../controller/profileController.js'
import { check } from 'express-validator'

const router = express.Router()

//  @route     GET api/profile/me
//  @desc      get current users profile
//  @access    PRIVATE
router.get('/me', authMiddleware, getMyProfile)

//  @route     POST api/profile
//  @desc      Create or update users profile
//  @access    PRIVATE
router.post('/', [authMiddleware, [                      
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
]],
createAndUpdateProfile)

//  @route     GET api/profile
//  @desc      Get all profiles
//  @access    Public
router.get('/getallprofile', getAllProfiles)

//  @route     GET api/profile/user/:user_id
//  @desc      Get profile by user_id
//  @access    Public
router.get('/user/:user_id', getProfileByUserId)


//  @route     DEL api/profile/deleteuser/
//  @desc      delete profile,user and posts
//  @access    Private
router.delete('/deleteuser', authMiddleware, deleteProfile)

//  @route     PUT api/profile/experience
//  @desc      Add profile experience
//  @access    Private
router.put('/experience', [authMiddleware, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),
]], addExperience)

//  @route     Delete api/profile/experience/:exp_id
//  @desc      delete profile experience
//  @access    Private
router.delete('/experience/:exp_id', authMiddleware, deleteExperience)

//  @route     PUT api/profile/education
//  @desc      Add profile education
//  @access    Private
router.put('/education', [authMiddleware, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of Study is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),
]], addEducation)

//  @route     Delete api/profile/education/:edu_id
//  @desc      delete profile education
//  @access    Private
router.delete('/education/:edu_id', authMiddleware, deleteEducation)

//  @route     GET api/profile/github/:username
//  @desc      getting the github repos
//  @access    PUBLIC
router.get('/github/:username', getGitHub)




export default router
