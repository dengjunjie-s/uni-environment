<template>
  <PageHeader title="问题反馈">
    <view class="cantainer">
      <u-form
        labelPosition="top"
        :model="formData"
        :rules="rules"
        ref="refForm"
        labelWidth="auto"
        :labelStyle="{
          marginLeft: '30rpx',
          marginRight: '20rpx'
        }"
      >
        <u-form-item label="反馈信息" prop="text" borderBottom>
          <u-textarea v-model="formData.text" placeholder="请输入内容" />
        </u-form-item>
        <u-form-item label="备注" prop="phoneOrMail" borderBottom>
          <u-input v-model="formData.phoneOrMail" placeholder="请输入内容" />
        </u-form-item>
        <u-form-item label="图片" prop="imgStr" borderBottom>
          <UploadFile v-model:fileList="imgList" />
        </u-form-item>
      </u-form>
    </view>
    <view class="but">
      <u-button type="primary" text="保存" @click="sub" />
    </view>
  </PageHeader>
</template>

<script setup lang="ts">
import { AddFeetback } from '@/apis/user';
import { Tfeetback } from '@/types/user';
import useUserStore from '@/stores/userStore';
import UploadFile from '@/components/UploadFile.vue';
const userStore = useUserStore();

const formData = reactive<Tfeetback>({
  staffId: userStore.userId
});

const rules = {
  text: {
    type: 'string',
    required: true,
    message: '请填写反馈信息',
    trigger: ['blur', 'change']
  }
};
const refForm = ref();
const sub = async () => {
  if (!((await refForm.value.validate()) === true)) return;
  try {
    await AddFeetback({ ...formData, imgStr: JSON.stringify(formData.imgStr) });
    uni.navigateBack();
  } catch (err) {}
};
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
</script>

<style scoped>
.but {
  padding: 30rpx;
}
.cantainer {
  padding: 30rpx;
}
</style>
