<template>
  <div class="bg-pattern h-screen flex flex-col items-center">
    <h1 class="text-3xl font-bold py-4">店家列表</h1>
    <button @click="updateData">上傳資料</button>
    <ul>
      <input
        type="text"
        name=""
        id=""
        placeholder="請輸入店名"
        class="text-center"
        v-model="inputStore"
      />
      <input
        type="text"
        name=""
        id=""
        placeholder="請輸入地址"
        class="text-center"
        v-model="inputAddress"
      />
      <li></li>
    </ul>
    <DataTable
      :value="storeList"
      class="storeList"
      editMode="cell"
      @cell-edit-complete="onCellEditComplete"
      tableClass="editable-cells-table"
    >
      <Column field="name" header="店家名稱" :sortable="true">
        <template #body="{ data, field }"> {{ data[field] }} </template>
        <template #editor="{ data, field }">
          <!-- <input
            type="text"
            name="storeName"
            :value="data[field]"
            @input="changeInput"
          /> -->
          <template>
            <InputText v-model="data[field]" />
          </template>
        </template>
      </Column>
      <Column field="address" header="地址" />
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" />
      </template>
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
import "primevue/resources/themes/lara-light-blue/theme.css";
import VirtualScroller from 'primevue/virtualscroller';

const dataFunction = getStoreData();
const storeList = ref([]);
const backupList = ref([]); //備份全部的店家資訊
const inputStore = ref("");
const inputAddress = ref("");
const editStoreName = ref("test");

watch(editStoreName, (data, index) => {
  console.log("監聽到編輯", data, index);
});

watch(inputStore, (keyword) => {
  // console.log("搜尋店名", keyword);
  // searchStore(keyword);
});
watch(inputAddress, (keyword) => {
  // console.log("搜尋地址", keyword);
  // searchAddress(keyword);
});

watch([inputStore, inputAddress], (keywordList, index) => {
  //清除沒輸入input的變數
  const newKeywordList = keywordList.filter((keyword) => {
    return keyword != "";
  });
  console.log("搜尋", newKeywordList);
  if (newKeywordList.length === 0) {
    //沒有任何關鍵字搜尋
    storeList.value = backupList.value;
  } else {
    newKeywordList.forEach((keyword) => {
      console.log("aaa keyword", keyword);
      storeList.value = storeList.value.filter((store) => {
        return store.name.includes(keyword);
      });
    });
  }
});

const searchStore = (keyword) => {
  storeList.value = storeList.value.filter((store) => {
    return store.name.includes(keyword);
  });
};
const searchAddress = (keyword) => {
  if (keyword === "") {
  } else {
    storeList.value = storeList.value.filter((store) => {
      return store.address.includes(keyword);
    });
  }
};

const changeInput = (data) => {
  // console.log("aaa input框變化", data);
};
const onCellEditComplete = (event) => {
  let { data, newValue, field } = event;
  console.log("aaa event", event);
};

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
      backupList.value = storeList.value;
      console.log("店家資訊", storeList.value);
    })
    .catch((error) => console.log(error));
};

const updateData = async function () {};

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
