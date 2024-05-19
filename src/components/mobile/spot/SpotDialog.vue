<script setup>
import { ref } from "vue";
import axios from "axios";
import ExifReader from "exifreader";
import { useRoute } from "vue-router";

const route = useRoute();
const tripId = ref(route.params.id);

const props = defineProps({
  spot: Object,
});

const REST_API_KEY = "583e17c3f8ed87c625a3162d0fdcc29b";

const image = ref(null); //입력으로 받은 사진
const address = ref(null); //받아올 주소
const msg = ref(null); //안내 메세지
const coordinate = ref(null);

const btnDisable = ref(true);

const emit = defineEmits(["closeDialog"]);

const closeDialog = () => {
  // 서버로 사진 전송

  emit("closeDialog");
};

//이미지 업로드
const handleImageUpload = (event) => {
  const file = event.target.files[0];

  console.log(file);
  const reader = new FileReader();
  reader.onload = (e) => {
    image.value = e.target.result;
    // console.log(image.value);
    //주소 가져오기
    getLocation(file);
  };

  reader.readAsDataURL(file);
};

//이미지 파일의 메타데이터를 읽고 좌표 가져오기
const getLocation = async (file) => {
  const tags = await ExifReader.load(file);
  //console.log(tags);
  //console.log(tags["GPSLatitude"]);
  try {
    const lat = tags["GPSLatitude"].description;
    const lng = tags["GPSLongitude"].description;

    coordinate.value = {
      latitude: lat,
      longitude: lng,
    };

    console.log(lat + " " + lng);

    //좌표->주소 변환
    getAddress(lat, lng);
    const distance = haversineDistance(
      lat,
      lng,
      props.spot.lat,
      props.spot.long,
    );

    console.log(distance + "m");

    //100m 이내에서만 인증 가능
    if (distance <= 100) {
      console.log("인증완료");
      btnDisable.value = false;
    } else {
      console.log("인증불가");
    }
  } catch (error) {
    msg.value = "위치 정보가 존재하지 않습니다.";
    console.log(error);
  }
};

//좌표->주소변환
const getAddress = (lat, lng) => {
  axios
    .get(
      "https://dapi.kakao.com/v2/local/geo/coord2address.json?x=" +
        lng +
        "&y=" +
        lat,
      { headers: { Authorization: `KakaoAK ${REST_API_KEY}` } },
    )
    .then((data) => {
      //도로명 주소가 있으면 도로명 주소를 받아옴
      if (data.data.documents[0].road_address !== null) {
        address.value = {
          address_name: data.data.documents[0].road_address.address_name,
          building_name: data.data.documents[0].road_address.building_name,
        };
      }
      //도로명 주소가 없다면 지번을 받아옴
      else {
        address.value = {
          address_name: data.data.documents[0].address.address_name,
          building_name: data.data.documents[0].address.building_name,
        };
      }

      console.log("주소변환성공");
      // console.log(address.value.address_name);
    })
    .catch(() => {
      console.log("실패");
    });
};

// 거리구하기
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degrees) => degrees * (Math.PI / 180);

  const R = 6371000; // 지구의 반지름 (단위: 미터)
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // 거리 계산

  return distance;
};
</script>

<template>
  <v-dialog>
    <v-card>
      <v-card-title class="text-center text-h6 font-weight-bold mt-3">
        위치 인증하기
      </v-card-title>
      <v-card-subtitle class="text-center"
        >촬영 후 사진을 업로드해주세요.</v-card-subtitle
      >
      <v-card-item>
        <div class="d-flex flex-column justify-center">
          <!-- 위치 정보가 없을 때 -->
          <p v-if="msg !== null">{{ msg }}</p>

          <!-- 위치 정보가 있을 때 -->
          <p v-if="address !== null">촬영 위치: {{ address.address_name }}</p>

          <!-- 전송받은 이미지 출력 -->
          <div v-if="image" class="mb-2">
            <img :src="image" id="upload-img" />
          </div>
          <!-- 이미지를 전송받기 전 디폴트 이미지 출력 (수정하기) -->
          <div v-if="image === null" id="default-img" class="mb-2"></div>

          <!-- capture="camera" 모바일 환경 카메라 바로 연결 -->
          <label
            id="input-file-btn"
            for="input-file"
            class="text-center"
            capture="camera"
            >촬영하기</label
          >
          <input
            id="input-file"
            type="file"
            accept="image/*"
            @change="handleImageUpload"
          />
        </div>
      </v-card-item>

      <template v-slot:actions>
        <v-btn
          class="ms-auto"
          text="사진 등록하기"
          @click="closeDialog"
          :disabled="btnDisable"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<style scoped>
#upload-img {
  width: 100%;
}

#default-img {
  width: 100%;
  height: 200px;
  background-color: #e8f5e9;
  border-radius: 5px;
}

#input-file-btn {
  padding: 6px 25px;
  background-color: #1b5e20;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

#input-file {
  display: none;
}
</style>
