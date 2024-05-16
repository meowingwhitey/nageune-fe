<script setup>
const items = ["Foo", "Bar", "Fizz", "Buzz"];
</script>

<template>
  <v-card>
    <v-select
      clearable
      hide-details="true"
      variant="solo"
      :items="items"
      density="compact"
      label="검색 조건"
      multiple
    ></v-select>
  </v-card>
</template>

<style scoped></style>
