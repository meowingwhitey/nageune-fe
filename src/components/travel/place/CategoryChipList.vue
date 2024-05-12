<script setup>
import { useTravelStore } from "@/stores/travelStore.js";

const store = useTravelStore();

const isChecked = (name) => {
  const categoryIdx = store.categoryItemList.names.indexOf(name);
  return store.categoryCheckList[categoryIdx];
};

const onCheckToggle = (name) => {
  const categoryIdx = store.categoryItemList.names.indexOf(name);
  store.categoryCheckList[categoryIdx] = !store.categoryCheckList[categoryIdx];
  store.items = store.items.filter((item) => {
    return (
      item.category_group_code !== store.categoryItemList.codes[categoryIdx]
    );
  });
};
</script>

<template>
  <div id="category-chip-list" class="d-flex ga-1 overflow-x-hidden">
    <template v-for="(category, index) of store.categoryItemList.names">
      <v-chip
        variant="flat"
        :prepend-icon="isChecked(category) ? 'mdi-checkbox-marked-circle' : ''"
        :class="isChecked(category) ? 'category-chip-checked' : 'category-chip'"
        v-if="store.categoryExistList[index]"
        @click="() => onCheckToggle(category)"
      >
        {{ category }}
      </v-chip>
    </template>
  </div>
</template>

<style scoped>
/*
  chip 리스트 길이 = (100vw - 로그인 버튼 - navbar - searchbar)
  그 미만으로 내려가면 chip의 내용이 chip 자체가 아닌 selectbox 안쪽으로 들어가야됨
*/
#category-chip-list {
  max-width: calc(100vw - 380px - 80px - 40px);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-flow: row wrap;
}

.category-chip {
  cursor: pointer;
  background-color: #4db6ac;
  transition-property: background-color;
  transition-duration: 0.3s;
  color: #ffffff;
}

.category-chip-checked {
  cursor: pointer;
  background-color: #00897b;
  transition-duration: 0.3s;
  color: #ffffff;
}

.category-chip:hover {
  cursor: pointer;
  background-color: #00897b;
  color: #ffffff;
}
</style>
