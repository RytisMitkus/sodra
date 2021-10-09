import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuelidate from "vuelidate";

createApp(App).use(store).use(router).use(vuelidate).mount("#app");
