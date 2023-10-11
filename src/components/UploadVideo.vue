<template>
  <view v-if="props.fileUrl" class="videoBox">
    <video class="video" :src="props.fileUrl" />
  </view>
  <u-button v-else text="选择视频文件" @click="chooseVideo" />
  <u-button
    v-if="props.fileUrl"
    type="error"
    text="重新上传"
    @click="chooseVideo"
  />
</template>

<script setup lang="ts">
import { UploadVideoRequre } from '@/apis/user';
const props = withDefaults(
  defineProps<{
    fileUrl: string;
  }>(),
  {}
);
const emit = defineEmits(['update:fileUrl']);
const chooseVideo = async () => {
  emit('update:fileUrl', '');
  wx.chooseMessageFile({
    count: 1,
    type: 'video',
    async success({ tempFiles }: any) {
      if (!tempFiles[0].path) return;
      const res = await UploadVideoRequre(tempFiles[0].path);
      emit('update:fileUrl', res || '');
    },
    fail(err: any) {
      console.log(err);
    }
  });
};
</script>

<style scoped lang="scss">
.videoBox {
  display: flex;
  justify-content: center;
  height: 250rpx;
  .video {
    height: 250rpx;
    width: 100%;
  }
}
</style>
