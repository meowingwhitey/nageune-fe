<script setup>
import { mergeProps } from "vue";
const items = [
  { title: "회원 정보" },
  { title: "로그아웃" },
  { title: "몰?루" },
  { title: "아!루" },
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
      <v-list-item v-for="(item, index) in items" :key="index">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
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
