<script setup>
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  route: Array,
});

const spots = ref([]);

onMounted(() => {
  spots.value = props.route.slice(
    0,
    props.route.length > 5 ? 5 : props.route.length,
  );
});

watch(
  () => props.route,
  (item) => {
    console.log("아이템 변경");
    spots.value = props.route.slice(
      0,
      props.route.length > 5 ? 5 : props.route.length,
    );
  },
);
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
        <div class="text-body-2 font-weight-thin">{{ s.date.slice(-5) }}</div>
      </template>
      <div class="text-body-1 font-weight-medium">{{ s.name }}</div>
    </v-timeline-item>
  </v-timeline>
</template>

<style scoped></style>
