<script setup>
import { ref } from "vue";

const article = ref({
  title: "제목",
  content: "Aaa",
});

const content = ref("asdf");

const test = () => {
  console.log(article.value.title);
  console.log(article.value.content);
};

const editorOption = {
  placeholder: "placeholer",
};
</script>

<template>
  <v-container id="text-editor" class="mt-5 d-flex flex-column">
    <!-- 제목 -->
    <v-text-field
      v-model="article.title"
      variant="outlined"
      density="compact"
    ></v-text-field>
    <!-- 내용 -->
    <div id="text-edit-field">
      <QuillEditor
        theme="snow"
        v-model:content="article.content"
        :options="editorOption"
      ></QuillEditor>
    </div>

    <div class="d-flex justify-end mt-3">
      <v-btn
        variant="tonal"
        color="green-darken-4"
        append-icon="mdi-lead-pencil"
        @click="test"
      >
        작성하기
      </v-btn>
    </div>
  </v-container>
</template>

<style scoped>
#text-editor {
  height: fit-content;
  margin-bottom: 80px;
}

::v-deep .ql-editor {
  min-height: 450px !important;
}
</style>
