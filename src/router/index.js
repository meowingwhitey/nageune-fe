import { createRouter, createWebHistory } from "vue-router";
import IndexView from "@/views/IndexView.vue";
import TravelView from "@/views/TravelView.vue";
import TravelSearchView from "@/views/TravelSearchView.vue";
import TravelRouteView from "@/views/TravelRouteView.vue";
import MyPageView from "@/views/MyPageView.vue";
import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";
import MobileView from "@/views/MobileView.vue";
import MobileMain from "@/components/mobile/MobileMain.vue";
import MobileMyPage from "@/components/mobile/mypage/MobileMyPage.vue";
import MobileLogin from "@/components/mobile/MobileLogin.vue";
import SpotDetail from "@/components/mobile/spot/SpotDetail.vue";
import { useUserStore } from "@/stores/userStore";
import { useTokenStore } from "@/stores/tokenStore";
import ArticleDetail from "@/components/board/ArticleDetail.vue";
import BoardView from "@/views/BoardView.vue";
import ManualView from "@/views/ManualView.vue";
import ArticleView from "@/views/ArticleView.vue";
import ArticleEditor from "@/components/board/ArticleEditor.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: IndexView,
    },
    {
      path: "/travel",
      name: "travel",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: TravelView,
      children: [
        {
          path: "",
          name: "travel-search",
          component: TravelSearchView,
          props: (route) => ({
            search: route.query.search, // 검색 메뉴 타입 (문화재:heritage/장소:place)
            keyword: route.query.keyword, // 검색하는 키워드
          }),
        },
        {
          path: "route",
          name: "travel-route",
          component: TravelRouteView,
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
