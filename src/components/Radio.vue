<template>
  <ul class="pt-4 flex flex-col items-center">
    <h2
      class="button-title w-64"
      @click="openOption"
      v-show="!toggleTitleButton"
    >
      <i class="fa-solid fa-plus"></i>
      {{ title }}
    </h2>
    <h2
      class="button-title w-64"
      style="background-color: unset; color: black; border: 1px solid black"
      @click="openOption"
      v-show="toggleTitleButton"
    >
      <i class="fa-solid fa-minus"></i>
      {{ title }}
    </h2>

    <transition
      name="show-options"
      enter-active-class="animate__animated animate__flipInX "
      leave-active-class="animate__animated animate__flipOutX"
    >
      <li class="grid gap-4 grid-cols-4 mt-2" v-if="showOptions">
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
          class="bg-slate-300 rounded-lg cursor-pointer flex items-center justify-center text-center options"
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
const showOptions = ref(false);
const title = computed(() => {
  return props.title;
});
const toggleTitleButton = ref(false);
const emits = defineEmits(["checkedValue"]);

const selectedRadio = (value) => {
  emits("checkedValue", value);
};

const openOption = () => {
  toggleTitleButton.value = !toggleTitleButton.value;
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
  transition: opacity 0.3s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
@keyframes backgroundColor {
  from {
    background-color: rgb(6, 6, 66);
  }
  to {
    background-color: aquamarine;
  }
}
.button-title {
  border: 0;
  background-color: rgb(6, 6, 66);
  color: white;
  padding: 2px 16px;
  border-radius: 20px;
  cursor: pointer;
}
.button-title:checked {
  border: 0;
  background-color: aquamarine !important;
}
</style>
