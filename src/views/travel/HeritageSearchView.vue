<script setup>
import EraRangeBar from "@/components/travel/heritage/EraRangeBar.vue";
import HeritageSearchMenu from "@/components/travel/heritage/HeritageSearchMenu.vue";
import { useMapStore } from "@/stores/mapStore";
const mapStore = useMapStore();
// onMounted(async () => {
//   let heritageList = null;

//   // keyword가 설정된 경우 키워드 검색 결과를 사용
//   if (!(route.params.keyword === null || route.params.keyword === undefined)) {
//     heritageList = await searchStore.getHeritageListByKeyword(props.keyword);
//     console.log(heritageList);
//     searchStore.drawMarker(heritageList);
//   }

//   // 만약 키워드 검색 결과가 없다면 era slider에 설정된 전체 데이터를 사용
//   else {
//     // 최초 접속시에는 현 위치 문화재를 띄워줌
//     heritageList = await searchStore.getHeritageListByLocation();
//     searchStore.drawMarker(heritageList);

//     // 지도 이동시 위치에 맞는 문화재 추가 로딩
//     window.kakao.maps.event.addListener(
//       window.kakaoMap,
//       "mouseup",
//       async () => {
//         const heritageList = await searchStore.getHeritageListByLocation();
//         searchStore.drawMarker(heritageList);
//       },
//     );
//   }
// });
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
