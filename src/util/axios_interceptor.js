import axios from "axios";
import { getAccessToken } from "@/stores/tokenStore";

stationAxios = () => {
  const instance = axios.create({
    baseURL: "/api/v1",
  });
  return instance;
};

localAxios = () => {
  const instance = axios.create({
    baseURL: "/api/v1",
    withCredentials: true,
  });

  const authorization = getAccessToken();

  //access token이 null이거나, 유효하지 않은 경우

  instance.defaults.headers.common["Authorization"] = authorization;
};

export { localAxios, stationAxios };
