<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
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
      :class="route.query.search === 'heritage' && 'nav-menu-selected'"
      @click="
        router.push({
          name: 'travel-search',
          query: { search: 'heritage' },
        })
      "
    >
      <img
        src="/src/assets/heritage_icon.png"
        alt="App Logo"
        style="width: 65%; height: auto"
      />
      <p>문화제</p>
    </div>
    <v-divider />
    <div
      class="nav-menu"
      :class="route.query.search === 'place' && 'nav-menu-selected'"
      @click="
        () => {
          router.push({
            name: 'travel-search',
            query: { search: 'place' },
          });
        }
      "
    >
      <img
        src="/src/assets/spot_icon.png"
        alt="App Logo"
        style="width: 65%; height: auto"
      />
      <p>경유지</p>
    </div>
    <v-divider />
    <div
      class="nav-menu"
      @click="
        () => {
          router.push({ name: 'route' });
        }
      "
    >
      경로 설정
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
  cursor: pointer;
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
