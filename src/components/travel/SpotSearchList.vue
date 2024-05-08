<script setup>
import SpotSearchListItem from "./SpotSearchListItem.vue";
const props = defineProps({
  spotList: Array,
});
</script>

<template>
  <v-card id="spot-search-list" class="overflow-y-auto">
    <v-list lines="one">
      <SpotSearchListItem
        v-for="(spot, index) in spotList"
        :listSize="spotList.length"
        :index="index"
        :spot="spot"
      />
    </v-list>
  </v-card>
</template>

<style scoped>
#spot-search-list {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  width: 100%;
  height: 100%;
}
#spot-search-list::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
  width: 100%;
}
</style>
