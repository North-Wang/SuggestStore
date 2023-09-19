<template>
  <div class="bg-pattern h-screen flex items-center flex-col pt-4 xl:pt-12">
    <ul class="flex items-center">
      <h1 class="text-2xl xl:text-5xl">肥前屋</h1>
      <i
        class="fa-solid fa-rotate cursor-pointer ml-2 text-[20px] xl:text-[28px]"
        style=""
        @click="refresh"
      ></i>
      <!-- <i class="fa-solid fa-spinner fa-spin-pulse"></i> -->
      <!-- fa-sync fa-spin -->
    </ul>

    <ul class="py-4">
      <h2>Maxium People</h2>
      <input
        class="text-center mt-2 w-30"
        type="text"
        v-model="peopleLimit"
        placeholder=""
      />
    </ul>
    <ul class="pt-4">
      <h2>Price</h2>
      <li class="flex items-center">
        <input
          class="text-center mt-2 input-price"
          type="text"
          v-model="lowPrice"
          maxlength="6"
        />
        <div>&nbsp;~&nbsp;</div>
        <input
          class="text-center mt-2 input-price"
          type="text"
          v-model="highPrice"
          maxlength="6"
        />
      </li>
    </ul>
    <!-- <ul class=" py-4" >
      <h2>Type</h2>      
      <li class="mt-2"></li>
    </ul> -->
    <Option
      title="Purple"
      :listData="purpleList"
      @checkedValue="checkedPurple"
    ></Option>
    <!-- <ul class="py-4">
      <h2>Location</h2>
      <li class="mt-2 flex gap-4 cursor-pointer">
        <div class="dropdown">新北市</div>
        <div class="dropdown">板橋區</div>
        <div class="dropdown">篤行路三段</div>
      </li>
    </ul> -->
    <Option
      title="Feature"
      :listData="featureList"
      @checkedValue="checkedPurple"
    ></Option>
    <ul>
      <button class="w-64" @click="sendData">Send</button>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Option from "../components/Option.vue";
import { storeToRefs } from "pinia";
import { getStoreData } from "../store/getStoreData";
import axios from "axios";

const dataFunction = getStoreData();
const storeData = ref({});

const answer = ref("");
const peopleLimit = ref("");
const lowPrice = ref(0);
const highPrice = ref(null);
const purpleList = ref([
  "普通朋友",
  "奢華享受",
  "朋友聚會",
  "讀書工作",
  "久坐辦公",
]);
const featureList = ref([]);

const selectedPurple = (value) => {
  console.log("選擇的目的", value);
};

const checkedPurple = (data) => {
  console.log("接收到的目的", data);
};

const sendData = () => {
  console.log("篩選", data);
};

const getData = async function () {
  axios
    .get(
      "https://sheets.googleapis.com/v4/spreadsheets/1_3W1EeAV2n4InaUCczUp7BVPzXxB1mVsneRrD7Ygb_0/values/工作表1?key=AIzaSyD4tjE_hNQpGPegRSGPD-Ut_Avo9G59zgU"
    )
    .then((result) => {
      console.log("result", result);
      const titleList = result.data.values[0];
      storeData.value = result.data.values.slice(1);
      console.log("標題", titleList);
      console.log("店家資訊", storeData.value);
      dataFunction.saveData(storeData.value);
      Promise.all([setPurple(), setFeature()]);
    })
    .catch((error) => console.log(error));
};

const setPurple = () => {
  let category = new Set();
  storeData.value.forEach((store) => {
    category.has(store[3]) ? "" : category.add(store[3]);
  });
  purpleList.value = [...category];
  console.log("目的的種類", Object.values(category));
};

const setFeature = () => {
  let category = new Set();
  storeData.value.forEach((store) => {
    category.has(store[6]) ? "" : category.add(store[6]);
  });
  featureList.value = [...category];
  console.log("feature的種類", featureList.value);
};

const refresh = () => {
  console.log("更新名單");
};

onMounted(async function () {
  getData();
});
</script>

<style scoped>
.input-price {
  width: 120px;
}
.options:hover {
  background-color: rgb(49, 49, 195);
  color: white;
}
.input-radio:checked {
  background-color: rgb(49, 49, 195);
}
.input-radio:checked + label {
  background-color: rgb(49, 49, 195);
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  color: white;
}
.options .input-radio:checked {
  background-color: rgb(49, 49, 195);
}
.dropdown {
  height: 40px;
  padding: 0.6em 1.2em;
  background-color: white;
  border-radius: 0.5rem;
}
</style>
