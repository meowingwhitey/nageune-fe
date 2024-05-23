<script setup>
//클릭하면 지난 여행 기록으로 연결되게
// 앞면: 문화재 이름+사진 -> 퀴즈 풀었으면 컬러 못풀었으면 흑백
// 뒷면: 맞춘경우 -> stamp_time 문제+답변
//      틀린 경우 -> 퀴즈 풀기 클릭버튼

import QuizDialog from "./QuizDialog.vue";

import { localAxios } from "@/util/axios_interceptor";
import { ref, onMounted } from "vue";
import { compareAsc, format } from "date-fns";
const REST_HERITAGE_API = `/heritage`;
const local = localAxios();

const props = defineProps({
  card: Object,
  isMobile: Boolean,
});

const heritage = ref({
  imageurl: "",
  cardId: 0,
});

const getHeritageById = async (id) => {
  await local
    .get(`${REST_HERITAGE_API}/detail`, { params: { heritageId: id } })
    .then((res) => {
      heritage.value = res.data;
      if (!heritage.value.imageurl)
        //   디폴트이미지설정
        heritage.value.imageurl = "/src/assets/not_found_img.jpg";
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(async () => {
  console.log(props.card);
  await getHeritageById(props.card.heritageId);
  // console.log(heritage.value);
});

const emit = defineEmits(["refreshCard"]);

const dialog = ref(false);
const closeDialog = () => {
  dialog.value = false;
  emit("refreshCard");
};

const quiz = ref({
  problem: "", //문제
  answerChoice: 0,
  candidates: [], //선택지
});

//퀴즈 풀기 창 띄우기
const openDialog = () => {
  //  get: heritage/quiz 호출

  // private String question;
  // private int answerChoice;
  // private List<String> candidates;

  local
    .get(`${REST_HERITAGE_API}/quiz`, {
      params: { cardId: props.card.cardId },
    })
    .then((response) => {
      quiz.value = response.data;
    })
    .catch((err) => {
      console.log(err);
    });

  dialog.value = true;
};
</script>

<template>
  <div class="flip ma-4" :class="[{ mobile: isMobile }, { pc: !isMobile }]">
    <div class="card" @click="test">
      <!-- 앞면 -->
      <div
        class="front"
        :class="{ correct: card.correct === 0 ? true : false }"
      >
        <div class="front-content">
          <div class="card-content-box">
            <div class="front-content-item">
              <p class="card-title">{{ heritage.title }}</p>
              <v-chip
                variant="flat"
                density="comfortable"
                size="small"
                color="teal"
              >
                {{ heritage.era }}
              </v-chip>
            </div>
          </div>
          <div class="card-gradient"></div>
          <div class="card-img-box">
            <img :src="heritage.imageurl" />
          </div>
        </div>
      </div>
      <!-- 뒷면 -->
      <div
        class="back"
        :class="{ 'correct-back': card.correct === 0 ? true : false }"
      >
        <div class="back-content">
          <template v-if="card.correct === 1">
            <div class="quiz-box">
              <p class="quiz-date">
                {{
                  format(new Date(card.stampTime), "📌yyyy년 MM월 dd일 방문")
                }}
              </p>
              <div>
                <p class="quiz-problem mt-3">{{ card.problem }}</p>
              </div>
              <p class="quiz-answer mt-3">✔️정답: {{ card.answer }}</p>
            </div>
          </template>

          <template v-else>
            <div @click="openDialog">
              <h1>퀴즈✏️</h1>
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- 모달창 퀴즈 풀기 -->
    <QuizDialog
      v-model="dialog"
      @close-dialog="closeDialog"
      :card-id="card.cardId"
      :quiz="quiz"
      :dialog="dialog"
    />
  </div>
</template>

<style scoped>
.correct {
  filter: grayscale(100%);
  background-color: #f6f6f6 !important;
  border: 1px solid rgb(203, 203, 203) !important;
}

@media screen and (max-width: 500px) {
  .flip {
    width: 80vw;
    height: 180px;
  }
}

/* pc버전 */
@media screen and (min-width: 500px) {
  .flip {
    width: 250px;
    height: 350px;
  }
}

.card-img-box {
  width: 100%;
  height: 100%;
}

.front-content {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
}

.card-img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
}

.card-content-box .front-content-item {
  position: absolute;
  z-index: 1;
  top: 5%;
  left: 5%;
}

.card-title {
  font-weight: bolder;
  word-break: keep-all;
  color: white;
  text-shadow:
    -0.5px 0px black,
    0px 0.5px black,
    0.5px 0px black,
    0px -0.5px black;
}

.card-gradient {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    0deg,
    rgba(178, 223, 219, 0.5) 0%,
    rgba(255, 255, 255, 0) 30%
  );
  z-index: 1;
}

.correct .card-gradient {
  background: linear-gradient(
    0deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(255, 255, 255, 0) 80%
  ) !important;
}

.quiz-date {
  text-align: center;
  font-size: small;
}
.quiz-box {
  width: 90%;
  margin: auto;
}

.flip {
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
  border: 2px solid rgb(238, 238, 238);
}

.front {
  background: rgb(255, 255, 255);
  border-radius: 5px;
}

.back {
  background: #009688;
  transform: rotateY(180deg);
  color: #fff;
}

.correct-back {
  background-color: #3d3d3d !important;
}

.correct-back :hover {
  cursor: pointer;
}

.flip:hover .card {
  transform: rotateY(180deg);
  box-shadow: 0 0 15px rgba(189, 189, 189, 0.9);
}

.card-content-box {
  width: 230px;
  height: 150px;
}

.card-title {
  font-size: larger;
}
</style>
