import React from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../constants";
import { USER_LOGIN_SUCCESS } from "../student/login/LoginConstants";

const useAxios = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo?.AccessToken}`,
    },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const userSession = userInfo?.AccessToken;
    const user = jwt_decode(userSession);
    const isExpired = user.exp - moment().unix() < 1;
    console.log(user.exp);
    console.log(moment.unix(user.exp));
    console.log(moment().unix());
    console.log("isExpired", isExpired);

    if (!isExpired) return req;

    const dataForRefreshToken = {
      AccessToken: userSession?.AccessToken,
      RefreshToken: userSession?.RefreshToken,
      IDHRRole: userSession?.IDHRRole,
    };
    const JSONdata = JSON.stringify(dataForRefreshToken);
    const config = { headers: { "Content-Type": "application/json" } };

    // console.log(JSONdata);

    try {
      const { data } = await axios.post(
        `${API_URL}/api/RefreshTokenGenerator/RefreshToken`,
        JSONdata,
        config
      );
      console.log(data);
      data.IDHRRole = userSession.IDHRRole;

      localStorage.setItem("blueberryToken", JSON.stringify(data));
      dispatch({ type: USER_LOGIN_SUCCESS, data });
      req.headers.Authorization = `Bearer ${data.AccessToken}`;
    } catch (error) {
      console.log(
        error.response.data.Message
          ? error.response.data.Message
          : error.message
      );
    }

    return req;
  });

  return axiosInstance;
};

export default useAxios;
