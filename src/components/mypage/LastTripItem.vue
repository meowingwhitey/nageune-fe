<script setup>
const showLastTrip = () => {
  //여행 아이디 전달 -> 해당 여행의 기록 서버로 요청
  // -> 서버는 해당 여행의 루트 + 사진 전송
  // -> 받아서 화면에 표시(모달창)
  console.log("지난 여행 기록 보여주기");
};
</script>

<template>
  <v-col
    cols="12"
    sm="6"
    lg="4"
    xl="3"
    class="last-trip-item-col pa-0 mb-2"
    @click="showLastTrip"
  >
    <div class="last-trip-item">
      <p class="last-trip-item-title">여행이름</p>
      <img
        src="http://www.cha.go.kr/unisearch/images/national_treasure/1612029.jpg"
        class="last-trip-item-img"
      />
    </div>
  </v-col>
</template>

<style scoped>
.last-trip-item-col {
  height: 130px;
  border-radius: 10px;
}

.last-trip-item {
  height: 95%;
  width: 95%;
  background-color: rgb(255, 255, 255);
  margin: auto;
  border-radius: 10px;
  position: relative;
  border: 3px solid rgb(243, 245, 244);
}

.last-trip-item-col :hover {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.575);
  cursor: pointer;
}

.last-trip-item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  -webkit-mask-image: linear-gradient(to left, #000000b6 0%, transparent 80%);
  border-radius: 7px;
}

.last-trip-item-title {
  font-weight: 800;
  font-size: larger;
  color: rgb(110, 128, 112);
  position: absolute;
  top: 15%;
  left: 5%;
}
.last-trip-item-title :hover {
  box-shadow: none;
}
</style>
