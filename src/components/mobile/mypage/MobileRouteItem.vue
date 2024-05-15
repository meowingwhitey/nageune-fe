<script setup>
import VChip from "@/components/mobile/spot/VChip.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  routeId: Number,
});

const goRouteDetail = () => {
  router.push({ name: "SpotDetail", params: { id: props.routeId } });
};
</script>

<template>
  <div>
    <v-card
      class="d-flex mx-5 my-5 pt-3 pb-3"
      variant="tonal"
      color="green-darken-4"
      @click="goRouteDetail"
    >
      <div class="mr-auto ml-5">
        <div class="route-title">여행 이름</div>
        <div class="route-duration mb-2">기간</div>
        <VChip text="태그" />
      </div>
      <button class="ml-auto mr-5 pa-3">상세보기</button>
    </v-card>
  </div>
</template>

<style scoped>
.route-title {
  font-size: larger;
  font-weight: 500;
}

.route-duration {
  font-size: small;
}
</style>
