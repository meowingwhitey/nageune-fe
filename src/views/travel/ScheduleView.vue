<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { useTravelStore } from "@/stores/travelStore.js";
import { useMapStore } from "@/stores/mapStore";
const mapStore = useMapStore();
/**
 * [date-fns]
 * https://date-fns.org/
 */
import { addDays, subDays, differenceInDays, format } from "date-fns";

const router = useRouter();
const dialog = ref(true);
const allowedEndDate = ref({
  min: "0000-01-01",
  max: "9999-12-31",
});
// 00:00:00부터 계산하기 위해 아래처럼 출발일 설정
const startDate = ref(new Date(format(new Date(), "MM/dd/yyyy")));
const endDate = ref(addDays(startDate.value, 6));
const travelStore = useTravelStore();

// 시작 날짜에 따른 선택 가능 일자 설정
watch(startDate, () => {
  if (
    differenceInDays(endDate.value, startDate.value) > 6 ||
    differenceInDays(endDate.value, startDate.value) < 0
  ) {
    endDate.value = addDays(startDate.value, 6);
  }
  allowedEndDate.value.min = startDate.value;
  allowedEndDate.value.max = addDays(startDate.value, 6);
});

// 선택한 날짜 옵션이 유효할 경우 nextbtn 활성화를 위한 computed
const isDateValid = computed(() => {
  return differenceInDays(endDate.value, startDate.value) < 7;
});

onMounted(() => {
  allowedEndDate.value.min = subDays(startDate.value, 1);
  allowedEndDate.value.max = endDate.value;
});

const onPreviousClick = () => {
  router.push({ name: "travel-create" });
};

const onNextClick = () => {
  // 출발, 도착일자 store에 저장
  travelStore.startDate = startDate.value;
  travelStore.endDate = endDate.value;
  // store에 여행 경로 생성
  travelStore.createRouteList();

  // 다음 단계로!
  router.push({
    name: "travel-search-heritage",
  });
};
</script>

<template>
  <div>
    <v-dialog
      v-if="mapStore.isKakaoMapLoaded"
      v-model="dialog"
      max-width="730px"
      persistent
    >
      <v-card class="schedule-dialog-card">
        <v-card-title class="text-h6 text-md-h5 text-lg-h4">
          <v-icon icon="mdi-calendar-edit-outline" />
          여행 기간이 어떻게 되시나요?
        </v-card-title>
        <div>
          <u>* 여행 일자는 <strong>최대 7일</strong>까지 설정 가능합니다.</u>
        </div>
        <div>
          <u>
            여행 경로는 가까운 장소 순으로 자동 정렬 후 직접 수정하실 수 있어요
            😉
          </u>
        </div>
        <div style="height: 20px"></div>

        <div class="d-flex flex-row">
          <div>
            <v-chip color="#E57373" variant="flat"> 출발일 </v-chip>
            <v-locale-provider locale="ko">
              <v-date-picker
                show-adjacent-months
                :hide-header="true"
                v-model="startDate"
              ></v-date-picker>
            </v-locale-provider>
          </div>

          <div>
            <v-chip color="#E57373" variant="flat"> 도착일 </v-chip>
            <v-locale-provider locale="ko">
              <v-date-picker
                show-adjacent-months
                :hide-header="true"
                :max="allowedEndDate.max"
                :min="allowedEndDate.min"
                v-model="endDate"
              ></v-date-picker>
            </v-locale-provider>
          </div>
        </div>

        <v-spacer />
        <div class="d-flex ga-2 row">
          <v-btn
            @click="onPreviousClick"
            rounded="xl"
            color="#90A4AE"
            append-icon="mdi-arrow-u-left-top"
          >
            여행 닉변권 쓰기
          </v-btn>
          <v-btn
            @click="onNextClick"
            rounded="xl"
            color="#26A69A"
            append-icon="mdi-arrow-right"
            :disabled="!isDateValid"
          >
            {{ !isDateValid ? "날짜를 선택해주세요" : "방문 장소 설정하기" }}
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.schedule-dialog-card {
  max-width: 730px;
  padding: 20px;
  display: flex;
  align-items: center;
}
</style>
