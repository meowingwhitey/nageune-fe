<script setup>
defineProps({
  text: String,
});
</script>

<template>
  <v-chip
    variant="tonal"
    density="comfortable"
    size="small"
    color="light-green-darken-4"
  >
    {{ text }}
  </v-chip>
</template>

<style scoped></style>
