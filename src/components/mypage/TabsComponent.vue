<script setup>
import RouteList from "@/components/mypage/RouteList.vue";
import ProfileDetail from "@/components/mypage/ProfileDetail.vue";
import LastTripList from "@/components/mypage/LastTripList.vue";
import CardList from "@/components/mypage/CardList.vue";
import { ref } from "vue";

const tab = ref("plan");
</script>

<template>
  <div id="tabs" class="bg-white">
    <v-tabs v-model="tab">
      <v-tab value="plan"> 여행계획✈️</v-tab>
      <v-tab value="past-plan"> 지난여행🗺️ </v-tab>
      <v-tab value="card"> 여행카드📷</v-tab>
      <v-tab value="profile"> 회원정보😎 </v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="plan">
        <RouteList v-if="tab === 'plan'" />
      </v-tabs-window-item>
      <v-tabs-window-item value="past-plan">
        <LastTripList v-if="tab === 'past-plan'" />
      </v-tabs-window-item>
      <v-tabs-window-item value="card"
        ><CardList v-if="tab === 'card'"
      /></v-tabs-window-item>
      <v-tabs-window-item value="profile"
        ><ProfileDetail v-if="tab === 'profile'"
      /></v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

<style scoped>
#tabs {
  border-radius: 10px;
  padding: 10px;

  box-shadow: 0 0 10px rgba(10, 10, 10, 0.3);
}
</style>
