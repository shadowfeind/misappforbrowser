import jwt_decode from "jwt-decode";
import axios from "axios";
import moment from "moment";

export const API_URL = "https://vidyacube.com";

export const tokenConfig = () => {
  const user = JSON.parse(localStorage.getItem("blueberryToken"));

  if (user && user.AccessToken) {
    const userSessionCheck = jwt_decode(user.AccessToken);
    const isExpired = userSessionCheck.exp - moment().unix() < 1;
    console.log(userSessionCheck.exp);
    console.log(moment.unix(userSessionCheck.exp));
    console.log(moment().unix());
    console.log(isExpired);
    if (isExpired) {
      localStorage.removeItem("blueberryToken");
      window.location.href = "https://vidyacube.com/";
      return;
    }

    const tokenReturn = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.AccessToken}`,
      },
    };
    return tokenReturn;
  } else {
    window.location.href = "https://vidyacube.com/";
    return {};
  }
};

const userSession = JSON.parse(localStorage.getItem("blueberryToken"));

// export const axiosInstance = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${userSession.AccessToken}`,
//   },
// });

// axiosInstance.interceptors.request.use(async (req) => {
//   console.log(userSession);
//   const user = jwt_decode(userSession.AccessToken);
//   const isExpired = user.exp - moment().unix() < 1;
//   console.log(user.exp);
//   console.log(moment.unix(user.exp));
//   console.log(moment().unix());
//   console.log(isExpired);

//   if (!isExpired) return req;

//   const dataForRefreshToken = {
//     AccessToken: userSession.AccessToken,
//     RefreshToken: userSession.RefreshToken,
//   };

//   const JSONdata = JSON.stringify(dataForRefreshToken);
//   const config = { headers: { "Content-Type": "application/json" } };

//   console.log(JSONdata);

//   try {
//     const { data } = await axios.post(
//       "http://vidyacube.com/api/RefreshTokenGenerator/RefreshToken",
//       JSONdata,
//       config
//     );
//     console.log(data);

//     localStorage.setItem("blueberryToken", JSON.stringify(data));
//     req.headers.Authorization = `Bearer ${data.AccessToken}`;
//   } catch (error) {
//     console.log(
//       error.response.data.Message ? error.response.data.Message : error.message
//     );
//   }

//   return req;
// });
