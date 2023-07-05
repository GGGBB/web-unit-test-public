<template>
  <NConfigProvider :theme="themeStore.naiveTheme">
    <BaseLayout>
      <RouterView></RouterView>
    </BaseLayout>
  </NConfigProvider>
  <div></div>
</template>

<script setup lang="ts">
import { NConfigProvider } from "naive-ui"
import BaseLayout from "./layout/BaseLayout.vue"
// import { useCommand } from "@/composables/command"
import { useThemeStore } from "@/store"

const themeStore = useThemeStore()
// const { initCommands } = useCommand()
// initCommands()
</script>

<style scoped></style>
