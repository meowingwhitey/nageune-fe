<script setup>
import { ref, onMounted, onBeforeUpdate } from "vue";
import { useRoute } from "vue-router";
import SpotDialog from "@/components/mobile/spot/SpotDialog.vue";
import VChip from "@/components/mobile/spot/VChip.vue";
import { localAxios } from "@/util/axios_interceptor";

const route = useRoute();

const local = localAxios();
const REST_HERITAGE_API = "/heritage";

const props = defineProps({
  spot: Object,
});

const age = ref(["신라", "6세기 말"]);
const imgUrl = ref("/src/assets/not_found_img.jpg");

const tripId = ref(route.params.id);

const dialog = ref(false);
const closeDialog = () => {
  dialog.value = false;
};

const getImgUrl = () => {
  local
    .get(`${REST_HERITAGE_API}/img`, {
      params: { heritageId: props.spot.heritageId },
    })
    .then((res) => {
      console.log(res);
      imgUrl.value =
        res.data !== "" ? res.data : "/src/assets/not_found_img.jpg";
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  getImgUrl();
});

onBeforeUpdate(() => {
  getImgUrl();
});
</script>
<template>
  <v-col cols="10">
    <v-card class="d-flex flex-no-wrap position-relative" elevation="1">
      <v-avatar class="ma-3" rounded="0" size="100">
        <v-img :src="imgUrl"></v-img>
      </v-avatar>
      <div>
        <div>
          <div class="mx-3 mt-3 mb-1 font-weight-bold">
            {{ spot.name }}
          </div>
          <div>
            <VChip v-for="text in age" :text="text" class="ml-2" />
          </div>
        </div>

        <v-card-actions class="position-absolute bottom-0 right-0 mb-1 mr-1">
          <v-btn
            class="ms-2"
            size="small"
            text="위치 인증하기"
            variant="outlined"
            @click="dialog = true"
          ></v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-col>
  <SpotDialog
    v-model="dialog"
    @close-dialog="closeDialog"
    :spot="spot"
    :travelId="tripId"
  />
</template>

<style scoped></style>
