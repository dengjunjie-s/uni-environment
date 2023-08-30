<template>
  <PageHeader
    :title="formData.id ? '相册详情' : '新增相册'"
    bodyPadding="30rpx"
  >
    <u-form ref="refForm" labelPosition="top" labelWidth="100%">
      <u-form-item label="相册标题:">
        <u-input v-model="formData.title" />
      </u-form-item>
      <u-form-item label="照片:">
        <UploadFile v-model:fileList="imgList" :mex="12" />
      </u-form-item>
    </u-form>
    <view class="but">
      <u-button type="primary" text="提交" @click="toSub()" />
    </view>
    <view class="but">
      <u-button v-if="formData.id" type="error" text="删除" @click="del()" />
    </view>
  </PageHeader>
</template>

<script setup lang="ts">
import { Talbum } from '@/types/album';
import UploadFile from '@/components/UploadFile.vue';
import { SaveAlbum, DelAlbums } from '@/apis/album';
import useUserStore from '@/stores/userStore';
const userStore = useUserStore();

const formData = reactive<Talbum>({});
onLoad(() => {
  try {
    const form: Talbum = JSON.parse(userStore.formJson);
    Object.assign(formData, form);
  } catch (err) {
    formData.staffId = userStore.userId;
  }
  userStore.formJson = '';
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
    return uni.showToast({ icon: 'none', title: '相册标题未填写' });
  } else if (!imgList.value.length) {
    return uni.showToast({ icon: 'none', title: '请上传图片' });
  }
  await SaveAlbum(formData);
  uni.navigateBack();
};

const del = () => {
  uni.showModal({
    title: '提示',
    content: '确定要删除该数据吗?',
    success: async function (res) {
      if (res.confirm) {
        await DelAlbums([formData.id]);
        userStore.refreshState++;
        uni.navigateBack();
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  });
};
</script>

<style scoped>
.but {
  margin-bottom: 20rpx;
}
</style>
