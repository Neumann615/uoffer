<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    default: () => "",
  },
  poster: {
    type: String,
    default: () => "",
  },
});
const videoPlayer = ref();
const isPlay = ref(false);

const playVideo = () => {
  videoPlayer.value?.play();
};

const handlePlay = () => {
  isPlay.value = true;
  // console.log("开始播放");
};
const handlePause = () => {
  isPlay.value = false;
  // console.log("播放暂停");
};
</script>

<template>
  <div class="w-full h-full relative">
    <img
      v-show="!isPlay"
      @click.stop="playVideo"
      class="pos-absolute w-50px left-50% top-50% -translate-x-50% -translate-y-50% cursor-pointer z-10"
      src="/img/home/play-video.png"
    />
    <video
      :poster="props.poster"
      ref="videoPlayer"
      :controls="isPlay"
      :src="props.src"
      fit="cover"
      controlslist="nodownload noplaybackrate"
      class="w-full h-full"
      @play="handlePlay"
      @pause="handlePause"
    ></video>
  </div>
</template>
