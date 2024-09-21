import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getPost } from '../../redux/actions/postAction'
import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post = () => {
    const params = useParams()
    const dispatch = useDispatch()

    const { post, loading } = useSelector(state => state.post)

    useEffect(()=>{
        dispatch(getPost(params.postid))
    },[dispatch, params.postid])

  return loading || post === null ? (<Spinner/>) : (
    <Fragment>
        <Link to={'/posts'} className='btn btn-primary'>Go Back</Link>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        <div className="comments">
            {post.comments.map(comment => (
                <CommentItem key={comment._id} comment={comment} postId={post._id} />
            ))}
        </div>
    </Fragment>
  )
}

export default Post