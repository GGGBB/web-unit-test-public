<template>
  <div>
    <TheHeader />
    <div class="flex">
      <div class="m-r-10">Navbar</div>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheHeader from "../components/header/TheHeader.vue"
</script>

<style scoped></style>
