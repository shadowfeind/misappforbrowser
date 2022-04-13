import { useSelector } from "react-redux";

const useToken = () => {
  const { userInfo } = useSelector((state) => state.userLogin);

  const tokenConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo !== null && userInfo.AccessToken}`,
    },
  };

  return tokenConfig;
};

export default useToken;
