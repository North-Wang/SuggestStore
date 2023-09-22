import { defineStore } from "pinia";
import axios from "axios";

export const getStoreData = defineStore({
  id: "storeData",
  state: () => ({
    storeList: ["default"],
  }),
  actions: {
    saveData(data) {
      this.storeList = data;
      // console.log("收到的店家資訊",this.storeList)
    },
  },
});
