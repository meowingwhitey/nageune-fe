<script setup></script>

<template>
  <v-card id="map-search-bar">
    <v-text-field
      density="compact"
      append-inner-icon="mdi-magnify"
      :label="`문화재 검색`"
      variant="solo"
      hide-details
      single-line
    ></v-text-field>
  </v-card>
</template>

<style scoped>
#map-search-bar {
  width: 100%;
  padding: 0px;
  display: flex;
  align-items: center;
}
</style>
