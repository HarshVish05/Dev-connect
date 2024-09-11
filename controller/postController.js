import {validationResult} from 'express-validator'
import { User } from '../models/User.js'
import { Posts } from '../models/Post.js'


export const createPost = async(req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const user = await User.findById(req.user.id).select('-password')

        const newPost = new Posts({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })

        await newPost.save()

        res.json(newPost)


    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error")
        
    }

}


export const getAllPosts = async(req, res) =>{
    try {

        const posts = await Posts.find().sort({ date: -1 })   // date -1 means sort but return recent one first

        res.json(posts)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error")
    }
}


export const getPostByID = async(req, res) =>{
    try {

        const post = await Posts.findById(req.params.post_id)
        if(!post){
            return res.status(404).send("No post found")
        }

        res.json(post)
        
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(404).send("No post found")
        }
        res.status(500).json("Server error")
    }
}


export const deletePost = async(req, res) =>{
    try {

        const post = await Posts.findById(req.params.post_id)

        if(!post){
            return res.status(404).send("No post found")
        }

        // check user
        if( post.user.toString() !== req.user.id ){
            res.status(401).json({ msg: "User not authorized" })

        }

        await post.deleteOne()

        res.json({ msg: "Post deleted" })
        
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(404).send("No post found")
        }
        res.status(500).json("Server error")
    }
}



export const likePost = async(req, res) => {
    try {

        const post = await Posts.findById(req.params.post_id)

        // check if the post has already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({ msg: 'Post already liked' })
        }
        
        post.likes.unshift({ user: req.user.id })

        await post.save()

        res.json(post.likes)
        
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(404).send("No post found")
        }
        res.status(500).json("Server error")
    }
}


export const unLikePost = async(req, res) => {
    try {

        const post = await Posts.findById(req.params.post_id)

        // check if the post has already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({ msg: 'Post is not liked' })
        }
        
        // Get remove index
        const removeIndex = post.likes.map(item => item.user).indexOf(req.user.id)

        post.likes.splice(removeIndex, 1)

        await post.save()

        res.json(post.likes)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error")
    }
}


export const addComment = async(req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const user = await User.findById(req.user.id).select('-password')
        const post = await Posts.findById(req.params.post_id)

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }

        post.comments.unshift(newComment)

        await post.save()

        res.json(post.comments)


    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error")
        
    }
}



export const deleteComment = async(req, res) => {
    try {

        const post = await Posts.findById(req.params.post_id)

        // Pull out comment from the post
        const comment = post.comments.find(cmt => cmt.id === req.params.cmt_id)

        // Make sure comment exists
        if(!comment){
            return res.status(400).json({ msg: 'There are no comments' })
        }

        // Make sure the user that deletes comment is the user who made the comment
        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({ msg: "User not authorized" })
        }

        // Get remove index
        const removeIndex = post.comments.map(item => item.user.toString()).indexOf(req.user.id)

        post.comments.splice(removeIndex, 1)

        await post.save()

        res.json(post.comments)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error")
    }
}