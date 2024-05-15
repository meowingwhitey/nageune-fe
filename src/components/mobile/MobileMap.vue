<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const API_KEY = "3a50819ba44a31180203cb5cc7f12def";
const REST_API_KEY = "583e17c3f8ed87c625a3162d0fdcc29b";

const lng = ref(0);
const lat = ref(0);
const address = ref(null);

let map = null;

onMounted(() => {
  //현재 위치 가져오기
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat.value = position.coords.latitude;
      lng.value = position.coords.longitude;
      // console.log(lat.value + " " + lng.value);
      // getAddress();

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
    });
  } else {
    alert("위치사용불가");
  }
});

const initMap = () => {
  // console.log("initMap");
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(lat.value, lng.value),
    level: 5,
  };

  // 지도 객체를 등록합니다.
  // 지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
  map = new kakao.maps.Map(container, options);

  const marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(lat.value, lng.value),
    // text: "현재위치", static map만?
  });

  marker.setMap(map);
};

//주소 가져오기
const getAddress = () => {
  axios
    .get(
      "https://dapi.kakao.com/v2/local/geo/coord2address.json?x=" +
        lng.value +
        "&y=" +
        lat.value,
      { headers: { Authorization: `KakaoAK ${REST_API_KEY}` } }
    )
    .then((data) => {
      console.log(data.data.documents[0]);
      if (data.data.documents[0].road_address !== null) {
        address.value = {
          address_name: data.data.documents[0].road_address.address_name,
          building_name: data.data.documents[0].road_address.building_name,
        };
      } else if (data.data.documents[0].address !== null) {
        address.value = {
          address_name: data.data.documents[0].address.address_name,
          building_name: data.data.documents[0].address.building_name,
        };
      } else {
        console.log("주소가 존재하지 않음");
      }

      console.log(address.value.address_name);
    })
    .catch(() => {
      console.log("실패");
    });
};
</script>

<template>
  <div id="map"></div>
</template>

<style scoped></style>
