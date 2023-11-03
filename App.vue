<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="">
    <Header></Header>
    <routerView class="router" />
    <Footer></Footer>
  </div>
</template>

<style scoped>
.router {
  /* height: calc(100vh - 120px); */
}
</style>
