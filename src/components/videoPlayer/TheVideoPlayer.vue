<template>
  <div>
    <video ref="videoElement" class="video-js"></video>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue"
import videojs from "video.js"
import "video.js/dist/video-js.css"
import Player from "video.js/dist/types/player"

const props = defineProps<{
  videoList: { videoId: number; url: string }[]
}>()

const videoElement = ref<HTMLVideoElement | null>(null)
let player: Player
let currentVideoIndex = 0

const loadVideo = (index: number) => {
  player.src(props.videoList[index].url)
  player.play()
}

const playNextVideo = () => {
  currentVideoIndex++
  if (currentVideoIndex >= props.videoList.length) {
    currentVideoIndex = 0
  }
  loadVideo(currentVideoIndex)
}

onMounted(() => {
  if (videoElement.value) {
    player = videojs(videoElement.value, {
      aspectRatio: "1920:1080",
      preload: "auto",
      controls: true,
    })
    player.on("ended", playNextVideo)
    loadVideo(currentVideoIndex)
  }
})

onUnmounted(() => {
  if (player) {
    player.dispose()
  }
})
</script>
