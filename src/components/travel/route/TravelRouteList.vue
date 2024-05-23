<script setup>
import TravelRouteListItem from "./TravelRouteListItem.vue";
import draggable from "vuedraggable";
import { ref, computed, watch } from "vue";
import { useMapStore } from "@/stores/mapStore";
const mapStore = useMapStore();
const props = defineProps(["routeList", "routeIdx"]);

const currentMarker = ref([]);
let prevPloygon = null;
watch(props.routeList, () => {
  console.log(props.routeList);
});
const dragOptions = computed(() => {
  return {
    animation: 200,
    disabled: false,
    ghostClass: "ghost",
    group: "location",
  };
});

const onRouteMapping = () => {
  const route = props.routeList.route;
  const bounds = new kakao.maps.LatLngBounds();
  const linePath = [];

  // 마커 및 라인 삭제
  mapStore.resetMarker();

  for (const place of route) {
    mapStore.drawMarker(place.name, place.latitude, place.longitude);
    console.log(place);
    bounds.extend(new kakao.maps.LatLng(place.latitude, place.longitude));
    linePath.push(new kakao.maps.LatLng(place.latitude, place.longitude));
  }

  // 지도에 표시할 선을 생성합니다
  const polyline = new kakao.maps.Polyline({
    path: linePath, // 선을 구성하는 좌표배열 입니다
    strokeWeight: 5, // 선의 두께 입니다
    strokeColor: "#FFAE00", // 선의 색깔입니다
    strokeOpacity: 0.9, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: "solid", // 선의 스타일입니다
    endArrow: true,
  });

  if (mapStore.currentPolyline != null) {
    // 기존 라인 삭제
    mapStore.currentPolyline.setMap(null);
  }
  mapStore.currentPolyline = polyline;
  // 지도에 선을 표시합니다
  polyline.setMap(window.kakaoMap);
  window.kakaoMap.setBounds(bounds);
};

const log = (evt) => {
  console.log(evt);
  onRouteMapping();
};
</script>

<template>
  <div
    style="
      min-width: 250px;
      display: flex;
      flex-direction: column;
      height: 100%;
    "
  >
    <div
      class="d-flex flex-row ga-2"
      style="align-items: end; justify-content: start"
    >
      <h3>{{ `${props.routeIdx + 1}일차` }}</h3>
      <p class="text-subtitle-2 text-medium-emphasis">
        {{ props.routeList.date }}
      </p>
      <v-btn color="#26A69A" density="compact" @click="onRouteMapping">
        경로보기
      </v-btn>
    </div>

    <draggable
      class="list-group"
      style="height: 100%"
      :list="props.routeList.route"
      v-bind="dragOptions"
      @change="log"
      ghost-class="ghost"
    >
      <template #item="{ element, index }">
        <TravelRouteListItem
          class="list-group-item"
          :index="index"
          :element="element"
        />
      </template>
    </draggable>
  </div>
</template>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
/* 
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
} */
</style>
