import { createRouter, createWebHistory } from "vue-router";
// 사용자 관련 페이지
import IndexView from "@/views/IndexView.vue";
import MyPageView from "@/views/MyPageView.vue";
import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";

// 모바일 관련 페이지
import MobileView from "@/views/MobileView.vue";
import MobileMain from "@/components/mobile/MobileMain.vue";
import MobileMyPage from "@/components/mobile/mypage/MobileMyPage.vue";
import MobileLogin from "@/components/mobile/MobileLogin.vue";
import SpotDetail from "@/components/mobile/spot/SpotDetail.vue";

// 게시판 관련 페이지
import ArticleDetail from "@/components/board/ArticleDetail.vue";
import BoardView from "@/views/BoardView.vue";
import ManualView from "@/views/ManualView.vue";
import ArticleView from "@/views/ArticleView.vue";
import ArticleEditor from "@/components/board/ArticleEditor.vue";

// 경로 생성 관련 페이지
import TravelView from "@/views/TravelView.vue";
import HeritageSearchView from "@/views/travel/HeritageSearchView.vue";
import PlaceSearchView from "@/views/travel/PlaceSearchView.vue";
import RouteView from "@/views/travel/RouteView.vue";
import ScheduleView from "@/views/travel/ScheduleView.vue";
import SummaryView from "@/views/travel/SummaryView.vue";
import CreateView from "@/views/travel/CreateView.vue";
import DepartureView from "@/views/travel/DepartureView.vue";

import { useUserStore } from "@/stores/userStore";
import { useTokenStore } from "@/stores/tokenStore";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: IndexView,
      beforeEnter: (to, from) => {
        console.log(to, from);

        if (from.path.slice(0, 3) === "/m/") {
          return { name: "mobileMain" };
        } else return true;
      },
    },
    {
      path: "/travel",
      name: "travel",
      component: TravelView,
      children: [
        {
          path: "create",
          name: "travel-create",
          component: CreateView,
        },
        {
          path: "departure",
          name: "travel-departure",
          component: DepartureView,
          props: (route) => ({
            keyword: route.query.keyword, // 검색하는 키워드
          }),
        },
        {
          path: "schedule",
          name: "travel-schedule",
          component: ScheduleView,
          props: (route) => ({
            keyword: route.query.keyword, // 검색하는 키워드
          }),
        },
        {
          path: "heritage",
          name: "travel-search-heritage",
          component: HeritageSearchView,
          props: (route) => ({
            keyword: route.query.keyword, // 검색하는 키워드
          }),
        },
        {
          path: "place",
          name: "travel-search-place",
          component: PlaceSearchView,
          props: (route) => ({
            keyword: route.query.keyword, // 검색하는 키워드
          }),
        },
        {
          path: "route",
          name: "travel-route",
          component: RouteView,
        },
        {
          path: "summary",
          name: "travel-summary",
          component: SummaryView,
        },
      ],
    },
    {
      path: "/mypage",
      name: "mypage",
      component: MyPageView,
      beforeEnter: async (to, from) => {
        //로그인 했을 때만 접근 가능
        const userStore = useUserStore();
        const tokenStore = useTokenStore();

        // await tokenStore.accessTokenRegenerate();

        // console.log(userStore.isLogin ? "true" : "false");

        if (!userStore.isLogin) {
          console.log("로그인 후 접근 가능한 페이지");
          return { name: "login" };
        }

        // userStore.getUserInfo();
        return true;
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupView,
    },
    {
      path: "/m",
      name: "mobile",
      component: MobileView,
      children: [
        {
          path: "",
          name: "mobileMain",
          component: MobileMain,
        },
        {
          path: "spotDetail/:id",
          name: "SpotDetail",
          component: SpotDetail,
        },
        {
          path: "mypage",
          name: "mobileMypage",
          component: MobileMyPage,
          beforeEnter: async (to, from) => {
            //로그인 했을 때만 접근 가능
            const userStore = useUserStore();
            const tokenStore = useTokenStore();

            // await tokenStore.accessTokenRegenerate();

            // console.log(userStore.isLogin ? "true" : "false");

            if (!userStore.isLogin) {
              console.log("로그인 후 접근 가능한 페이지");
              return { name: "mobileLogin" };
            }

            // userStore.getUserInfo();
            return true;
          },
        },
        {
          path: "login",
          name: "mobileLogin",
          component: MobileLogin,
        },
      ],
    },

    {
      path: "/board/:boardType",
      name: "board",
      component: BoardView,
    },
    {
      path: "/article",
      name: "article",
      component: ArticleView,
      children: [
        {
          path: ":id",
          name: "articleDetail",
          component: ArticleDetail,
        },
        {
          path: "editor",
          name: "articleCreate",
          component: ArticleEditor,
        },
        {
          path: "editor/:id",
          name: "articleEditor",
          component: ArticleEditor,
        },
      ],
    },

    {
      path: "/manual",
      name: "manual",
      component: ManualView,
    },
  ],
});

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();
  //route 변경 시간 기록
  // console.log(userStore.lastAccess);
  userStore.lastAccess = Date.now();
  console.log("route 변경 시간: ", userStore.lastAccess);

  //access token이 없는 경우에만 재생성 요청
  const tokenStore = useTokenStore();
  if (!tokenStore.getAccessToken()) await tokenStore.accessTokenRegenerate();
});

export default router;
