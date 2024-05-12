import { createRouter, createWebHistory } from "vue-router";
import IndexView from "@/views/IndexView.vue";
import TravelView from "@/views/TravelView.vue";
import TravelSearchView from "@/views/TravelSearchView.vue";
import TravelRouteView from "@/views/TravelRouteView.vue";
import MyPage from "@/views/MyPage.vue";
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
      component: MyPage,
    },
  ],
});

export default router;
