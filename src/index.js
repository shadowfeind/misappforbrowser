require("file-loader?name=[name].[ext]!./index.html");
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import { defineCustomElements } from "@ionic/pwa-elements/loader";

// const data = {
//   $id: "1",
//   AccessToken:
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyYjgxZGJjMi1kMTYzLTQ3YmMtYTg2ZS01MWM5OTEyOGE2NzIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTUwNjciLCJJRFVzZXIiOiIxNTA2NyIsIklEUm9sZSI6IjgiLCJNYXJrQXNBZG1pbiI6IkZhbHNlIiwiSURIUkJyYW5jaCI6IjEiLCJJRERlcGFydG1lbnQiOiIxIiwiY29tcGFueSI6IjIiLCJJc1RlbXBvcmFyeVNlc3Npb25FbmFibGVkIjoiRmFsc2UiLCJJc05ld2x5QWRlZCI6IkZhbHNlIiwiSXNEZXBhcnRtZW50SGVhZCI6IkZhbHNlIiwiUmVtZW1iZXJNZSI6IkZhbHNlIiwiRnVsbE5hbWUiOiJsNCAgbDQiLCJwaWRSZWZGb3JFZGl0IjoiTDQiLCJleHAiOjE2NTI1OTUzMTcsImlzcyI6Imh0dHA6Ly9teXNpdGUuY29tIiwiYXVkIjoiaHR0cDovL215c2l0ZS5jb20ifQ.ahuz2sCPtPXq90fwAS9ANmKrnFfC6y3-pMf0ivvoHno",
//   RefreshToken: "52y30/wJHPe8e0zTyPVOvLZVLVhK3sCUlPdzORKNEDg=",
//   IDHRRole: 8,
// };
// localStorage.setItem("blueberryToken", JSON.stringify(data));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("app")
);
defineCustomElements(window);
