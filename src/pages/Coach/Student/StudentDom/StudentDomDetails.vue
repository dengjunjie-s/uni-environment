<template>
  <PageHeader
    :title="formData.uuid ? '档案详情' : '新增档案'"
    bodyPadding="30rpx"
  >
    <u-form ref="refForm" labelPosition="top" labelWidth="100%">
      <u-form-item label="档案日期:">
        <DateChoice v-model:value="formData.date" />
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
      <u-button v-if="formData.uuid" type="error" text="删除" @click="del()" />
    </view>
  </PageHeader>
</template>

<script setup lang="ts">
import UploadVideo from '@/components/UploadVideo.vue';
import UploadFile from '@/components/UploadFile.vue';
import { SaveStudent } from '@/apis/Student';
import { setform, getform } from '@/utils/uniStorage';
import { TStudentDom, TStudent } from '@/types/Student';
import DateChoice from '@/components/Choice/DateChoice.vue';
import useUserStore from '@/stores/userStore';
const userStore = useUserStore();

const formData = reactive<any>({});
const videoUrl = ref('');
const imgList = ref<string[]>([]);
onLoad(() => {
  try {
    const form: any = JSON.parse(getform(2));
    console.log(form);
    Object.assign(formData, form);
    imgList.value = form.imgList || [];
    videoUrl.value = form.videoUrl || '';
  } catch (err) {
    console.log(err);
  }
});

const refForm = ref();

const toSub = async () => {
  if (!formData.date) {
    return uni.showToast({ icon: 'none', title: '日期未选择' });
  }
  const studentDetails: TStudent = JSON.parse(getform(1));
  let domList: TStudentDom[] = [];
  try {
    domList = JSON.parse(studentDetails?.record + '');
  } catch (err) {}
  if (formData.uuid) {
    const index = domList.findIndex(({ uuid }: any) => uuid === formData.uuid);
    domList.splice(index === -1 ? 0 : index, 1, {
      ...formData,
      uuid: new Date().valueOf(),
      imgList: imgList.value,
      videoUrl: videoUrl.value
    });
  } else {
    domList.splice(0, 0, {
      ...formData,
      uuid: new Date().valueOf(),
      imgList: imgList.value,
      videoUrl: videoUrl.value
    });
  }
  const subData = {
    ...studentDetails,
    record: JSON.stringify(domList)
  };
  await SaveStudent(subData);
  setform(1, JSON.stringify(subData));
  uni.navigateBack();
};

const del = () => {
  uni.showModal({
    title: '提示',
    content: '确定要删除该数据吗?',
    success: async function (res) {
      if (res.confirm) {
        const studentDetails: TStudent = JSON.parse(getform(1));
        let domList: TStudentDom[] = [];
        try {
          domList = JSON.parse(studentDetails?.record + '');
        } catch (err) {}
        const index = domList.findIndex(
          ({ uuid }: any) => uuid === formData.uuid
        );
        domList.splice(index === -1 ? 0 : index, 1);
        const subData = {
          ...studentDetails,
          record: JSON.stringify(domList)
        };
        await SaveStudent(subData);
        setform(1, JSON.stringify(subData));
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
