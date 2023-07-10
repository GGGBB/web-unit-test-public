<template>
  <div class="content">
    <TheVideoPlayer :videoList="videoList" />
    <!-- <VideoUploader /> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import TheVideoPlayer from "../components/videoPlayer/TheVideoPlayer.vue"
// import VideoUploader from "../components/uploader/VideoUploader.vue"

const videoList = ref([
  {
    videoId: 1,
    url: "001.mp4",
  },
  {
    videoId: 2,
    url: "002.mp4",
  },
  {
    videoId: 3,
    url: "003.mp4",
  },
])
</script>

<style lang="scss" scoped>
.content {
  margin: 0 auto;
  width: 100%;
  height: 100%;
}
</style>
