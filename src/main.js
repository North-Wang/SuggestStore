import { createApp } from "vue";
import { createPinia } from "pinia";
import "./css/style.css";
import App from "./App.vue";
import router from "./router";
import "./css/style.css";
import "./css/common.css";
import "animate.css";

const app = createApp(App);
app.use(createPinia()).use(router).mount("#app");
