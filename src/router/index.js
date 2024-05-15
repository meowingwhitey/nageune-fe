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
        },
        {
          path: "login",
          name: "mobileLogin",
          component: MobileLogin,
        },
      ],
    },
  ],
});

export default router;
