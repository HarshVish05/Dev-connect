import React, { Fragment } from "react";
import { FaThumbsDown, FaThumbsUp, FaTimes } from "react-icons/fa";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addLike,
  deletePost,
  removeLike,
} from "../../redux/actions/postAction";

const PostItem = ({
  post: { _id, likes, comments, date, name, text, avatar, user },
  showActions = true,
}) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <Fragment>
      <div className="posts">
        <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img className="round-img" src={avatar} alt="" />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">{text}</p>
            <p className="post-date">
              Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
            </p>

            {showActions && (
              <Fragment>
                <button
                  type="button"
                  onClick={() => dispatch(addLike(_id))}
                  className="btn btn-light"
                >
                  <i className="fas fa-thumbs-up">
                    <FaThumbsUp />
                  </i>
                  {likes.length > 0 && <span> {likes.length}</span>}
                </button>
                <button
                  type="button"
                  onClick={() => dispatch(removeLike(_id))}
                  className="btn btn-light"
                >
                  <i className="fas fa-thumbs-down">
                    <FaThumbsDown />
                  </i>
                </button>
                <Link to={`/posts/${_id}`} className="btn btn-primary">
                  Discussion{" "}
                  {comments.length > 0 && (
                    <span className="comment-count">{comments.length}</span>
                  )}
                </Link>

                {!auth.loading && user === auth.user._id && (
                  <button
                    onClick={() => dispatch(deletePost(_id))}
                    type="button"
                    className="btn btn-danger"
                  >
                    <i className="fas fa-times">
                      <FaTimes />
                    </i>
                  </button>
                )}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PostItem;
