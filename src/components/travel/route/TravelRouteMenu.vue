<script setup>
import TravelRouteList from "@/components/travel/route/TravelRouteList.vue";
import { useRouteStore } from "@/stores/routeStore.js";
const routeStore = useRouteStore();
</script>

<template>
  <TravelRouteList
    v-for="(route, index) in routeStore.routeList"
    :route-list="route"
    :route-idx="index"
    class="travel-route-list"
  />
</template>

<style scoped></style>
