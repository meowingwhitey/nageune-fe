<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { useMapStore } from "@/stores/mapStore.js";
import { useTravelStore } from "@/stores/travelStore.js";
import SummaryRouteList from "@/components/travel/summary/SummaryRouteList.vue";
import { format, addDays, differenceInDays } from "date-fns";
const mapStore = useMapStore();
const travelStore = useTravelStore();

const router = useRouter();
const onPreviousClick = () => {
  router.push({ name: "travel-route" });
};

const onCreateTravel = () => {
  router.push({ name: "travel-summary" });
};
console.log(travelStore);
const dialog = ref(true);
</script>

<template>
  <v-dialog
    v-if="mapStore.isKakaoMapLoaded"
    v-model="dialog"
    max-width="fit-content"
    persistent
  >
    <v-card class="summary-dialog-card"> </v-card>
  </v-dialog>
</template>

<style scoped>
.summary-dialog-card {
  width: 60vw;
  height: 50vw;
  padding: 30px;
  display: flex;
  align-items: center;
}
</style>
