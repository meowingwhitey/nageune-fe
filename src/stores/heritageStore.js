import { ref } from "vue";
import { defineStore } from "pinia";
import { localAxios } from "@/util/axios_interceptor";

const REST_USER_API = `/heritage`;

export const useHeritageStore = defineStore("heritageStore", () => {
  const local = localAxios();

  const heritage = ref(null);

  //   테스트용 코드
  const getHeritageById = (id) => {
    local
      .get(`${REST_USER_API}/id`, { params: { heritageId: id } })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { getHeritageById };
});
