<script setup>
const props = defineProps(["index", "element"]);
function replaceByDefault(e) {
  e.target.src = "/src/assets/image_not_found.png";
}
</script>

<template>
  <v-card class="travel-route-list-item" elevation="4">
    <div class="d-flex ga-4" style="padding: 10px; min-width: 240px">
      <img
        :src="element.imageUrl || '/src/assets/image_not_found.png'"
        @error="replaceByDefault"
        style="
          height: 60px;
          min-width: 60px;
          object-fit: cover;
          border-radius: 10px;
        "
      />
      <div class="d-flex flex-column ga-1" style="width: 100%">
        <div
          style="
            font-weight: bold;
            font-size: 10pt;
            text-decoration: none;
            color: #101010;
            cursor: pointer;
            text-wrap: wrap;
          "
        >
          {{
            `${props.element.name.slice(0, 11)}${props.element.name.length >= 11 ? "..." : ""}`
          }}
        </div>

        <div style="font-size: 8pt">{{ props.element.address }}</div>
        <div
          class="d-flex flex-row"
          style="width: 100%; justify-content: space-between"
        >
          <v-chip size="x-small">{{ props.element.description }}</v-chip>
        </div>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.travel-route-list-item {
  cursor: grab;
  padding: 0 8px 0 8px;
  margin-top: 8px;
}
</style>
