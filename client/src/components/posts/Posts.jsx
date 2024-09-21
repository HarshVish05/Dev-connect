import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../redux/actions/postAction'
import Spinner from '../layout/Spinner'
import { FaUser } from 'react-icons/fa'
import PostItem from './PostItem'
import PostForm from './PostForm'

const Posts = () => {
    const dispatch = useDispatch()
    const {posts, loading} = useSelector(state => state.post)

    useEffect(()=>{
        dispatch(getPosts())
    },[dispatch])

  return loading ? <Spinner /> : (
            <Fragment>
                <h1 className="large text-primary">Posts</h1>
                <p className='lead'><FaUser/> Welcome to the community</p>
                {/* Post form */}
                <PostForm />

                <div className="posts">
                    {posts.map(post =>(
                        <PostItem key={post._id} post={post} />
                    ))}
                </div>
            </Fragment>
        )

}

export default Posts