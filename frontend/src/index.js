import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.scss";

// Redux
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

// Reducer
import rootReducer from "./reducers";

// Redux DevTools
import { composeWithDevTools } from "redux-devtools-extension";
// import logger from "redux-logger";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
