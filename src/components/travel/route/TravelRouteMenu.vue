<script setup>
import TravelRouteList from "@/components/travel/route/TravelRouteList.vue";
import { useRouteStore } from "@/stores/routeStore.js";
const routeStore = useRouteStore();
</script>

<template>
  <TravelRouteList
    v-for="route of routeStore.routeList"
    :route-list="route"
    class="travel-route-list"
  />
</template>

<style scoped></style>
