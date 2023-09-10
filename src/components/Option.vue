<template>
  <ul class="py-4">
    <h2>
      <span class="cursor-pointer" @click="openOption">+&nbsp;</span>
      {{ title }}
    </h2>
    <transition>
      <li class="grid gap-4 grid-cols-4 mt-2" v-show="showOptions">
        <div
          class="bg-slate-400 rounded-lg cursor-pointer flex items-center text-center options"
          v-for="(purple, index) in listData"
          :key="purple"
          @click="selectedRadio(purple)"
        >
          <input
            type="radio"
            name="purple"
            :id="purple + index"
            class="input-radio ml-2 h-10"
          />
          <label
            :for="purple + index"
            class="pr-4 h-10 flex items-center pl-1"
            >{{ purple }}</label
          >
        </div>
        <div
          class="bg-slate-300 rounded-lg cursor-pointer flex items-center text-center options"
          v-if="showMore"
          @click="getAllData"
        >
          more
        </div>
      </li>
    </transition>
  </ul>
</template>

<script setup>
import { ref, onMounted, computed, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "選項",
  },
  listData: {
    type: Array,
    default: () => [],
  },
});
const allListData = ref([]);
const listData = ref([]);
const showMore = ref(false);
const showOptions = ref(true);
const title = computed(() => {
  return props.title;
});
const emits = defineEmits(["checkedValue"]);

const selectedRadio = (value) => {
  emits("checkedValue", value);
};

const openOption = () => {
  if (showOptions.value) {
    showOptions.value = false;
  } else {
    showOptions.value = true;
    setOptions();
  }
};
const setOptions = () => {
  //設定初始要顯示那些選項
  allListData.value = props.listData;
  if (props.listData.length > 8) {
    listData.value = props.listData.slice(0, 7);
    showMore.value = true;
  } else {
    listData.value = props.listData;
    showMore.value = false;
  }
};
const getAllData = () => {
  listData.value = allListData.value;
  showMore.value = false;
};

onMounted(() => {
  setOptions();
});
</script>

<style scoped>
.options:hover {
  background-color: rgb(49, 49, 195);
  color: white;
}
.input-radio:checked {
  background-color: rgb(49, 49, 195);
}
/* .input-radio:checked + label {
  background-color: rgb(49, 49, 195);
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  color: white;
} */
.options .input-radio:checked {
  background-color: rgb(49, 49, 195);
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
