<script setup>
import { ref } from "vue";
const emit = defineEmits(["onSearch"]);
const props = defineProps(["searchType"]);
const searchKeyword = ref("");
const searchSpot = () => {
  emit("onSearch", searchKeyword.value);
};
</script>

<template>
  <v-card-text id="map-search-bar">
    <v-text-field
      append-inner-icon="mdi-magnify"
      density="compact"
      :label="`${searchType === 'place' ? '경유지' : '문화재'} 검색`"
      variant="solo"
      hide-details
      single-line
      v-model="searchKeyword"
      @keydown.enter="searchSpot"
    ></v-text-field>
  </v-card-text>
</template>

<style scoped>
#map-search-bar {
  width: 100%;
  padding: 0px;
}
</style>
