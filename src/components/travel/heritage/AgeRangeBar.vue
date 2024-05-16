<script setup>
const eras = {
  0: "선사시대",
  1: "석기시대",
  2: "청동기시대",
  3: "철기시대",
  4: "삼한시대",
  5: "삼국시대",
  6: "발해/통일신라",
  7: "고려시대",
  8: "조선시대",
  9: "대한제국시대",
  10: "일제강점기",
};
</script>

<template>
  <v-card id="age-range-card">
    <v-range-slider
      :model-value="[0, 1]"
      :step="1"
      :ticks="eras"
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
