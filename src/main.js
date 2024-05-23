import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import VResizable from "v-resizable";
//import { instance } from "@/api/axios";

const app = createApp(App);

//app.provide("axios", instance);

/**
 * [Vuetify]
 * npm install vuetify
 * https://vuetifyjs.com/en/getting-started/installation
 *
 * [Material-Icon]
 * npm install @mdi/font
 * https://vuetifyjs.com/en/features/icon-fonts/#mdi-css
 */
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader

const vuetify = createVuetify({
  options: {
    customProperties: true,
  },

  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  defaults: {
    global: {
      font: {
        family: "Maplestory, sans-serif", // 여기서 폰트를 설정
      },
      VCard: {
        style: "border-radius:15px",
      },
    },
  },
});

/**
 *
 * [Quill]
 * npm install @vueup/vue-quill
 * https://vueup.github.io/vue-quill/guide/installation.html
 *
 */
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

app.component("QuillEditor", QuillEditor);
app.use(vuetify);
app.use(createPinia());
app.use(router);
app.use(VResizable);
app.mount("#app");
