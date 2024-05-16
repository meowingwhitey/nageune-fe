<script setup>
import RouteList from "@/components/mypage/RouteList.vue";
import ProfileDetail from "@/components/mypage/ProfileDetail.vue";
import { ref } from "vue";

const tab = ref("plan");
</script>

<template>
  <div id="tabs">
    <v-tabs v-model="tab">
      <v-tab value="plan"> 여행계획 </v-tab>
      <v-tab value="past-plan"> 지난여행 </v-tab>
      <v-tab value="card"> 카드 </v-tab>
      <v-tab value="profile"> 회원정보 </v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="plan">
        <RouteList />
      </v-tabs-window-item>
      <v-tabs-window-item value="past-plan">지난여행</v-tabs-window-item>
      <v-tabs-window-item value="card">카드</v-tabs-window-item>
      <v-tabs-window-item value="profile"><ProfileDetail /></v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

<style scoped>
#tabs {
  border: 2px solid rgb(245, 245, 245);
  border-radius: 10px;
  padding: 10px;
}
</style>
