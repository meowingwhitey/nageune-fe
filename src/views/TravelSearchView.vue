<script setup>
const props = defineProps(["search", "keyword"]);

import AgeRangeBar from "@/components/travel/heritage/AgeRangeBar.vue";
import HeritageSearchMenu from "@/components/travel/heritage/HeritageSearchMenu.vue";

import CategoryChipList from "@/components/travel/place/CategoryChipList.vue";
import PlaceSearchMenu from "@/components/travel/place/PlaceSearchMenu.vue";

import { watch } from "vue";
watch(props, () => {
  console.log(props.keyword);
});
</script>

<template>
  <!-- 검색 타입은 query 값으로 받음 -->
  <AgeRangeBar class="option-bar" v-if="props.search === 'heritage'" />
  <HeritageSearchMenu
    class="search-menu"
    v-if="props.search === 'heritage'"
    :keyword="props.keyword"
  />

  <!-- <CategoryChipList class="option-bar" v-if="route.query.search === 'place'" /> -->
  <PlaceSearchMenu
    class="search-menu"
    v-if="props.search === 'place'"
    :keyword="props.keyword"
  />
</template>

<style scoped>
.option-bar {
  position: fixed;
  left: 385px;
  top: 40px;
  height: calc(100vh - 80px);
  width: 60px;
  flex-direction: column;
  display: flex;
  z-index: 900;
  background-color: white;
}
.search-menu {
  position: fixed;
  z-index: 900;
  flex-direction: column;
  left: 110px;
  top: 40px;
  height: calc(100vh - 80px);
  width: 265px;
}
</style>
