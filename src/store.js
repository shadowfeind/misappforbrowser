import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducers } from "./combineReducers";

const userTokenFromStorage = localStorage.getItem("blueberryToken")
  ? JSON.parse(localStorage.getItem("blueberryToken"))
  : null;

const initialState = {
  userLogin: { userInfo: userTokenFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
