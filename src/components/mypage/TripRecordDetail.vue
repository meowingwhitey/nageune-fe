<script setup>
import { onMounted, ref } from "vue";
import { localAxios } from "@/util/axios_interceptor";
import { format } from "date-fns";

const local = localAxios();
const REST_TRAVELHISTORY_API = `/travelHistory`;
const REST_HERITAGE_API = `/heritage`;

const props = defineProps({
  spot: Array,
  travelId: Number,
});

const selectImg = ref("");
const imgList = ref([]);
const heritageTitle = ref("");
const hertiageAddress = ref("");
const heritageEra = ref("");
const heritageContent = ref("");
const visitTime = ref("");

//여행 아이디, hertiage 아이디로 card 이미지 검색
const getUserImg = () => {
  let heritageIdList = [];
  props.spot.forEach((s) => {
    if (s.type === "heritage") {
      heritageIdList.push(s.heritageId);
    }
  });

  // console.log(heritageIdList);

  local
    .post(`${REST_TRAVELHISTORY_API}/cardImg`, {
      heritageIdList: heritageIdList,
      travelId: props.travelId,
    })
    .then((res) => {
      console.log(res); //
      imgList.value = res.data;
      visitTime.value = format(
        new Date(imgList.value[0].stampTime),
        "yyyy년 MM월 dd일 H시 m분 방문",
      );
      getHeritageDetail(res.data[0].heritageId);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getHeritageDetail = (id) => {
  local
    .get(`${REST_HERITAGE_API}/detail`, { params: { heritageId: id } })
    .then((res) => {
      // heritage.value = res.data;
      heritageTitle.value = res.data.title;
      hertiageAddress.value = res.data.location + " " + res.data.locationSub;
      heritageEra.value = res.data.era;
      heritageContent.value = res.data.content;
    })
    .catch((err) => {
      console.log(err);
    });
};

const showDetail = (heritageId, stampTime, image) => {
  console.log("클릭", heritageId, stampTime);
  visitTime.value = format(
    new Date(stampTime),
    "yyyy년 MM월 dd일 H시 m분 방문",
  );
  selectImg.value = image;
  getHeritageDetail(heritageId);
};

const showContent = ref(false);

onMounted(() => {
  getUserImg(); //사용자가 업로드한 이미지 불러오기
});
</script>

<template>
  <div>
    <!-- n일차 요약 -->
    <!-- heritageId를 통해 card 이미지 검색 -->
    <!-- 이미지가 있으면 인증 완료 표시 한줄로 출력 -->
    <div class="d-flex justify-center">
      <template v-for="(img, index) in imgList" :key="index">
        <div class="mx-2 travel-img-box">
          <!-- 여행 이미지 -->
          <div
            class="temp-img-box mb-2"
            @click="showDetail(img.heritageId, img.stampTime, img.image)"
          >
            <p>{{ img.image }}</p>
          </div>
        </div>
      </template>
    </div>
    <!-- 클릭한 이미지 크게 보여주고 해당 여행지에 대한 설명 출력 -->
    <!-- 임시용 -->
    <div class="d-flex justify-center mr-2 mb-7 position-relative">
      <div class="temp-img-box-detail">
        <p>{{ selectImg }}</p>
        <!-- <img :src="selectImg"/> -->

        <div class="visitied-time position-absolute top-0 mt-3 mr-3">
          <p class="stamptime">{{ visitTime }}</p>
        </div>

        <div class="position-absolute bottom-0 text-left ml-3 mb-3">
          <div class="d-flex align-end">
            <p class="heritage-title">{{ heritageTitle }}</p>
            <p class="heritage-era mb-1 ml-1">({{ heritageEra }})</p>
          </div>
          <p class="heritage-address">{{ hertiageAddress }}</p>
        </div>
      </div>
    </div>
    <!-- 상세정보 -->
    <div class="heritage-detail">
      <div class="heritage-detail-title" @click="showContent = !showContent">
        <p>{{ heritageTitle }}</p>
      </div>
      <Transition name="slide-fade">
        <div class="heritage-detail-content" v-show="showContent">
          <p>{{ heritageContent }}</p>
        </div>
      </Transition>
    </div>

    <!-- 여행ID와 spot.heritageId를 이용해서 card 이미지 검색 -->
    <!-- heritageId를 이용해서 detail content 검색 -->
  </div>
</template>

<style scoped>
.temp-img-box {
  width: 80px;
  height: 80px;
  background-color: rgb(189, 189, 189);
  border-radius: 5px;
  color: white;
}

.travel-img-box :hover {
  cursor: pointer;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}

.temp-img-box-detail {
  min-width: 500px;
  min-height: 400px;
  width: 65vw;
  border-radius: 5px;
  background-image:
   /* linear-gradient(rgba(101, 148, 109, 0), rgba(0, 0, 0, 0.7)), */ url("http://www.cha.go.kr/unisearch/images/national_treasure/2021062917265902.jpg");
  background-size: cover;
  background-position: 0% 50%;
}
.heritage-era,
.heritage-address,
.heritage-title,
.stamptime {
  color: white;
  text-shadow:
    -0.5px 0px black,
    0px 0.5px black,
    0.5px 0px black,
    0px -0.5px black;
}

.heritage-title {
  font-size: xx-large;
  font-weight: 700;
}

.heritage-address {
  font-size: larger;
  font-weight: 600;
}

.heritage-era {
  font-weight: 600;
}

.visitied-time {
  right: 0;
  transform: translateX(-50%);
}

.heritage-detail-title {
  font-weight: 600;
  font-size: larger;
  margin-bottom: 10px;
  display: block;
  width: 100%;

  color: rgb(75, 82, 78);
  padding: 10px;
}

.heritage-detail-title :hover {
  cursor: pointer !important;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.heritage-detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.heritage-detail-content {
  text-align: left;
  width: 80%;
}

.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
