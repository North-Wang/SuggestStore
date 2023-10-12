<template>
  <div class="bg-pattern h-screen">
    <h1 class="text-3xl font-bold">店家列表</h1>
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
import { ref, onMounted } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { storeToRefs } from "pinia";
import { getStoreData } from "../store/getStoreData";

const storeData = getStoreData();
const list = ref([]);
const { storeList } = storeToRefs(storeData);

onMounted(() => {
  console.log("店家資訊", storeList.value);
});
</script>

<style scoped>
.storeList {
  text-align: left;
}
</style>
