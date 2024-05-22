<script setup>
/**
 * 카카오맵 API
 * https://apis.map.kakao.com/web/sample/changeLevel/
 */
// 지도 레벨은 지도의 확대 수준을 의미합니다
// 지도 레벨은 1부터 14레벨이 있으며 숫자가 작을수록 지도 확대 수준이 높습니다
import { useMapStore } from "@/stores/mapStore.js";
const mapStore = useMapStore();
const zoomIn = () => {
  // 현재 지도의 레벨을 얻어옵니다
  const level = window.kakaoMap.getLevel();

  // 지도를 1레벨 내립니다 (지도가 확대됩니다)
  window.kakaoMap.setLevel(level - 1);
};

const zoomOut = () => {
  // 현재 지도의 레벨을 얻어옵니다
  const level = window.kakaoMap.getLevel();

  // 지도를 1레벨 올립니다 (지도가 축소됩니다)
  window.kakaoMap.setLevel(level + 1);
};
</script>

<template>
  <div id="map-sizing-btn" class="ga-2">
    <v-btn @click="zoomIn" icon="mdi-plus" size="x-small"></v-btn>
    <v-btn @click="zoomOut" icon="mdi-minus" size="x-small"></v-btn>
  </div>
</template>

<style scoped>
#map-sizing-btn {
  position: fixed;
  right: 40px;
  bottom: 40px;
  display: flex;
  flex-direction: column;
  z-index: 900;
}
</style>
