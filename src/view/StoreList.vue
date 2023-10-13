<template>
  <div class="bg-pattern h-screen flex flex-col items-center">
    <h1 class="text-3xl font-bold py-4">店家列表</h1>
    <ul>
      <input
        type="text"
        name=""
        id=""
        placeholder="請輸入店名"
        class="text-center"
      />
      <input
        type="text"
        name=""
        id=""
        placeholder="請輸入地址"
        class="text-center"
      />
      <li></li>
    </ul>
    <DataTable :value="storeList" class="storeList">
      <Column field="name" header="店家名稱" :sortable="true" />
      <Column field="address" header="地址" />
      <Column field="category" header="類型" />
      <Column field="feature" header="特性" :sortable="true" />
      <Column field="type" header="種類" :sortable="true" />
      <Column field="purple" header="目的" :sortable="true" />
    </DataTable>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { getStoreData } from "../store/getStoreData";
import { storeToRefs } from "pinia";
import axios from "axios";

const dataFunction = getStoreData();
const storeList = ref([]);

const getData = async function () {
  axios
    .get(
      "https://sheets.googleapis.com/v4/spreadsheets/1_3W1EeAV2n4InaUCczUp7BVPzXxB1mVsneRrD7Ygb_0/values/工作表1?key=AIzaSyD4tjE_hNQpGPegRSGPD-Ut_Avo9G59zgU"
    )
    .then((result) => {
      console.log("result", result);
      const newStoreList = result.data.values.slice(1);

      newStoreList.forEach((store) => {
        storeList.value.push({
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
      dataFunction.saveData(storeList.value);
      console.log("店家資訊", storeList.value);
    })
    .catch((error) => console.log(error));
};
onMounted(() => {
  getData();
});
</script>

<style scoped>
.storeList {
  width: 80%;
  background-color: #fff;
  font-size: 16px;
}
</style>
