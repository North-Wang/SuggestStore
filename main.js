import { createApp } from "vue";
import { createPinia, storeToRefs } from "pinia";
const pinia = createPinia();
pinia.use(
  createPersistedState({
    storage: sessionStorage, //設定Pinia檔persist為true時，默認資料儲存的位置
  })
);
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createPersistedState } from "pinia-plugin-persistedstate";
import "./css/style.css";
import App from "./App.vue";
import router from "./router";
import "./css/style.css";
import "./css/common.css";
import "animate.css";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* add some free styles */
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faUserSecret);

Vue.config.productionTip = false; //禁止開發模式的提示
const app = createApp(App);

app.config.errorHandler = (err) => {
  console.error("捕抓到錯誤訊息", err);
};
app
  .use(pinia)
  .use(createPinia())
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
