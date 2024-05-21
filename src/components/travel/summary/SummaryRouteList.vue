<script setup>
import SummaryRouteListItem from "./SummaryRouteListItem.vue";
import draggable from "vuedraggable";
import { ref, computed, watch } from "vue";
import { useTravelStore } from "@/stores/travelStore.js";
const props = defineProps(["routeList", "day"]);
const travelStore = useTravelStore();
const dragOptions = computed(() => {
  return {
    disabled: true,
  };
});
const weekDay = ["일", "월", "화", "수", "목", "금", "토"];
const colorPreset = [
  "#FFA000",
  "#FFB300",
  "#FFCA28",
  "#FFD54F",
  "#FFE082",
  "#FFECB3",
  "#FFF8E1",
];
</script>

<template>
  <div style="display: flex; flex-direction: column; height:">
    <div class="d-flex flex-row ga-2" style="align-items: center">
      <v-chip color="#E0F2F1" variant="flat">
        {{
          `${props.routeList.date}(${weekDay[new Date(props.routeList.date).getDay()]})`
        }}
      </v-chip>
    </div>

    <draggable
      class="list-group"
      :list="props.routeList.route"
      v-bind="dragOptions"
      ghost-class="ghost"
    >
      <template #item="{ element, index }">
        <SummaryRouteListItem
          class="list-group-item"
          :index="index"
          :element="element"
        />
      </template>
    </draggable>
  </div>
</template>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
/* 
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
} */
</style>
