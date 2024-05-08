<script setup>
import { ref } from "vue";

const spots = ref([
  { date: "04.25", spot: "첨성대" },
  { date: "04.25", spot: "불국사 다보탑" },
  { date: "04.26", spot: "불국사 삼층석탑" },
  { date: "04.26", spot: "석굴암" },
  { date: "04.27", spot: "기타" },
]);
</script>

<template>
  <v-timeline
    side="end"
    line-inset="5"
    line-thickness="3"
    truncate-line="both"
    align="start"
  >
    <v-timeline-item
      v-for="s in spots"
      size="smaller"
      dot-color="blue-grey-lighten-3"
      height="35"
    >
      <template v-slot:opposite>
        <div class="text-body-2 font-weight-thin">{{ s.date }}</div>
      </template>
      <div class="text-body-1 font-weight-medium">{{ s.spot }}</div>
    </v-timeline-item>
  </v-timeline>
</template>

<style scoped></style>
