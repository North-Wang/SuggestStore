import { createRouter, createWebHashHistory } from "vue-router";
import Homepage from "../view/Homepage.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // {
    //   path: "/",
    //   redirect: { name: "home" },
    // },
    {
      path: "/",
      name: "home",
      component: Homepage,
    },
    {
        path: "/StoreList",
        name: "StoreList",
        component: () => import("../view/StoreList.vue"),
      },
  ],
});

/* 前置守衛 */
router.beforeEach((to, from) => {
  // ...
  // 返回 false 以取消导航
  // return false
  return true;
});

export default router;
