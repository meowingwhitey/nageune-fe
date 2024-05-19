<script setup>
import ArticleList from "@/components/board/ArticleList.vue";
import HeaderComponent from "@/components/includes/HeaderComponent.vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import FooterComponent from "@/components/includes/FooterComponent.vue";
const route = useRoute();

// 게시판 종류
const boardList = [
  {
    boardType: "notice",
    title: "공지사항",
  },
  {
    boardType: "free",
    title: "자유게시판",
  },
];

const boardType = ref("");
const board = ref("");

const getBoardInfo = (type) => {
  boardType.value = type;
  board.value = boardList.find((item) => item.boardType === boardType.value);
};

onMounted(() => {
  getBoardInfo(route.params.boardType);
});

onBeforeRouteUpdate((to, from) => {
  getBoardInfo(to.params.boardType);
});

console.log(board);
</script>

<template>
  <HeaderComponent />
  <v-container class="mb-10 px-0 py-2">
    <!-- 공공누리 이미지 제 1 유형 -->
    <!-- https://www.kogl.or.kr/info/license.do -->
    <div id="board-title-box" class="position-relative">
      <div id="board-title" class="position-absolute text-h4 font-weight-bold">
        {{ board.title }}
      </div>
    </div>

    <!-- type을 전달해서 해당하는 board 정보를 가져옴 -->
    <v-container>
      <ArticleList :boardType="boardType" />
    </v-container>
  </v-container>
  <FooterComponent />
</template>

<style scoped>
#board-title-box {
  width: 100%;
  height: 200px;
  background-color: rgb(110, 124, 87);
  /* background-image: linear-gradient(rgba(101, 148, 109, 0), rgba(0, 0, 0, 0.7)),
    url("http://www.cha.go.kr/unisearch/images/national_treasure/2021062917265902.jpg");
  background-size: cover;
  background-position: 0% 50%; */
  border-radius: 2px;
}

#board-title {
  bottom: 10%;
  right: 15%;
  transform: translate(50%, -50%);
  color: #fff;
}
</style>
