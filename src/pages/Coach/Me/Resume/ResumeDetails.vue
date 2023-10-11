<template>
  <PageHeader
    :title="formData.id ? '履历详情' : '新增履历'"
    bodyPadding="30rpx"
  >
    <u-form ref="refForm" labelPosition="top" labelWidth="100%">
      <u-form-item label="履历标题:">
        <u-input v-model="formData.title" />
      </u-form-item>
      <u-form-item label="备注:">
        <u-input v-model="formData.remark" />
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
import { TResume } from '@/types/Resume';
import UploadFile from '@/components/UploadFile.vue';
import { getform, setform } from '@/utils/uniStorage';
import { SaveResume, DelResumes } from '@/apis/Resume';
import useUserStore from '@/stores/userStore';
const userStore = useUserStore();

const formData = reactive<TResume>({});
onLoad(() => {
  try {
    const form: TResume = JSON.parse(getform(1));
    Object.assign(formData, form);
  } catch (err) {
    formData.staffId = userStore.userId;
  }
  setform(1, '');
  formData.staffId = userStore.userId;
});

const refForm = ref();
const imgList = computed<string[]>({
  get() {
    try {
      const list: string[] = JSON.parse(formData?.imgStr + '');
      return list;
    } catch (err) {
      return [];
    }
  },
  set(value) {
    formData.imgStr = JSON.stringify(value);
  }
});

const toSub = async () => {
  if (!formData.title) {
    return uni.showToast({ icon: 'none', title: '履历标题未填写' });
  } else if (!imgList.value.length) {
    return uni.showToast({ icon: 'none', title: '请上传图片' });
  }
  await SaveResume(formData);
  uni.navigateBack();
};

const del = () => {
  uni.showModal({
    title: '提示',
    content: '确定要删除该数据吗?',
    success: async function (res) {
      if (res.confirm) {
        await DelResumes([formData.id]);
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
