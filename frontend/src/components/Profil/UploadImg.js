import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
  const [file, setFile] = useState();
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("name", userData.pseudo);
    data.append("userId", userData._id);

    dispatch(uploadPicture(data, userData._id));
  };

  // !Show file
  useEffect(() => {
    const show = () => {
      if (file !== undefined) {
        setVisible(true);
        console.log(file);
      } else setVisible(false);
    };
    show();
  }, [file]);

  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="file" className={file ? "translate-input" : ""}>
        Changer d'image
      </label>
      <input
        type="file"
        name="file"
        id="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      {file && <p className="file-name">{file.name}</p>}
      <input
        className={visible ? "visible" : "invisible"}
        type="submit"
        value="Enregistrer"
      />
    </form>
  );
};

export default UploadImg;
