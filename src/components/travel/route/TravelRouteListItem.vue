<script setup>
const props = defineProps(["index", "element"]);
</script>

<template>
  <v-card class="travel-route-list-item">
    <div class="d-flex ga-4" style="padding: 10px">
      <img
        src="/src/assets/spot_image_test.gif"
        style="width: 60px; height: 60px"
      />
      <div class="d-flex flex-column ga-1" style="width: 100%">
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

        <div style="font-size: 8pt">{{ props.element.address }}</div>
        <div
          class="d-flex flex-row"
          style="width: 100%; justify-content: space-between"
        >
          <v-chip size="small">테스트 분류</v-chip>
          <v-btn density="compact" icon="mdi-plus"></v-btn>
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
