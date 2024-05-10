<script setup>
const props = defineProps(["spot", "index", "listSize"]);

const dividerCheck = () => {
  return props.index < props.listSize - 1;
};

const openWindow = (url) => {
  window.open(url);
};
</script>

<template>
  <v-list-item style="width: 100%; margin: 0px">
    <div class="d-flex ga-4" style="padding: 10px">
      <img
        src="/src/assets/spot_image_test.gif"
        style="width: 60px; height: 60px"
      />
      <div class="d-flex flex-column ga-1" style="width: 100%">
        <div
          :href="spot.place_url"
          style="
            font-weight: bold;
            font-size: 10pt;
            text-decoration: none;
            color: #101010;
            cursor: pointer;
          "
          @click="
            () => {
              openWindow(spot.place_url);
            }
          "
        >
          <v-tooltip>{{ spot.place_name }}</v-tooltip>
          {{
            `${spot.place_name.slice(0, 11)}${spot.place_name.length >= 11 ? "..." : ""}`
          }}
        </div>

        <div style="font-size: 8pt">
          {{
            `${spot.address_name.slice(0, 16)}${spot.address_name.length >= 16 ? "..." : ""}`
          }}
        </div>
        <div
          class="d-flex flex-row"
          style="width: 100%; justify-content: space-between"
        >
          <v-chip size="small">{{
            spot.category_name.split(" > ").pop()
          }}</v-chip>
          <v-btn density="compact" icon="mdi-plus"></v-btn>
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
