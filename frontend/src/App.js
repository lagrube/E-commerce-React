import React, { useEffect, useState } from "react";
import Routes from "./components/Routes/index";
import { UidContext } from "./components/AppContext";
import axios from "axios";
// Redux
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

const App = () => {
  const dispatch = useDispatch();
  const [uid, setUid] = useState();

  useEffect(() => {
    // CheckToken
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/jwtid`,
        withCredentials: true,
      })
        .then((res) => setUid(res.data))
        .catch((err) => console.log("No token"));
    };
    fetchToken();

    // Redux
    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
