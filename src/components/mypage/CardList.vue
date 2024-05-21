<script setup>
import CardItem from "@/components/mypage/CardItem.vue";
import { localAxios } from "@/util/axios_interceptor";
import { useTokenStore } from "@/stores/tokenStore";
import { ref, onMounted } from "vue";
const REST_TRAVELHISTORY_API = `/travelHistory`;
const local = localAxios();
const tokenStore = useTokenStore();

const cards = ref(null);

//카드 목록 가져오기
const getCards = async () => {
  local.defaults.headers["Authorization"] = tokenStore.getAccessToken();
  await local
    .get(`${REST_TRAVELHISTORY_API}/card`)
    .then((res) => {
      console.log("카드목록가져오기");
      cards.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  getCards();
});
</script>

<template>
  <v-container class="d-flex">
    <v-row>
      <CardItem v-for="card in cards" :card="card" />
    </v-row>
  </v-container>
</template>

<style scoped></style>
