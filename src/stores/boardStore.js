import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { httpStatusCode } from "@/util/http-status";
import { localAxios } from "@/util/axios_interceptor";

const REST_BOARD_API = "board";

export const useBoardStore = defineStore("board", () => {
  const articleTotalCnt = ref(10);

  const articleList = ref([
    {
      id: 1,
      title: "제목",
      content: "내용",
      user: "작성자",
      date: "2024-05-18",
      viewCnt: "1",
    },
    {
      id: 2,
      title: "제목",
      content: "내용",
      user: "작성자",
      date: "2024-05-18",
      viewCnt: "1",
    },
    {
      id: 3,
      title: "제목",
      content: "내용",
      user: "작성자",
      date: "2024-05-18",
      viewCnt: "1",
    },
    {
      id: 4,
      title: "제목",
      content: "내용",
      user: "작성자",
      date: "2024-05-18",
      viewCnt: "1",
    },
    {
      id: 5,
      title: "제목",
      content: "내용",
      user: "작성자",
      date: "2024-05-18",
      viewCnt: "1",
    },
  ]); //게시글 리스트
  const article = ref({}); //게시글 디테일

  return { articleList, article, articleTotalCnt };
});
