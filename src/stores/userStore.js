import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useRouter } from "vue-router";
import { httpStatusCode } from "@/util/http-status";
import { useTokenStore } from "@/stores/tokenStore.js";
import { localAxios } from "@/util/axios_interceptor";

const REST_USER_API = `/auth`;

export const useUserStore = defineStore("user", () => {
  const router = useRouter();
  const tokenStore = useTokenStore();
  const local = localAxios();

  const isLogin = ref(false); //로그인 여부
  const isAdmin = ref(false); //어드민 여부
  const userInfo = ref(null);
  const lastAccess = ref(null); //최근 route 변경 시간 저장

  //로그인
  const userLogin = (email, password) => {
    local
      .post(`${REST_USER_API}/login`, {
        email: email,
        password: password,
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
  const userLogout = async () => {
    local.defaults.headers["Authorization"] = tokenStore.getAccessToken();
    console.log(tokenStore.getAccessToken());
    await local
      .post(`${REST_USER_API}/logout`, {
        // withCredentials: true,
      })
      .then((response) => {
        if (response.status === httpStatusCode.OK) {
          //로그아웃 처리
          console.log("로그아웃 성공");
          isLogin.value = false;
          userInfo.value = null;
          lastAccess.value = null;
          tokenStore.setAccessToken(null);
        } else {
          console.log("유저 정보 없음");
        }
      })
      .catch((err) => {
        isLogin.value = false;
        userInfo.value = null;
        lastAccess.value = null;
        tokenStore.setAccessToken(null);
        console.log(err);
      });
  };

  //회원가입
  const userSignup = (info) => {
    local
      .post(`${REST_USER_API}/signup`, {
        email: info.email,
        password: info.password,
        name: info.name,
        nickname: info.nickname,
      })
      .then((response) => {
        console.log(response);
        console.log("회원가입 성공");
      })
      .catch((err) => {
        console.log(err);
        console.log("회원가입 실패");
      });
  };

  //로그인 유저 정보 가져오기
  const getUserInfo = () => {
    local.defaults.headers["Authorization"] = tokenStore.getAccessToken();
    local
      .get(`${REST_USER_API}/info`)
      .then((response) => {
        //유저정보 가져오기
        // console.log(response.data);
        console.log("사용자 정보 가져오기 성공");
        userInfo.value = {
          email: response.data.email,
          name: response.data.name,
          nickname: response.data.nickname,
          img: response.data.img,
        };
      })
      .catch((err) => {
        console.log(err);
        console.log("사용자 정보 불러오기 실패");
      });
  };

  //회원정보 수정
  const updateUserInfo = (info) => {
    local
      .post(`${REST_USER_API}/edit`, {
        email: info.email,
        password: info.password,
        name: info.name,
        nickname: info.nickname,
        img: info.img,
      })
      .then((response) => {
        console.log(response); //수정 성공
        console.log("수정 완료");
      })
      .catch((error) => {
        //수정 실패
        console.log(error);
        console.log("수정 실패");
      });
  };

  return {
    isLogin,
    userInfo,
    lastAccess,
    userLogin,
    userLogout,
    userSignup,
    updateUserInfo,
    getUserInfo,
  };
});
