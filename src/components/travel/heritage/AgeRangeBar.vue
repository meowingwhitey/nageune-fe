<script setup>
const seasons = {
  0: "A",
  1: "B",
  2: "C",
  3: "E",
  4: "F",
  5: "G",
  6: "H",
  7: "I",
  8: "J",
  9: "K",
  10: "L",
};
</script>

<template>
  <v-card id="age-range-card">
    <v-range-slider
      :model-value="[0, 1]"
      :step="1"
      :ticks="seasons"
      thumb-label
      max="10"
      min="0"
      show-ticks="always"
      tick-size="4"
      track-color="#80CBC4"
      track-fill-color="#009688"
      thumb-color="#607D8B"
      color="#263238"
      style="font-size: 10pt"
      persistent-hint="true"
    >
    </v-range-slider>
  </v-card>
</template>

<style scoped>
/*
  길이 = (100vw - 로그인 버튼 - navbar - searchbar)
*/
#age-range-card {
  width: calc(100vw - 380px - 80px - 40px);
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-flow: row wrap;
  padding-left: 15px;
  padding-right: 15px;
  overflow: visible;
}
</style>
