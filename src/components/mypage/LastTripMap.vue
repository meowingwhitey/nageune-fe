<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const API_KEY = "3a50819ba44a31180203cb5cc7f12def";
const REST_API_KEY = "583e17c3f8ed87c625a3162d0fdcc29b";

const props = defineProps({
  route: String,
});

const spots = ref({});
const coodList = ref([]);
const getJson = () => {
  spots.value = JSON.parse(props.route);
  console.log("dd", spots.value);
  coodList.value = [];
};

const lat = ref(37.571325);
const lng = ref(126.9790389);
const address = ref(null);

let map = null;

onMounted(() => {
  loadMap();
});

const initMap = () => {
  // console.log("initMap");
  const container = document.getElementById("map");
  const marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(lat.value, lng.value),
    // text: "현재위치", static map만?
  });
  const options = {
    center: new kakao.maps.LatLng(lat.value, lng.value),
    level: 5,
    marker: marker,
  };

  // 지도 객체를 등록합니다.
  // 지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
  map = new kakao.maps.StaticMap(container, options);
};

const loadMap = () => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    /* global kakao */
    script.onload = () => kakao.maps.load(initMap);
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${API_KEY}`;
    document.head.appendChild(script);
    // console.log("kakao map script");
  }
};
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  width: 80vw;
}
</style>
