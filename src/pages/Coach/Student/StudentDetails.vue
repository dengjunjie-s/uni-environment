<template>
  <view class="cantainer">
    <u-form
      :model="formData"
      ref="refForm"
      labelPosition="top"
      labelWidth="100%"
    >
      <u-form-item label="相册标题:">
        <u-input v-model="formData.title" />
      </u-form-item>
      <u-form-item label="照片:">
        <UploadFile v-model:fileList="imgList" :mex="12" />
      </u-form-item>
    </u-form>
    <view class="but">
      <u-button type="primary" :text="title" @click="toSub()" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { Talbum } from '@/types/album';
import UploadFile from '@/components/UploadFile.vue';
import { SaveAlbum } from '@/apis/album';
import useUserStore from '@/stores/userStore';
const userStore = useUserStore();

const formData = reactive<Talbum>({});
onLoad(({ data }: any) => {
  try {
    const form: Talbum = JSON.parse(data);
    Object.assign(formData, form);
  } catch (err) {
    formData.userId = userStore.userId;
  }
});

const imgList = computed<string[]>({
  get() {
    try {
      const list: string[] = JSON.parse(formData?.albumList + '');
      return list;
    } catch (err) {
      return [];
    }
  },
  set(value) {
    formData.albumList = JSON.stringify(value);
  }
});

const toSub = async () => {
  await SaveAlbum(formData);
  uni.navigateBack();
};

const title = computed(() => {
  return formData.id ? '修改相册' : '新增相册';
});
</script>

<style scoped>
.cantainer {
  padding: 30rpx;
}
</style>
