<script setup>
const props = defineProps(["index", "element"]);
</script>

<template>
  <v-card class="travel-route-list-item" elevation="4">
    <div class="d-flex ga-4" style="padding: 10px; min-width: 240px">
      <div class="d-flex flex-column ga-1" style="width: 100%">
        <div class="d-flex row ga-2 align-center">
          <div
            style="
              font-weight: bold;
              font-size: 10pt;
              text-decoration: none;
              color: #101010;
              cursor: pointer;
            "
          >
            {{ props.element.name }}
          </div>
          <div style="font-size: 8pt">
            {{
              `${props.element.address.split(" ")[0]} ${props.element.address.split(" ")[1]}`
            }}
          </div>
        </div>
        <div class="d-flex ga-1">
          <v-chip size="small" style="width: fit-content">
            {{ props.element.description }}
          </v-chip>
          <v-chip size="small" style="width: fit-content">
            {{ props.element.type === "heritage" ? "문화재" : "경유지" }}
          </v-chip>
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
