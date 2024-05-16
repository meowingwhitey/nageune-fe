import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useRouter } from "vue-router";
import { httpStatusCode } from "@/util/http-status";
import { useTokenStore } from "@/stores/tokenStore.js";

const REST_USER_API = `/api/v1/auth`;

export const useUserStore = defineStore("user", () => {
  const router = useRouter();
  const tokenStore = useTokenStore();

  const isLogin = ref(false); //로그인 여부
  const userInfo = ref(null);
  const lastAccess = ref(null); //최근 route 변경 시간 저장

  //로그인
  const userLogin = (email, password) => {
    axios({
      method: "POST",
      url: `${REST_USER_API}/login`,
      data: { email: email, password: password },
    })
      //로그인에 성공했을 경우
      .then((response) => {
        if (response.status === httpStatusCode.OK) {
          console.log("로그인 성공");

          let { headers } = response;

          console.log(response);
          //session storage에 access token 저장
          tokenStore.setAccessToken(headers.authorization); //토큰

          isLogin.value = true; //로그인 했다고 체크
          lastAccess.value = Date.now(); //시간 체크

          router.push({ name: "index" });
        }
      })
      //로그인에 실패했을 경우
      .catch((error) => {
        console.log("로그인 실패");
        console.log(error);

        isLogin.value = false;
      });
  };

  //로그아웃
  const userLogout = () => {
    axios({
      method: "POST",
      url: `${REST_USER_API}/logout`,
      headers: {
        Authorization: tokenStore.getAccessToken(),
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response.status === httpStatusCode.OK) {
          //로그아웃 처리

          isLogin.value = false;
          userInfo.value = null;
          lastAccess.value = null;
          tokenStore.setAccessToken(null);
        } else {
          console.log("유저 정보 없음");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //회원가입
  const userSignup = (info) => {};

  //로그인 유저 정보 가져오기
  const getUserInfo = () => {
    axios({
      method: "POST",
      url: `${REST_USER_API}`,
    })
      .then((response) => {
        //유저정보 가져오기
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //회원정보 수정
  const updateUserInfo = (info) => {
    axios({
      method: "POST",
      url: `${REST_USER_API}/edit`,
    })
      .then((response) => {
        //수정 성공
      })
      .catch((response) => {
        //수정 실패
      });
  };

  return {
    isLogin,
    userInfo,
    lastAccess,
    userLogin,
    userLogout,
  };
});
