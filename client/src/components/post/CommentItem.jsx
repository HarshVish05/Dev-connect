import React from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteComment } from "../../redux/actions/postAction";
import { FaTimes } from "react-icons/fa";

const CommentItem = ({
  comment: { _id, text, name, user, avatar, date },
  postId,
}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return (
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

        {!auth.loading && user === auth.user._id && (
          <button
            onClick={(e) => dispatch(deleteComment(_id, postId))}
            className="btn btn-danger"
          >
            <FaTimes /> Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
