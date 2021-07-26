import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/posts.actions";
import { UidContext } from "../AppContext";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post._id, uid));
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikePost(post._id, uid));
    setLiked(false);
  };

  useEffect(() => {
    if (post.likers.includes(uid)) {
      setLiked(true);
    } else setLiked(false);
  }, [uid, post.likers]);

  return (
    <div className="like-container">
      {uid && liked === false && (
        <img src="./img/icons/heart.svg" onClick={like} alt="liked" />
      )}
      {uid && liked && (
        <img
          src="./img/icons/heart-filled.svg"
          onClick={unlike}
          alt="unliked"
        />
      )}
    </div>
  );
};

export default LikeButton;
