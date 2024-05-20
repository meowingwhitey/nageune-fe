<script setup>
import { mergeProps } from "vue";
import { useUserStore } from "@/stores/userStore.js";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const items = [
  {
    text: "마이페이지",
    onclick: () => {
      router.push({
        name: "mypage",
      });
    },
  },
  {
    text: "로그아웃",
    onclick: () => {
      userStore.userLogout();
    },
  },
];
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props: menu }">
      <v-btn
        v-bind="mergeProps(menu)"
        id="map-overlay-user-btn"
        icon="mdi-account"
      ></v-btn>
    </template>
    <v-list>
      <v-list-item v-for="(item, i) in items" :key="i" @click="item.onclick">
        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped>
#map-overlay-user-btn {
  position: fixed;
  z-index: 900;
  right: 40px;
  top: 40px;
}
</style>
