<template>
  <header class="flex flex-col items-center py-6 h-15 text-white">
    <router-link to="/" class="router-link"><h1>Suggest Store</h1></router-link>
  </header>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
</script>

<style scoped>
header {
  background-color: #1b0000;
  font-family: "Oswald", sans-serif;
}
.router-link:hover {
  color: white;
}
</style>
