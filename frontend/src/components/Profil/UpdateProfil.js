import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/posts.actions";
// import { getPosts } from "../../actions/posts.actions";
import { updateBio } from "../../actions/user.actions";
import LeftNavbar from "../LeftNavbar";
import { dateParser, isEmpty } from "../Utils";
import FollowHandler from "./FollowHandler";
import UploadImg from "./UploadImg";

const UpdateProfil = () => {
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const usersPost = useSelector((state) => state.postsReducer);

  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followerPopup, setFollowerPopup] = useState(false);
  const [uploadUserPost, setUploadUserPost] = useState();
  const [userPosts, setUserPosts] = useState(false);
  const [loadPost, setLoadPost] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.preventDefault();
    // Bug refresh page with bio = ""
    bio !== "" && dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  };

  useEffect(() => {
    const userPost = [];

    if (!isEmpty(usersPost[0])) {
      usersPost.map((post) => {
        if (post.posterId === userData._id) {
          userPost.push(post);
          console.log(userPost);
          return setUploadUserPost(userPost);
        }
        return null;
      });
    }

    if (loadPost) {
      dispatch(getPosts());
      setLoadPost(false);
    }

    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [userData._id, usersPost, loadPost, dispatch, usersData]);

  return (
    <main>
      <div className="profil-container">
        <LeftNavbar />
        <h1>{userData.pseudo}</h1>
        <div className="update-container">
          <div className="left-part">
            <h3>Photo de profil</h3>
            <img src={userData.picture} alt="user-pict" />
            <UploadImg />
          </div>
          <div className="middle-part">
            <h3>Bio</h3>
            {updateForm !== false ? (
              <>
                <textarea
                  type="text"
                  maxLength="200"
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <br />
                <button className="save-bio" onClick={handleUpdate}>
                  Confirmer
                </button>
              </>
            ) : (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier bio
                </button>
              </>
            )}
          </div>
          <div className="right-part">
            <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
            <button onClick={() => setFollowerPopup(true)}>
              Abonné
              <br />
              {userData.followers ? userData.followers.length : "0"}
            </button>
            <button onClick={() => setFollowingPopup(true)}>
              Abonnement
              <br />
              {userData.following ? userData.following.length : "0"}
            </button>
            <button onClick={() => setUserPosts(true)}>
              Post
              <br />
              {uploadUserPost ? uploadUserPost.length : "0"}
            </button>
          </div>
        </div>
        {followingPopup && (
          <div className="popup-profil-container">
            <div className="modal">
              <h3>Abonnement</h3>
              <span className="cross" onClick={() => setFollowingPopup(false)}>
                &#10005;
              </span>
              <ul>
                {usersData.map((user) => {
                  for (let i = 0; i < userData.following.length; i++) {
                    if (user._id === userData.following[i]) {
                      return (
                        <li key={user._id}>
                          <img src={user.picture} alt="user-pic" />
                          <h4>{user.pseudo}</h4>
                          <div className="follow-handler">
                            <FollowHandler idToFollow={user._id} />
                          </div>
                        </li>
                      );
                    }
                  }
                  return null;
                })}
              </ul>
            </div>
          </div>
        )}
        {followerPopup && (
          <div className="popup-profil-container">
            <div className="modal">
              <h3>Abonné</h3>
              <span className="cross" onClick={() => setFollowerPopup(false)}>
                &#10005;
              </span>
              <ul>
                {usersData.map((user) => {
                  for (let i = 0; i < userData.followers.length; i++) {
                    if (user._id === userData.followers[i]) {
                      return (
                        <li>
                          <img src={user.picture} alt="user-pic" />
                          <h4>{user.pseudo}</h4>
                          <div className="follow-handler">
                            <FollowHandler idToFollow={user._id} />
                          </div>
                        </li>
                      );
                    }
                  }
                  return null;
                })}
              </ul>
            </div>
          </div>
        )}
        {userPosts && (
          <div className="post-container">
            <h2>Posts</h2>
            <span className="cross" onClick={() => setUserPosts(false)}>
              &#10005;
            </span>
            <div className="card-user-container">
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <>
                  {uploadUserPost.map((post) => {
                    for (let i = 0; i < uploadUserPost.length; i++) {
                      return (
                        <div className="card-user" key={post._id}>
                          <h3>{post.message}</h3>
                        </div>
                      );
                    }
                    return null;
                  })}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default UpdateProfil;
