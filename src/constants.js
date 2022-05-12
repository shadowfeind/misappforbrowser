import jwt_decode from "jwt-decode";
import axios from "axios";
import moment from "moment";

export const API_URL = "https://mis.vidyacube.com";

//for fcm token
export const tokenHeader = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `key=AAAACB9i9IE:APA91bEuqomtN9gss5UOVzngtIofWkWo9tUWAZ_2LYBNeKbuZXXns-S6NuBWEgYCnQj8gsI6YbvlbxKIByeYvHjgf2U-GjTTPCB44_K6yjcPhvDHqQD5WaUCshNEDzAuz3r91MeBJe3D`,
  },
};

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
      // localStorage.removeItem("blueberryToken");
      // window.location.href = "https://mis.vidyacube.com/";
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
    // window.location.href = "https://mis.vidyacube.com/";
    return {};
  }
};

const userSession = JSON.parse(localStorage.getItem("blueberryToken"));

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userSession.AccessToken}`,
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  console.log(userSession);
  if (!userSession) {
    document.location.href = "/#/login/5";
    return;
  }
  const user = jwt_decode(userSession.AccessToken);
  const isExpired = user.exp - moment().unix() < 1;
  console.log(user.exp);
  console.log(moment.unix(user.exp));
  console.log(moment().unix());
  console.log("isExpired", isExpired);

  if (!isExpired) return req;

  const dataForRefreshToken = {
    AccessToken: userSession.AccessToken,
    RefreshToken: userSession.RefreshToken,
    IDHRRole: userSession.IDHRRole,
  };

  const JSONdata = JSON.stringify(dataForRefreshToken);
  const config = { headers: { "Content-Type": "application/json" } };

  console.log(JSONdata);

  try {
    const { data } = await axios.post(
      "http://103.90.86.151:55/api/RefreshTokenGenerator/RefreshToken",
      JSONdata,
      config
    );
    console.log(data);
    data.IDHRRole = userSession.IDHRRole;

    localStorage.setItem("blueberryToken", JSON.stringify(data));
    req.headers.Authorization = `Bearer ${data.AccessToken}`;
  } catch (error) {
    console.log(
      error.response.data.Message ? error.response.data.Message : error.message
    );
  }

  return req;
});