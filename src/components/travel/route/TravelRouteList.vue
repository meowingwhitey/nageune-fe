<script setup>
import TravelRouteListItem from "./TravelRouteListItem.vue";
import draggable from "vuedraggable";
import { ref, computed } from "vue";

const props = defineProps(["routeList", "routeIdx"]);
// const add = () => {
//   this.list.push({ name: "Juan" });
// };
// const clone = (el) => {
//   return {
//     name: el.name + " cloned",
//   };
// };
const log = (evt) => {
  window.console.log(evt);
};

const dragOptions = computed(() => {
  return {
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost",
  };
});

const onRouteMapping = () => {
  const route = props.routeList.route;
  const bounds = new window.kakao.maps.LatLngBounds();
  for (const place of route) {
    displayMarker(place);
    console.log(place);
    bounds.extend(new window.kakao.maps.LatLng(place.lat, place.lng));
  }
  window.kakaoMap.setBounds(bounds);
};

// 지도에 마커를 표시하는 함수입니다
const displayMarker = (place) => {
  // 마커를 생성하고 지도에 표시합니다
  const marker = new kakao.maps.Marker({
    map: window.kakaoMap,
    position: new kakao.maps.LatLng(place.lat, place.lng),
  });

  // 마커에 클릭이벤트를 등록합니다
  kakao.maps.event.addListener(marker, "click", function () {
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    if (place.isInfoWindowOpen) {
      infowindow.close();
      place.isInfoWindowOpen = false;
      return;
    }
    // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
    infowindow.setContent(
      '<div style="padding:5px;font-size:12px;">' + place.place_name + "</div>",
    );
    infowindow.open(kakaoMap.value, marker);
    place.isInfoWindowOpen = true;
  });
};
</script>

<template>
  <div style="display: flex; flex-direction: column">
    <div class="d-flex flex-row ga-2" style="align-items: center">
      <h3>{{ props.routeList.date }}</h3>
      <v-btn size="small" rounded="xl" color="#26A69A" @click="onRouteMapping"
        >경로 보기</v-btn
      >
    </div>

    <draggable
      class="list-group"
      style="min-height: 100%; min-width: 220px"
      :list="props.routeList.route"
      group="people"
      v-bind="dragOptions"
      @change="log"
      ghost-class="ghost"
      itemKey="name"
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

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}
</style>
