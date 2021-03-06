import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";

export const getUser = (uid) => {
  return (dispatch) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/user/${uid}`,
    })
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadPicture = (data, id) => {
  return (dispatch) => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/user/upload`,
      data,
    })
      .then(() => {
        return axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}/api/user/${id}`,
        })
          .then((res) => {
            dispatch({
              type: UPLOAD_PICTURE,
              payload: res.data.picture,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
};

export const updateBio = (id, bio) => {
  return (dispatch) => {
    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/api/user/${id}`,
      data: { bio },
    })
      .then(() => {
        dispatch({
          type: UPDATE_BIO,
          payload: bio,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const followUser = (followerId, idToFollow) => {
  return (dispatch) => {
    axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/api/user/follow/${followerId}`,
      data: { idToFollow },
    })
      .then(() => {
        dispatch({
          type: FOLLOW_USER,
          payload: { idToFollow },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const unFollowUser = (followerId, idToUnfollow) => {
  return (dispatch) => {
    axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/api/user/unfollow/${followerId}`,
      data: { idToUnfollow },
    })
      .then(() => {
        dispatch({
          type: UNFOLLOW_USER,
          payload: { idToUnfollow },
        });
      })
      .catch((err) => console.log(err));
  };
};
