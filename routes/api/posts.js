import express from 'express'
import { authMiddleware } from '../../middleware/auth.js'
import { addComment, createPost, deleteComment, deletePost, getAllPosts, getPostByID, likePost, unLikePost } from '../../controller/postController.js'
import {check} from 'express-validator'

const router = express.Router()

//  @route     Post api/posts/create
//  @desc      create post
//  @access    Private
router.post('/create', [authMiddleware, [
    check('text', 'Text is required').not().isEmpty(),
]], createPost)


//  @route     GET api/posts
//  @desc      get all posts
//  @access    Private
router.get('/', authMiddleware, getAllPosts)


//  @route     GET api/posts/:post_id
//  @desc      get a post
//  @access    Private
router.get('/:post_id', authMiddleware, getPostByID)


//  @route     DELETE api/posts/delete/:post_id
//  @desc      delete a post
//  @access    Private
router.delete('/delete/:post_id', authMiddleware, deletePost)

//  @route     PUT api/posts/like/:post_id
//  @desc      Like a post
//  @access    Private
router.put('/like/:post_id', authMiddleware, likePost)

//  @route     PUT api/posts/unlike/:post_id
//  @desc      Like a post
//  @access    Private
router.put('/unlike/:post_id', authMiddleware, unLikePost)


//  @route     Post api/posts/comment/:post_id
//  @desc      Add comments
//  @access    Private
router.post('/comment/:post_id', [authMiddleware, [
    check('text', 'Text is required').not().isEmpty(),
]], addComment)


//  @route     DELETE api/posts/deletecomment/:post_id/:cmt_id
//  @desc      delete comments
//  @access    Private
router.delete('/deletecomment/:post_id/:cmt_id', authMiddleware, deleteComment)

export default router
