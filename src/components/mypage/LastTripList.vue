<script setup>
import RouteItem from "@/components/mypage/RouteItem.vue";
import LastTripDetail from "@/components/mypage/LastTripDetail.vue";
import { ref, onMounted } from "vue";
import { localAxios } from "@/util/axios_interceptor";
import { useTokenStore } from "@/stores/tokenStore";

const local = localAxios();
const tokenStore = useTokenStore();
const REST_TRAVELHISTORY_API = `/travelHistory`;

const plansId = ref([]);

const getSpotList = async () => {
  await local
    .get(`${REST_TRAVELHISTORY_API}/lastTravelList`)
    .then((res) => {
      console.log(res);
      plansId.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
onMounted(() => {
  getSpotList();
});

const dialog = ref(false);
const closeDialog = () => {
  dialog.value = false;
};

const travelId = ref(0);
const travelTitle = ref("");
const clickBtn = (id, tripTitle, isLast) => {
  travelId.value = id;
  travelTitle.value = tripTitle;
  dialog.value = true;
};

//지난 여행 리스트 get
</script>

<template>
  <div>
    <!-- <SearchDate /> -->
    <div class="mt-3 d-flex align-center overflow-auto">
      <!-- 검색? -->
      <RouteItem
        v-for="id in plansId"
        :key="id"
        :id="id"
        @click-btn="clickBtn"
        :isLast="true"
      />
    </div>
    <LastTripDetail
      v-model="dialog"
      @close-dialog="closeDialog"
      :id="travelId"
      :trip-title="travelTitle"
    />
  </div>
</template>

<style scoped>
#add-route-box {
  min-width: 270px;
  min-height: 520px;
}
</style>
