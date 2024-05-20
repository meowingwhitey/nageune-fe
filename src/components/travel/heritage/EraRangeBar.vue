<script setup>
import { ref, watch } from "vue";
import { useSearchStore } from "@/stores/searchStore";

const store = useSearchStore();

// 서버에서 검색시 사용하는 code
const eraCodes = [1, 3, 5, 7, 9, 10, 20, 30, 40, 45, 50, 60];
const eras = {
  0: "선사시대",
  1: "석기시대",
  2: "청동기시대",
  3: "철기시대",
  4: "삼한시대",
  5: "삼국시대", // 11: 고구려, 12: 백제, 13: 신라, 14: 가야
  6: "발해/통일신라",
  7: "고려시대",
  8: "조선시대",
  9: "대한제국",
  10: "일제강점기",
  //11: "시대미상",
};

const eraRange = ref([0, 10]);
watch(eraRange, () => {
  console.log(eraRange.value);
  store.resetMarker();
  store.eraRangeCodes.start = eraCodes[eraRange.value[0]];
  store.eraRangeCodes.end = eraCodes[eraRange.value[1]];
  store.drawMarker();
});
</script>

<template>
  <v-card id="era-range-card">
    <v-range-slider
      :model-value="[0, 1]"
      :step="1"
      :ticks="eras"
      max="10"
      min="0"
      show-ticks="always"
      tick-size="4"
      track-color="#80CBC4"
      track-fill-color="#009688"
      thumb-color="#607D8B"
      color="#263238"
      style="font-size: 9.5pt"
      v-model="eraRange"
    >
    </v-range-slider>
  </v-card>
</template>

<style scoped>
/*
  길이 = (100vw - 로그인 버튼 - navbar - searchbar)
*/
#era-range-card {
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
