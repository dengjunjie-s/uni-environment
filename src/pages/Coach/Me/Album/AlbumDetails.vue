<template>
  <PageHeader title="相册详情" bodyPadding="30rpx">
    <u-form ref="refForm" labelPosition="top" labelWidth="100%">
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
  </PageHeader>
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
    formData.staffId = userStore.userId;
  }
  formData.staffId = userStore.userId;
});

const refForm = ref();
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
  if (!formData.title) {
    return uni.showToast({ title: '相册标题未填写' });
  } else if (!imgList.value.length) {
    return uni.showToast({ title: '请上传图片' });
  }
  await SaveAlbum(formData);
  uni.navigateBack();
};

const title = computed(() => {
  return formData.id ? '修改相册' : '新增相册';
});
</script>

<style scoped></style>
