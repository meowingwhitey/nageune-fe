<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();
const props = defineProps(["menu"]);

const changeMenu = (clickedMenu) => {
  menu.value = clickedMenu;
};
const emit = defineEmits(["setMenu"]);
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
      :class="props.menu === 'heritage' ? 'nav-menu-selected' : ''"
      @click="emit('setMenu', 'heritage')"
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
      :class="props.menu === 'place' ? 'nav-menu-selected' : ''"
      @click="emit('setMenu', 'place')"
    >
      <img
        src="/src/assets/spot_icon.png"
        alt="App Logo"
        style="width: 65%; height: auto"
      />
      <p>경유지</p>
    </div>
    <v-divider />
    <div class="nav-menu">경로 설정</div>
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
