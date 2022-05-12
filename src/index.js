require("file-loader?name=[name].[ext]!./index.html");
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import { defineCustomElements } from "@ionic/pwa-elements/loader";

const data = {
  $id: "1",
  AccessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ZmNjMWIwYi1iN2Q3LTRkZDItOTk3Zi04OTQ3NjMyZmE2ZDQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTUwNzAiLCJJRFVzZXIiOiIxNTA3MCIsIklEUm9sZSI6IjgiLCJNYXJrQXNBZG1pbiI6IkZhbHNlIiwiSURIUkJyYW5jaCI6IjEiLCJJRERlcGFydG1lbnQiOiIxIiwiY29tcGFueSI6IjIiLCJJc1RlbXBvcmFyeVNlc3Npb25FbmFibGVkIjoiRmFsc2UiLCJJc05ld2x5QWRlZCI6IkZhbHNlIiwiSXNEZXBhcnRtZW50SGVhZCI6IkZhbHNlIiwiUmVtZW1iZXJNZSI6IkZhbHNlIiwiRnVsbE5hbWUiOiJPcmFuZ2UgICBCYWxsIiwicGlkUmVmRm9yRWRpdCI6Ik8xMiIsImV4cCI6MTY1MzE5OTEwMSwiaXNzIjoiaHR0cDovL215c2l0ZS5jb20iLCJhdWQiOiJodHRwOi8vbXlzaXRlLmNvbSJ9.rzX6HXt5B0aIKousvu113pDIJHTZ7nUpf5OIQL-vdP0",
  RefreshToken: "3sKV0Ot0075qxHsJgb75KCneaWWjMQn1SMpPBx8QMkQ=",
  IDHRRole: 8,
};
localStorage.setItem("blueberryToken", JSON.stringify(data));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("app")
);
defineCustomElements(window);
