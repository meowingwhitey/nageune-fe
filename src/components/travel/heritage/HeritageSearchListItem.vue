<script setup>
import { useTravelStore } from "@/stores/travelStore.js";
import { ref } from "vue";

const props = defineProps(["spot", "index", "listSize"]);
const travelStore = useTravelStore();

const dividerCheck = () => {
  return props.index < props.listSize - 1;
};

const isAdded = ref(false);
const addToHeritageList = () => {
  isAdded.value = true;
  travelStore.heritageList.push(props.spot);
};
const removeFromHeritageList = () => {
  isAdded.value = false;
  travelStore.heritageList = travelStore.heritageList.filter((item) => {
    return item.heritageId !== props.spot.heritageId;
  });
};

function replaceByDefault(e) {
  e.target.src = "/src/assets/image_not_found.png";
}
function openPage() {
  console.log(props.spot.pageUrl);
  console.log(window);
  window.open(props.spot.pageUrl);
}
</script>

<template>
  <v-list-item style="width: 100%; margin: 0px">
    <div class="d-flex ga-4" style="padding: 10px">
      <img
        :src="spot.imageUrl"
        @error="replaceByDefault"
        style="
          height: 60px;
          min-width: 60px;
          object-fit: cover;
          border-radius: 10px;
        "
      />
      <div class="d-flex flex-column" style="width: 100%">
        <div
          @click="openPage"
          style="
            font-weight: bold;
            font-size: 10pt;
            text-decoration: none;
            color: #101010;
            cursor: pointer;
          "
        >
          {{
            `${spot.title.slice(0, 11)}${spot.title.length >= 11 ? "..." : ""}`
          }}
        </div>

        <div style="font-size: 9pt">
          {{ `${spot.location} ${spot.locationSub}` }}
        </div>
        <div
          class="d-flex flex-row"
          style="width: 100%; justify-content: space-between"
        >
          <v-chip size="small">{{ `${spot.era}` }}</v-chip>
          <v-btn
            density="compact"
            icon="mdi-plus"
            @click="addToHeritageList"
            v-show="!isAdded"
          ></v-btn>
          <v-btn
            density="compact"
            icon="mdi-check"
            color="#66BB6A"
            @click="removeFromHeritageList"
            v-show="isAdded"
          ></v-btn>
        </div>
      </div>
    </div>
  </v-list-item>
  <v-divider
    style="margin-left: 10px; margin-right: 10px"
    v-if="dividerCheck()"
  ></v-divider>
</template>

<style scoped></style>
