<script setup lang="ts">
import { openGithub, useGoto } from "@/composables"
import { Icon } from "@iconify/vue"

const { gotoHome, gotoSettings } = useGoto()
</script>

<template>
  <div
    class="w-full base-color h-40px px-1% flex justify-between items-center text-16px"
  >
    <div class="cursor-pointer" aria-label="Go Home" @click="gotoHome()">
      DiDa
    </div>
    <div class="flex items-center justify-start">
      <button class="mx-2 !outline-none" @click="gotoSettings()">
        <Icon icon="carbon-settings"></Icon>
      </button>
      <button class="mx-2 !outline-none" @click="openGithub()">
        <Icon icon="mdi-github"></Icon>
      </button>
    </div>
  </div>
</template>
