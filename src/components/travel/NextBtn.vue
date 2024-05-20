<script setup>
const props = defineProps(["text"]);
</script>

<template>
  <v-btn
    rounded="xl"
    color="#26A69A"
    class="next-btn"
    append-icon="mdi-arrow-right"
    >{{ props.text }}</v-btn
  >
</template>

<style scoped>
.next-btn {
  height: 35px;
  flex: 1 0 auto;
}
</style>
