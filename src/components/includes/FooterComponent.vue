<script setup>
import CopyrightComponent from "@/components/includes/CopyrightComponent.vue";
</script>

<template>
  <div id="footer">
    <v-container>
      <div class="mt-5 d-flex justify-center">
        <CopyrightComponent />
      </div>
    </v-container>
  </div>
</template>

<style scoped>
#footer {
  background-color: rgb(158, 158, 158);
  height: 250px;
}
</style>
