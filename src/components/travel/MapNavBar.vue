<script setup>
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
const menuList = [
  {
    title: "문화재",
    image: "/src/assets/logo_test.gif",
  },
  {
    title: "경유지",
    image: "/src/assets/logo_test.gif",
  },
  {
    title: "경로 설정",
    image: "/src/assets/logo_test.gif",
  },
  {
    title: "문화재",
    image: "/src/assets/logo_test.gif",
  },
];
</script>

<template>
  <v-card id="map-nav-bar">
    <div
      class="nav-menu"
      @click="
        () => {
          router.push({ name: 'index' });
        }
      "
    >
      <img
        src="/src/assets/logo_test.gif"
        alt="App Logo"
        style="width: 80%; height: auto"
      />
    </div>
    <v-divider />
    <div
      class="nav-menu"
      :class="route.name === 'travel-schedule' && 'nav-menu-selected'"
    >
      <v-icon icon="mdi-calendar-multiselect" size="x-large"></v-icon>
      <p>일정 설정</p>
    </div>
    <v-divider />
    <div
      class="nav-menu"
      :class="route.name === 'travel-search-heritage' && 'nav-menu-selected'"
    >
      <v-icon icon="mdi-bank" size="x-large"></v-icon>
      <p>문화제</p>
    </div>
    <v-divider />
    <div
      class="nav-menu"
      :class="route.name === 'travel-search-place' && 'nav-menu-selected'"
    >
      <v-icon icon="mdi-store-outline" size="x-large"></v-icon>
      <p>경유지</p>
    </div>
    <v-divider />
    <div
      class="nav-menu"
      :class="route.name === 'travel-route' && 'nav-menu-selected'"
    >
      <v-icon icon="mdi-map-legend" size="x-large"></v-icon>
      경로 설정
    </div>
    <v-divider />
    <div
      class="nav-menu"
      :class="route.name === 'travel-summary' && 'nav-menu-selected'"
    >
      <v-icon icon="mdi-pencil-outline" size="x-large"></v-icon>
      여행 요약
    </div>
    <v-divider />
  </v-card>
</template>

<style scoped>
.nav-menu {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 10pt;
  font-weight: bold;
  transition-property: background-color;
  transition-duration: 0.5s;
}

.nav-menu:hover {
  background-color: #cfd8dc;
}

.nav-menu-selected {
  background-color: #b0bec5;
}

#map-nav-bar {
  position: fixed;
  left: 40px;
  top: 40px;
  height: calc(100vh - 80px);
  width: 60px;
  flex-direction: column;
  display: flex;
  z-index: 900;
  background-color: white;
}
</style>
