import { createRouter, createWebHistory } from "vue-router";
import IndexView from "@/views/IndexView.vue";
import TravelView from "@/views/TravelView.vue";
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
          path: "search",
          name: "search",
          component: TravelView,
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
