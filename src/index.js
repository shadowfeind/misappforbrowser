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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhZGJjNjU5MC1jNTMwLTRlMjUtYWJiZi0xOTI4NGEyNzlkZjAiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTUwNzAiLCJJRFVzZXIiOiIxNTA3MCIsIklEUm9sZSI6IjgiLCJNYXJrQXNBZG1pbiI6IkZhbHNlIiwiSURIUkJyYW5jaCI6IjEiLCJJRERlcGFydG1lbnQiOiIxIiwiY29tcGFueSI6IjIiLCJJc1RlbXBvcmFyeVNlc3Npb25FbmFibGVkIjoiRmFsc2UiLCJJc05ld2x5QWRlZCI6IkZhbHNlIiwiSXNEZXBhcnRtZW50SGVhZCI6IkZhbHNlIiwiUmVtZW1iZXJNZSI6IkZhbHNlIiwiRnVsbE5hbWUiOiJPcmFuZ2UgICBCYWxsIiwicGlkUmVmRm9yRWRpdCI6Ik8xMiIsImV4cCI6MTY1Mjk1ODAyOCwiaXNzIjoiaHR0cDovL215c2l0ZS5jb20iLCJhdWQiOiJodHRwOi8vbXlzaXRlLmNvbSJ9.FIQX7kFYGyMuv6pICqKI2T4QPL3puTc9gwv_mJnKors",
  RefreshToken: "4wUrUW+tB4ecwezkVD+ovmE74RacDH+38hlz2oN+gvg=",
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
