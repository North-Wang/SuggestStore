<template>
  <footer class="footer h-25 flex justify-center py-4">
    <div class="flex" style="gap: 20px">
      <router-link to="/">
        <button>Home</button>
      </router-link>

      <router-link to="/StoreList">
        <button>StoreList</button>
      </router-link>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
</script>

<style scoped>
footer {
  /* background-color: #FFF5E0; */
  background-image: url("../public/white-fabric.webp");
}
a {
  font-weight: bold;
}
</style>
