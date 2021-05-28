import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../../actions/user.actions";
import LeftNavbar from "../LeftNavbar";
import { dateParser } from "../Utils";
import UploadImg from "./UploadImg";

const UpdateProfil = () => {
  const userData = useSelector((state) => state.userReducer);
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.preventDefault();
    // Bug refresh page with bio = ""
    bio !== "" && dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  };

  return (
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
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
