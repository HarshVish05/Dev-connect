import axios from "axios";
import {  ADD_COMMENT, ADD_POST, DELETE_POST, GET_POST, GET_POSTS, POST_ERROR, REMOVE_COMMENT, UPDATE_LIKES } from "../constants";
import { setAlert } from "./alertAction";

// Get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts')

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload:{
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}


// Add like
export const addLike = (postId) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${postId}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: {postId, likes:res.data}
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload:{
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

// Remove like
export const removeLike = (postId) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: {postId, likes:res.data}
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload:{
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

// Delete Post
export const deletePost = (postId) => async dispatch => {
    try {
        await axios.delete(`/api/posts/delete/${postId}`)

        dispatch({
            type: DELETE_POST,
            payload: { postId }
        })

        dispatch(setAlert('Post Removed', 'success'))

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload:{
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}


// ADD Post
export const addPost = (formData) => async dispatch => {
    try {
        const res = await axios.post(`/api/posts/create`, formData)

        dispatch({
            type: ADD_POST,
            payload: res.data
        })

        dispatch(setAlert('Post Created', 'success'))

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload:{
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

// Get post
export const getPost = (postId) => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${postId}`)

        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload:{
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}


// ADD Comment
export const addComment = (formData, postId) => async dispatch => {
    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, formData)

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })

        dispatch(setAlert('Comment Added', 'success'))

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload:{
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}


// Delete Comment
export const deleteComment = (commentId, postId) => async dispatch => {
    try {
        await axios.delete(`/api/posts/deletecomment/${postId}/${commentId}`)

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        })

        dispatch(setAlert('Comment Removed', 'success'))

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload:{
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

