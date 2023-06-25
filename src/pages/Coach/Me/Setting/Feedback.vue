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
        <u-form-item label="联系方式" prop="phoneOrMail" borderBottom>
          <u-input v-model="formData.phoneOrMail" placeholder="请输入内容" />
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
    await AddFeetback(formData);
    uni.navigateBack();
  } catch (err) {}
};
</script>

<style scoped>
.but {
  padding: 30rpx;
}
.cantainer {
  padding: 30rpx;
}
</style>
