import axios from "axios";
import { useTokenStore } from "@/stores/tokenStore";
import { httpStatusCode } from "./http-status";

// stationAxios = () => {
//   const instance = axios.create({
//     baseURL: "/api/v1",
//   });
//   return instance;
// };

const localAxios = () => {
  const instance = axios.create({
    baseURL: "/api/v1",
    withCredentials: true,
  });

  //request 발생 시 적용할 내용
  const tokenStore = useTokenStore();
  const authorization = tokenStore.getAccessToken();
  instance.defaults.headers.common["Authorization"] = authorization;

  //request
  //pre interceptor
  instance.interceptors.request.use(
    (config) => {
      // console.log("pre");
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  //response
  //post interceptor
  let isTokenRefreshing = false; //토큰 요청 상태 저장

  instance.interceptors.response.use(
    (response) => {
      // console.log("post");
      return response;
    },
    async (error) => {
      const {
        config,
        response: { status },
      } = error;

      //access token 재발급
      if (status == httpStatusCode.BADREQUEST) {
        // 요청 상태 저장
        const originalRequest = config;

        if (!isTokenRefreshing) {
          isTokenRefreshing = true;

          return await instance
            .get("/auth/refresh", {
              params: {
                type: "access",
              },
            })
            .then((response) => {
              const newAccessToken = response.headers.authorization;
              console.log(newAccessToken);
              instance.defaults.headers.common["Authorization"] =
                newAccessToken;
              originalRequest.headers.Authorization = newAccessToken;

              isTokenRefreshing = false;

              // 에러가 발생했던 원래의 요청을 다시 진행.
              return instance(originalRequest);
            });
        }
      }
      return Promise.reject(error);
    },
  );
  return instance;
};

export { localAxios };
