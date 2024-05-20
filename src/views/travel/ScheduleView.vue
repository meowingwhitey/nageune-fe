<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRouter } from "vue-router";
/**
 * [date-fns]
 * https://date-fns.org/
 */
import { addDays, differenceInDays } from "date-fns";

const router = useRouter();
const dialog = ref(true);
const allowdEndDate = ref({
  min: "0000-01-01",
  max: "9999-12-31",
});
const today = new Date();
const startDate = ref(new Date());
const endDate = ref(addDays(new Date(), 7));

watch(startDate, () => {
  if (differenceInDays(startDate.value, endDate.value) > 7) {
    endDate.value = addDays(startDate.value, 7);
  }
  allowdEndDate.value.min = startDate.value;
  allowdEndDate.value.max = addDays(startDate.value, 7);
});

onMounted(() => {
  allowdEndDate.value.min = startDate.value;
  allowdEndDate.value.max = endDate.value;
});

const onNextClick = () => {
  router.push({
    name: "travel-search-heritage",
  });
};
</script>

<template>
  <v-dialog v-model="dialog" max-width="730px" persistent>
    <v-card class="schedule-dialog-card">
      <v-card-title class="text-h6 text-md-h5 text-lg-h4">
        <v-icon icon="mdi-calendar-edit-outline" />
        여행 기간이 어떻게 되사나요?
      </v-card-title>
      <div>
        <u>* 여행 일자는 <strong>최대 7일</strong>까지 설정 가능합니다.</u>
      </div>
      <div>
        <u>
          여행 경로는 가까운 장소 순으로 자동 정렬 후 직접 수정하실 수 있어요 😉
        </u>
      </div>
      <div style="height: 20px"></div>

      <div class="d-flex flex-row">
        <div>
          <v-chip color="#E57373" variant="flat"> 출발일 </v-chip>
          <v-locale-provider locale="ko">
            <v-date-picker
              show-adjacent-months
              hide-header="true"
              v-model="startDate"
            ></v-date-picker>
          </v-locale-provider>
        </div>

        <div>
          <v-chip color="#E57373" variant="flat"> 도착일 </v-chip>
          <v-locale-provider locale="ko">
            <v-date-picker
              show-adjacent-months
              hide-header="true"
              :max="allowdEndDate.max"
              :min="allowdEndDate.min"
              v-model="endDate"
            ></v-date-picker>
          </v-locale-provider>
        </div>
      </div>

      <v-spacer />
      <v-btn
        @click="onNextClick"
        rounded="xl"
        color="#26A69A"
        append-icon="mdi-arrow-right"
      >
        방문 장소 설정
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.schedule-dialog-card {
  max-width: 730px;
  padding: 20px;
  display: flex;
  align-items: center;
}
</style>
