<template>
  <div class="bg-pattern h-screen flex items-center flex-col pt-4">
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
    <ul class="py-4">
      <h2>Purple</h2>
      <li class="grid gap-4 grid-cols-4 mt-2">
        <div
          class="bg-slate-400 rounded-lg cursor-pointer h-10 flex items-center text-center px-4"
          v-for="purple in purpleList"
          :key="Purple"
        >
          {{ purple }}
        </div>
      </li>
    </ul>
    <ul class="py-4">
      <h2>Location</h2>
      <li class="mt-2"></li>
    </ul>
    <ul class="py-4">
      <h2>+ Feature</h2>
      <!-- <li class="mt-2"></li> -->
    </ul>
    <ul>
      <button class="w-64">Send</button>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const peopleLimit = ref("");
const lowPrice = ref(0);
const highPrice = ref(null);
const purpleList = ref([
  "普通朋友",
  "奢華享受",
  "朋友聚會",
  "讀書工作",
  "朋友聚會",
  "朋友聚會",
  "朋友聚會",
]);
</script>

<style scoped>
.input-price {
  width: 120px;
}
</style>
