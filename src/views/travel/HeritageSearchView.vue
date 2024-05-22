<script setup>
import EraRangeBar from "@/components/travel/heritage/EraRangeBar.vue";
import HeritageSearchMenu from "@/components/travel/heritage/HeritageSearchMenu.vue";
</script>

<template>
  <div>
    <EraRangeBar class="option-bar" />
    <HeritageSearchMenu class="search-menu" />
  </div>
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
