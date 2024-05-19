<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import SearchBar from "@/components/board//SearchBar.vue";
import { useBoardStore } from "@/stores/boardStore";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const articleStore = useBoardStore();
const router = useRouter();
const paging = ref(articleStore.articleTotalCnt / 5);

defineProps({
  boardType: String,
});

const moveToPost = () => {
  router.push({ name: "articleCreate" });
};
</script>

<template>
  <v-container>
    <v-row class="text-center font-weight-bold" id="table-head">
      <v-col cols="1">번호</v-col>
      <v-col cols="5">제목</v-col>
      <v-col cols="2">작성자</v-col>
      <v-col cols="2">등록일</v-col>
      <v-col cols="2">조회수</v-col>
    </v-row>
    <v-row
      class="text-center table-item"
      v-for="article in articleStore.articleList"
      :key="article.id"
    >
      <v-col cols="1">{{ article.id }}</v-col>
      <v-col cols="5" class="text-left">
        <RouterLink :to="{ name: 'articleDetail', params: { id: article.id } }">
          <span>{{ article.title }}</span>
        </RouterLink>
      </v-col>
      <v-col cols="2">{{ article.user }}</v-col>
      <v-col cols="2">{{ article.date }}</v-col>
      <v-col cols="2">{{ article.viewCnt }}</v-col>
    </v-row>
  </v-container>

  <!-- <SearchBar /> -->
  <div class="mt-2 d-flex justify-space-between">
    <span>전체 {{ articleStore.articleTotalCnt }}건</span>
    <template v-if="boardType !== 'notice'">
      <v-btn
        variant="tonal"
        color="green-darken-4"
        density="compact"
        append-icon="mdi-lead-pencil"
        class="mr-2"
        @click="moveToPost"
      >
        작성하기
      </v-btn>
    </template>
  </div>
  <!-- 페이징 -->
  <v-pagination :length="paging"></v-pagination>
</template>

<style scoped>
a {
  text-decoration: none;
  color: #000;
}

a :hover {
  text-decoration: underline;
}

#table-head {
  border-style: solid;
  border-color: #7a7a7a;
  border-width: 2px 0 1px 0;
  background-color: #f7f8f7;
  font-size: smaller;
}

.table-item {
  border-style: solid;
  border-color: rgba(122, 122, 122, 0.2);
  border-width: 0 0 1px 0;
}
</style>
