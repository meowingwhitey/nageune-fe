<script setup>
import MobileMap from "@/components/mobile/MobileMap.vue";
import { ref } from "vue";

const visibleMap = ref(true);
const msg = ref("지도 숨기기");

const changeMapVisiability = () => {
  visibleMap.value = !visibleMap.value;

  if (visibleMap.value) msg.value = "지도 숨기기";
  else msg.value = "현재 위치 확인하기";
};
</script>

<template>
  <div id="map-box">
    <MobileMap v-show="visibleMap" />
    <v-btn
      @click="changeMapVisiability"
      rounded="0"
      color="green-darken-4"
      id="view-map-btn"
    >
      <span class="msg">{{ msg }} </span>
    </v-btn>
  </div>
</template>

<style scoped>
#map {
  width: 95%;
  height: 200px;
  box-shadow: 0 0 3px #b5b5b5;
}
#view-map-btn {
  width: 95%;
  margin-top: 3px;
}

#map-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  margin-top: 5px;
}

.msg {
  font-size: smaller;
}
</style>
