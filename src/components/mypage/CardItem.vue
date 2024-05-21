<script setup>
//클릭하면 지난 여행 기록으로 연결되게
// 앞면: 문화재 이름+사진 -> 퀴즈 풀었으면 컬러 못풀었으면 흑백
// 뒷면: 맞춘경우 -> stamp_time 문제+답변
//      틀린 경우 -> 퀴즈 풀기 클릭버튼

import QuizDialog from "./QuizDialog.vue";

import { localAxios } from "@/util/axios_interceptor";
import { ref, onMounted } from "vue";
const REST_HERITAGE_API = `/heritage`;
const local = localAxios();

const props = defineProps({
  card: Object,
});

const heritage = ref({
  imageurl: "",
});

const getHeritageById = async (id) => {
  await local
    .get(`${REST_HERITAGE_API}/id`, { params: { heritageId: id } })
    .then((res) => {
      heritage.value = res.data;
      if (!heritage.value.imageurl)
        //   디폴트이미지설정
        heritage.value.imageurl = "/src/assets/profile.png";
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(async () => {
  await getHeritageById(props.card.heritageId);
  console.log(heritage.value);
});

const dialog = ref(false);
const closeDialog = () => {
  dialog.value = false;
};
</script>

<template>
  <div class="flip ma-4">
    <div class="card" @click="test">
      <!-- 앞면 -->
      <div
        class="front"
        :class="{ correct: card.correct === 0 ? true : false }"
      >
        <div>
          <div class="card-img-box">
            <img :src="heritage.imageurl" />
          </div>
          <h1>{{ heritage.title }}</h1>
        </div>
      </div>
      <!-- 뒷면 -->
      <div class="back">
        <div>
          <template v-if="card.correct === 1">
            <p>{{ card.problem }}</p>
            <p>{{ card.answer }}</p>
          </template>

          <template v-else>
            <div @click="dialog = true">
              <h1>퀴즈 풀기</h1>
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- 모달창 퀴즈 풀기 -->
    <QuizDialog
      v-model="dialog"
      @close-dialog="closeDialog"
      :heritage-id="card.heritageId"
    />
  </div>
</template>

<style scoped>
.correct {
  filter: grayscale(100%);
}

.card-img-box {
  width: 230px;
  height: 150px;
}

.card-img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.flip {
  width: 250px;
  height: 320px;
  position: relative;
  perspective: 1100px;
}

.card {
  width: 100%;
  height: 100%;
  position: relative;
  transition: 0.4s;
  transform-style: preserve-3d;
}

.front,
.back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  border: 2px solid rgb(238, 238, 238);
}

.front {
  background: rgb(255, 255, 255);
}

.back {
  background: rgb(77, 77, 77);
  transform: rotateY(180deg);
}

.flip:hover .card {
  transform: rotateY(180deg);
  box-shadow: 0 0 15px rgba(189, 189, 189, 0.9);
}
</style>
