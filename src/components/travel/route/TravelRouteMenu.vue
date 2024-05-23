<script setup>
import TravelRouteList from "@/components/travel/route/TravelRouteList.vue";
import { useTravelStore } from "@/stores/travelStore.js";
import NextBtn from "@/components/travel/NextBtn.vue";
import PreviousBtn from "@/components/travel/PreviousBtn.vue";
import { useMapStore } from "@/stores/mapStore.js";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
const mapStore = useMapStore();
const router = useRouter();
const onPreviousClick = () => {
  mapStore.resetMarker();
  router.push({ name: "travel-search-place" });
};

const onNextClick = () => {
  mapStore.resetMarker();
  router.push({ name: "travel-summary" });
};
const travelStore = useTravelStore();

onMounted(() => {
  travelStore.setRouteCluster();
});
</script>

<template>
  <div class="box">
    <v-card class="route-card-size box" v-resizable.r>
      <v-icon
        color="blue-grey-darken-2"
        icon="mdi-menu-right"
        class="resize-icon"
      />
      <div
        class="box d-flex ga-2 row"
        style="overflow-x: scroll; height: 100%; padding: 15px"
      >
        <TravelRouteList
          v-for="(route, index) in travelStore.routeList"
          :route-list="route"
          :route-idx="index"
        />
      </div>
    </v-card>
    <div class="d-flex flex-wrap ga-2 flex-row btn-list" style="width: 265px">
      <PreviousBtn @click="onPreviousClick" />
      <NextBtn text="만든 여행 확인하기" @click="onNextClick" />
    </div>
  </div>
</template>

<style scoped>
.btn-list {
  position: fixed;
  bottom: 40px;
}
.route-card-size {
  position: fixed;
  z-index: 900;
  flex-direction: column;
  min-width: 275px;
  max-width: 85vw;
  height: calc(100vh - 140px);
  padding-right: 10px;
}
.resize-icon {
  position: absolute;
  right: 0px;
  top: calc(50% - 12px);
}
.box {
  -ms-overflow-style: none;
}
.box::-webkit-scrollbar {
  display: none;
}
</style>
