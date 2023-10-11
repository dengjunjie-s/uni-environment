<template>
  <PageHeader
    :title="formData.id ? '谈单夹详情' : '新增谈单夹'"
    bodyPadding="30rpx"
  >
    <u-form ref="refForm" labelPosition="top" labelWidth="100%">
      <u-form-item label="谈单夹标题:">
        <u-input v-model="formData.title" />
      </u-form-item>
      <u-form-item label="照片:">
        <UploadFile v-model:fileList="imgList" :mex="12" />
      </u-form-item>
      <u-form-item label="视频:">
        <UploadVideo v-model:fileUrl="videoUrl" />
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
import { Tvideos } from '@/types/Videos';
import UploadVideo from '@/components/UploadVideo.vue';
import { getform, setform } from '@/utils/uniStorage';
import UploadFile from '@/components/UploadFile.vue';
import { SaveVideos, DelVideoss } from '@/apis/Videos';
import useUserStore from '@/stores/userStore';
const userStore = useUserStore();

const formData = reactive<Tvideos>({});
const videoUrl = ref('');
const imgList = ref<string[]>([]);
onLoad(() => {
  try {
    const form: Tvideos = JSON.parse(getform(1));
    Object.assign(formData, form);
    const videoPathObj = JSON.parse(form.videoPath + '');
    imgList.value = videoPathObj.imgList || [];
    videoUrl.value = videoPathObj.videoUrl || '';
  } catch (err) {
    formData.staffId = userStore.userId;
  }
  setform(1, '');
  formData.staffId = userStore.userId;
});

const refForm = ref();

const toSub = async () => {
  if (!formData.title) {
    return uni.showToast({ icon: 'none', title: '标题未填写' });
  }
  await SaveVideos({
    ...formData,
    videoPath: JSON.stringify({
      imgList: imgList.value || [],
      videoUrl: videoUrl.value
    })
  });
  uni.navigateBack();
};

const del = () => {
  uni.showModal({
    title: '提示',
    content: '确定要删除该数据吗?',
    success: async function (res) {
      if (res.confirm) {
        await DelVideoss([formData.id]);
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
