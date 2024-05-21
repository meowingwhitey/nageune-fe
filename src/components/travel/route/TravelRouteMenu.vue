<script setup>
import TravelRouteList from "@/components/travel/route/TravelRouteList.vue";
import { useTravelStore } from "@/stores/travelStore.js";
import NextBtn from "@/components/travel/NextBtn.vue";
import PreviousBtn from "@/components/travel/PreviousBtn.vue";
import { useMapStore } from "@/stores/mapStore.js";
import { useRouter } from "vue-router";
import axios from "axios";
import { onMounted } from "vue";
const mapStore = useMapStore();
const router = useRouter();
const onPreviousClick = () => {
  router.push({ name: "travel-search-place" });
};

const onNextClick = () => {
  router.push({ name: "travel-summary" });
};
const travelStore = useTravelStore();

onMounted(() => {
  travelStore.setRouteCluster();
});
</script>

<template>
  <template class="d-flex ga-2">
    <v-card style="height: 100%">
      <div
        class="d-flex ga-2 row"
        style="overflow-x: scroll; height: 100%; padding: 15px"
      >
        <TravelRouteList
          v-for="(route, index) in travelStore.routeList"
          :route-list="route"
          :route-idx="index"
        />
      </div>
    </v-card>
    <div class="d-flex flex-wrap ga-2 flex-row" style="width: 265px">
      <PreviousBtn @click="onPreviousClick" />
      <NextBtn text="만든 여행 확인하기" @click="onNextClick" />
    </div>
  </template>
</template>

<style scoped></style>
