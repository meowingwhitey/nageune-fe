<script setup>
import { ref, watch } from "vue";
import { localAxios } from "@/util/axios_interceptor";

const local = localAxios();
const emit = defineEmits(["closeDialog"]);

const REST_HERITAGE_API = `/heritage`;

const props = defineProps({
  cardId: Number,
  quiz: Object,
  dialog: Boolean,
});

const quizObject = ref(null);
const loading = ref(false);

watch(
  () => props.quiz,
  (newQuiz) => {
    quizObject.value = newQuiz;
    console.log("퀴즈: ", quizObject.value);
    loading.value = true;
  },
);

watch(
  () => props.dialog,
  (currDialog) => {
    if (!currDialog) {
      quizObject.value = null;
      selected.value = -1;
    }
  },
);

const closeDialog = () => {
  quizObject.value = null;
  selected.value = -1;
  emit("closeDialog");
};

const selected = ref(-1);
const selectAnswer = (idx) => {
  selected.value = idx;
  console.log(selected.value);
};

//정답 제출
const submitAnswer = () => {
  if (selected.value === -1) {
    //정답 선택 필요
  } else {
    //정답 여부 확인 필요
    //정답임
    if (selected.value === quizObject.value.answerChoice) {
      local
        .post(`${REST_HERITAGE_API}/quiz`, {
          cardId: props.cardId,
          problem: quizObject.value.problem,
          answer: quizObject.value.candidates[selected.value],
          correct: 1,
        })
        .then((res) => {
          console.log("정답!");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("오답!", selected.value, quizObject.answerChoice);
    }
  }
};
</script>

<template>
  <v-dialog max-width="800">
    <v-card>
      <v-card-title class="text-center text-h5 font-weight-bold mt-10">
        📝퀴즈📝
      </v-card-title>
      <v-card-item class="pt-0">
        <!-- 퀴즈 로딩 -->
        <template v-if="!quizObject">
          <v-skeleton-loader
            class="mx-auto"
            width="100%"
            type="text, image"
          ></v-skeleton-loader>
        </template>

        <!-- 퀴즈 출력 -->
        <template v-else>
          <v-item-group selected-class="bg-green-darken-4">
            <!-- 선택지 -->
            <v-container>
              <v-row>
                <v-col>
                  <p class="quiz-problem">{{ quiz.problem }}</p>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  v-for="(selection, index) in quizObject.candidates"
                  :key="index"
                  cols="12"
                >
                  <v-item v-slot="{ isSelected, selectedClass, toggle }">
                    <v-card
                      :class="['d-flex align-center', selectedClass]"
                      height="80"
                      dark
                      variant="flat"
                      color="green-lighten-5"
                      @click="toggle(), selectAnswer(index)"
                    >
                      <div class="flex-grow-1 text-center">
                        {{ selection }}
                      </div>
                    </v-card>
                  </v-item>
                </v-col>
              </v-row>
            </v-container>
          </v-item-group>
        </template>
      </v-card-item>
      <template v-if="selected !== -1">
        <v-card-text class="text-center pb-0">
          <p class="selected-text">{{ selected + 1 }}번을 선택하셨습니다.</p>
        </v-card-text>
      </template>
      <v-btn variant="flat" @click="submitAnswer">정답 제출하기</v-btn>
      <template v-slot:actions>
        <v-btn @click="closeDialog">닫기</v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.quiz-problem {
  font-size: larger;
  text-align: center;
}

.selected-text {
  font-size: smaller;
}
</style>
