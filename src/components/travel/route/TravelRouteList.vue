<script setup>
import TravelRouteListItem from "./TravelRouteListItem.vue";
import draggable from "vuedraggable";
import { ref } from "vue";

const props = defineProps(["routeList"]);
// const add = () => {
//   this.list.push({ name: "Juan" });
// };
// const clone = (el) => {
//   return {
//     name: el.name + " cloned",
//   };
// };
const log = (evt) => {
  window.console.log(evt);
};
</script>

<template>
  <div style="display: flex; flex-direction: column">
    <h3>{{ props.routeList.date }}</h3>
    <draggable
      class="list-group"
      :list="props.routeList.route"
      group="people"
      @change="log"
      ghost-class="ghost"
      itemKey="name"
    >
      <template #item="{ element, index }">
        <TravelRouteListItem
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
</style>
