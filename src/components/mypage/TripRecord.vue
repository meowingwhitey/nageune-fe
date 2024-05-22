<script setup>
import TripRecordDetail from "@/components/mypage/TripRecordDetail.vue";
import { ref, onBeforeMount } from "vue";

const props = defineProps({
  plan: String,
  index: Number,
  travelId: Number,
});

const spots = ref({});
const getJson = () => {
  spots.value = JSON.parse(props.plan);
  // console.log(spots.value);
};

onBeforeMount(() => {
  getJson();
});
</script>

<template>
  <div class="text-center">
    <div class="travel-date mb-4">{{ index + 1 }}일차</div>
    <TripRecordDetail v-for="spot in spots" :spot="spot" :travelId="travelId" />
  </div>
</template>

<style scoped>
.travel-date {
  font-size: xx-large;
  font-weight: 800;
}
</style>
