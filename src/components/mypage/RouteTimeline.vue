<script setup>
import { onMounted, ref, onBeforeUpdate } from "vue";

const props = defineProps({
  plans: Array,
});

const spots = ref([]);

const makeSpotList = () => {
  let cnt = 0; //최대 5개만 표시

  props.plans.forEach((day) => {
    let json = JSON.parse(day.route);

    json.forEach((spot) => {
      if (spot.type === "heritage") {
        spots.value.push({ date: day.visitDate, name: spot.name });
        cnt++;
      }
    });
  });

  spots.value = spots.value.slice(0, 5);
};

onMounted(async () => {});

onBeforeUpdate(async () => {
  await makeSpotList();
  // console.log(spots.value);
});
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
        <div class="text-body-2 font-weight-thin">
          {{ s.date.slice(5, 10) }}
        </div>
      </template>
      <div class="timeline-text text-body-1 font-weight-medium">
        <p style="word-break: keep-all">{{ s.name }}</p>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<style scoped>
.timeline-text {
  width: 115px;
}
</style>
