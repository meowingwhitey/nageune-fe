import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { httpStatusCode } from "@/util/http-status";
import { useUserStore } from "@/stores/userStore";

const REST_USER_API = `/api/v1/auth`;

export const useTokenStore = defineStore("token", () => {
  const userStore = useUserStore();

  const authorization = ref(null); //access token

  //access token 재발급 요청
  const accessTokenRegenerate = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${REST_USER_API}/refresh`,
        withCredentials: true, // cookie(refresh token) 전송
        params: {
          type: "access",
        },
        headers: {
          Authorization: authorization.value,
        },
      });
      const userId = response.data.userId;
      if (response.status === httpStatusCode.OK) {
        //access token 재발급
        authorization.value = response.headers.authorization;

        userStore.isLogin = true;
        console.log("access token 재발급 완료");
      }
    } catch (err) {
      //refresh token이 만료 -> 로그아웃
      console.log("리프래시토큰만료");
      console.log(err);
      await userStore.userLogout();
    }
  };

  //refresh token 재발급 요청
  const refreshTokenRegenerate = () => {
    axios({
      method: "GET",
      url: `${REST_USER_API}/refresh`,
      withCredentials: true, // cookie(refresh token) 전송
      params: {
        type: "refresh",
      },
      headers: {
        Authorization: authorization.value, //access token 전송
      },
    })
      .then((response) => {
        //refresh token 재발급
        if (response.status === httpStatusCode.OK) {
          console.log("refresh token 재발급 완료");
        }
      })
      .catch((err) => {
        //refresh token이 만료 -> 로그아웃
        console.log("refresh token 만료");
        console.log(err);
        userStore.userLogout();
      });
  };

  const setAccessToken = (token) => {
    authorization.value = token;
  };

  const getAccessToken = () => {
    return authorization.value;
  };

  return {
    accessTokenRegenerate,
    refreshTokenRegenerate,
    getAccessToken,
    setAccessToken,
    authorization,
  };
});
