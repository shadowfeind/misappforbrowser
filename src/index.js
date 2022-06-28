require("file-loader?name=[name].[ext]!./index.html");
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import { defineCustomElements } from "@ionic/pwa-elements/loader";

//for teacher
const data = {
  AccessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkMTMwZjZiZS0wNmI1LTQxNzYtOGQ2YS00ZDI2ZjljZDFjY2UiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTQwMDkiLCJJRFVzZXIiOiIxNDAwOSIsIklEUm9sZSI6IjUiLCJNYXJrQXNBZG1pbiI6IkZhbHNlIiwiSURIUkJyYW5jaCI6IjEiLCJJRERlcGFydG1lbnQiOiIxIiwiY29tcGFueSI6IjIiLCJJc1RlbXBvcmFyeVNlc3Npb25FbmFibGVkIjoiRmFsc2UiLCJJc05ld2x5QWRlZCI6IkZhbHNlIiwiSXNEZXBhcnRtZW50SGVhZCI6IkZhbHNlIiwiUmVtZW1iZXJNZSI6IkZhbHNlIiwiRnVsbE5hbWUiOiJKZW5uaWUgIENyaWdsZXIiLCJwaWRSZWZGb3JFZGl0IjoiY2xhc3NvbmUiLCJleHAiOjE2NTcxODE2NzAsImlzcyI6Imh0dHA6Ly9teXNpdGUuY29tIiwiYXVkIjoiaHR0cDovL215c2l0ZS5jb20ifQ.icSxfQSwo8hZQLdqCGNUKze4b4ZnlJc2N2lb41yUaM0",
  IDHRRole: "5",
  RefreshToken: "jnOnID3KyJxeU/iRaeIoTP9ebJm0nOPiVEtyT8DjEag=",
};

//for divine teacher
// const data = {
//   AccessToken:
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2NGNhZWVlYi0wOWQ2LTQwZDctYWI5NS0yNDVmNzcyNzIwN2YiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTUxNjAiLCJJRFVzZXIiOiIxNTE2MCIsIklEUm9sZSI6IjUiLCJNYXJrQXNBZG1pbiI6IkZhbHNlIiwiSURIUkJyYW5jaCI6IjEiLCJJRERlcGFydG1lbnQiOiIxIiwiY29tcGFueSI6IjIiLCJJc1RlbXBvcmFyeVNlc3Npb25FbmFibGVkIjoiRmFsc2UiLCJJc05ld2x5QWRlZCI6IkZhbHNlIiwiSXNEZXBhcnRtZW50SGVhZCI6IkZhbHNlIiwiUmVtZW1iZXJNZSI6IkZhbHNlIiwiRnVsbE5hbWUiOiJTdW5kYXIgQklLUkFNIEtBUktJIiwicGlkUmVmRm9yRWRpdCI6InN1bmRhciIsImV4cCI6MTY1NzE4MTIwOCwiaXNzIjoiaHR0cDovL215c2l0ZS5jb20iLCJhdWQiOiJodHRwOi8vbXlzaXRlLmNvbSJ9.f0Eqi3d1pca8IpKq369q0F_8FqDfloosQRezG5O_JGk",
//   IDHRRole: "5",
//   RefreshToken: "rTMkCUGR66eu9S4yM3gW3e1Hqk6MtJKIOdRZV0uJLJM=",
// };

// for student
// const data = {
//   AccessToken:
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0NGJlMTM5ZC01MmE1LTRjZTgtOTRhZS02YmIzOTcwMzE5OWYiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTUwNzAiLCJJRFVzZXIiOiIxNTA3MCIsIklEUm9sZSI6IjgiLCJNYXJrQXNBZG1pbiI6IkZhbHNlIiwiSURIUkJyYW5jaCI6IjEiLCJJRERlcGFydG1lbnQiOiIxIiwiY29tcGFueSI6IjIiLCJJc1RlbXBvcmFyeVNlc3Npb25FbmFibGVkIjoiRmFsc2UiLCJJc05ld2x5QWRlZCI6IkZhbHNlIiwiSXNEZXBhcnRtZW50SGVhZCI6IkZhbHNlIiwiUmVtZW1iZXJNZSI6IkZhbHNlIiwiRnVsbE5hbWUiOiJPcmFuZ2UgICBCYWxsIiwicGlkUmVmRm9yRWRpdCI6Ik8xMiIsImV4cCI6MTY1NTk3OTM1MCwiaXNzIjoiaHR0cDovL215c2l0ZS5jb20iLCJhdWQiOiJodHRwOi8vbXlzaXRlLmNvbSJ9.1C6ZkfaXcAW4ugzpJHeioDzm5dZE4kd-mjC-r3QRRgk",
//   IDHRRole: "8",
//   RefreshToken: "/lt2BGuN1bYql4HDY8dOyFCN574MMytXIbYxgUfCbFQ=",
// };
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
