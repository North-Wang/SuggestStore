<template>
  <div class="bg-pattern h-screen flex items-center flex-col pt-4 xl:pt-12">
    <ul class="flex items-center">
      <h1 class="text-2xl xl:text-5xl">{{ answer }}</h1>

      <!-- <i class="fa-solid fa-spinner fa-spin-pulse"></i> -->
      <!-- fa-sync fa-spin -->
    </ul>
    <h3 class="mt-2">{{ address }}</h3>
    <i
      class="fa-solid fa-rotate cursor-pointer mt-3 text-[20px] xl:text-[28px]"
      style=""
      @click="refresh"
    ></i>

    <ul class="pt-4">
      <h2>Maxium People</h2>
      <input
        class="text-center mt-2 w-30"
        type="number"
        v-model="peopleLimit"
        placeholder=""
      />
    </ul>
    <ul class="pt-4">
      <h2>Price</h2>
      <li class="flex items-center">
        <input
          class="text-center mt-2 input-price"
          type="number"
          v-model="lowPrice"
          maxlength="6"
        />

        <div>&nbsp;NTD&nbsp;~&nbsp;</div>
        <input
          class="text-center mt-2 input-price"
          type="number"
          v-model="highPrice"
          maxlength="6"
        />
        <span>&nbsp;NTD</span>
      </li>
    </ul>
    <!-- <ul class=" py-4" >
      <h2>Type</h2>      
      <li class="mt-2"></li>
    </ul> -->
    <Radio
      title="Purple"
      :listData="purpleList"
      @checkedValue="checkedPurple"
      @reset="selectedPurple = ''"
    />
    <!-- <ul class="py-4">
      <h2>Location</h2>
      <li class="mt-2 flex gap-4 cursor-pointer">
        <div class="dropdown">新北市</div>
        <div class="dropdown">板橋區</div>
        <div class="dropdown">篤行路三段</div>
      </li>
    </ul> -->
    <Checkbox
      title="Feature"
      :listData="feature"
      @checkedValue="checkedFeature"
      @reset="selectedFeature = []"
    />
    <Checkbox
      title="Category"
      :listData="category"
      @checkedValue="checkedCategory"
    />
    <ul class="pt-8">
      <button class="w-64" @click="sendData">Send</button>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import Radio from "../components/Radio.vue";
import Checkbox from "../components/Checkbox.vue";
import { storeToRefs } from "pinia";
import { getStoreData } from "../store/getStoreData";
import axios from "axios";

const dataFunction = getStoreData();
const storeData = ref([]); //全部的店家資訊
const backupFilterStore = ref([]); //備份篩選後的店家資訊。如果空陣列，表示尚未進行篩選
const { storeList } = storeToRefs(dataFunction);

const answerList = ref([
  //篩選後的店家列表
  {
    name: "肥前屋",
  },
]);
const answer = ref("肥前屋");
const address = ref("10491台北市中山區中山北路一段121巷13號");
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
const feature = ref([]);
const category = ref([]);
const selectedPurple = ref("");
const selectedFeature = ref([]);
const selectedCategory = ref([]);

watch(lowPrice, (num) => {
  if (num.trim().length === 0) {
    lowPrice.value = 0;
  }
});

const checkedPurple = (data) => {
  console.log("接收到目的", data);
  selectedPurple.value = data;
};
const checkedFeature = (data) => {
  console.log("接收到的特質", data);
  selectedFeature.value = data;
};

const checkedCategory = (data) => {
  console.log("接收到的category", data);
  selectedCategory.value = data;
};

const getData = async function () {
  axios
    .get(
      "https://sheets.googleapis.com/v4/spreadsheets/1_3W1EeAV2n4InaUCczUp7BVPzXxB1mVsneRrD7Ygb_0/values/工作表1?key=AIzaSyD4tjE_hNQpGPegRSGPD-Ut_Avo9G59zgU"
    )
    .then((result) => {
      console.log("result", result);
      const titleList = result.data.values[0];
      const storeList = result.data.values.slice(1);
      console.log("標題", titleList);
      console.log("店家資訊", storeList);

      storeList.forEach((store) => {
        storeData.value.push({
          name: store[0],
          type: store[1],
          peopleLimit: store[2],
          purple: store[3],
          lowPrice: store[4],
          highPrice: store[5],
          address: store[6],
          feature: store[7],
          category: store[8],
        });
      });
      console.log("店家資訊", storeData.value);
      answerList.value = storeData.value;
      dataFunction.saveData(storeData.value);
      Promise.all([setPurple(), setFeature(), setCategory()]);
    })
    .catch((error) => console.log(error));
};

const setPurple = () => {
  let category = new Set();
  storeData.value.forEach((store) => {
    category.has(store.purple) ? "" : category.add(store.purple);
  });
  purpleList.value = [...category];
  purpleList.value = purpleList.value.filter((option) => option !== "");
  console.log("目的的種類", Object.values(category));
};

const setFeature = () => {
  let category = new Set();
  storeData.value.forEach((store) => {
    category.has(store.feature) ? "" : category.add(store.feature);
  });
  feature.value = [...category];
  feature.value = feature.value.filter((option) => option !== "");
};

const setCategory = () => {
  let newCategory = new Set();
  storeData.value.forEach((store) => {
    const thisStoreCategory = store.category.toString().split(",");
    thisStoreCategory.forEach((category) => {
      newCategory.has(category) ? "" : newCategory.add(category);
    });
  });
  category.value = [...newCategory];
  category.value = category.value.filter((option) => option !== "");
};

const sendData = () => {
  /* 重置 用來備份篩選完的陣列 */
  backupFilterStore.value = [];

  /* 篩選價格 */
  if (Number.isInteger(highPrice.value) && highPrice.value != null) {
    if (backupFilterStore.value.length === 0) {
      //之前尚未進行篩選
      backupFilterStore.value = storeData.value.filter((store) => {
        return store.highPrice < highPrice.value;
      });
    } else {
      //之前有篩選過
      backupFilterStore.value = backupFilterStore.value.filter((store) => {
        return store.highPrice < highPrice.value;
      });
    }
  }

  /* 篩選"目的" */
  if (selectedPurple.value != "") {
    if (backupFilterStore.value.length === 0) {
      //之前尚未進行篩選
      backupFilterStore.value = storeData.value.filter((store) => {
        return store.purple === selectedPurple.value;
      });
    } else {
      //之前有篩選過
      backupFilterStore.value = backupFilterStore.value.filter((store) => {
        return store.purple === selectedPurple.value;
      });
    }
  }

  /* 篩選"Feature" */
  if (selectedFeature.value.length != 0) {
    if (backupFilterStore.value.length === 0) {
      //之前尚未進行篩選
      backupFilterStore.value = storeData.value.filter((store) => {
        return selectedFeature.value.some(
          (feature) => store.feature === feature
        );
      });
    } else {
      //之前有篩選過
      backupFilterStore.value = backupFilterStore.value.filter((store) => {
        return selectedFeature.value.some(
          (feature) => store.feature === feature
        );
      });
    }
  }

  /* 篩選"Category" */
  if (selectedCategory.value.length != 0) {
    if (backupFilterStore.value.length === 0) {
      //之前尚未進行篩選
      backupFilterStore.value = storeData.value.filter((store) => {
        const categoryList = store.category.split(",");
        if (categoryList.indexOf(selectedCategory.value[0]) != -1) {
          return true;
        } else {
          return false;
        }
      });
    } else {
      //之前有篩選過
      backupFilterStore.value = backupFilterStore.value.filter((store) => {
        const categoryList = store.category.split(",");
        if (categoryList.indexOf(selectedCategory.value[0]) != -1) {
          return true;
        } else {
          return false;
        }
      });
    }
  }

  /* 顯示篩選的結果 */
  if (backupFilterStore.value.length != 0) {
    answerList.value = backupFilterStore.value;
    answer.value = answerList.value[0].name;
    address.value = answerList.value[0].address;
  } else if (
    backupFilterStore.value.length === 0 &&
    selectedPurple.value === "" &&
    selectedFeature.value.length === 0 &&
    selectedCategory.value.length === 0
  ) {
    //沒有任何篩選條件
    answerList.value = storeData.value;
    answer.value = answerList.value[0].name;
    address.value = answerList.value[0].address;
  } else {
    //沒有符合篩選條件的資料
    answerList.value = [];
    answer.value = "無適合的地點";
    address.value = "";
  }

  console.log("篩選結果", answerList.value);
};

const refresh = () => {
  //抽選器
  const min = 0;
  const max = answerList.value.length;
  const randomIndex = Math.floor(Math.random() * (max - min) + min);
  answer.value = answerList.value[randomIndex].name;
  address.value = answerList.value[randomIndex].address;

  /* 不顯示重複的店家名稱 */
  // let hadShowIndex = new Set(); //儲存已經出現的隨機數
  // hadShowIndex.add(0);
  // if (!hadShowIndex.has(randomIndex)) {
  //   answer.value = answerList.value[randomIndex].name;
  // address.value = answerList.value[randomIndex].address;
  //   hadShowIndex.add(randomIndex);
  // } else {
  //   console.log("沒有更多結果");
  // }
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
input[type="number"] {
  height: 40px;
  border-radius: 8px;
  text-align: center;
  font-size: 20px;
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
