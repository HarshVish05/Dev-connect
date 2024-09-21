import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../../redux/actions/postAction'

const CommentForm = ({postId}) => {
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

  return (
    <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave a comment</h3>
        </div>
    <form className="form my-1" onSubmit={e => {
        e.preventDefault()
        dispatch(addComment({text: comment}, postId))
        setComment('')
    }}>
      <textarea
        name="text"
        cols="30"
        rows="5"
        placeholder="Write Comment"
        required
        value={comment}
        onChange={(e)=> setComment(e.target.value)}
      ></textarea>
      <input type="submit" className="btn btn-dark my-1" value="Submit" />
    </form>
  </div>
  )
}

export default CommentForm