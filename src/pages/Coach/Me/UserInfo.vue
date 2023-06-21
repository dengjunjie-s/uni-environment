<template>
  <u-form
    labelPosition="left"
    :model="formData"
    :rules="rules"
    ref="form1"
    labelWidth="auto"
    :labelStyle="{
      marginLeft: '30rpx',
      marginRight: '20rpx'
    }"
  >
    <u-form-item label="头像" prop="avatar" borderBottom class="formItem">
      <view class="avatar formItem">
        <UploadFile v-model:fileList="fileList" />
      </view>
    </u-form-item>
    <u-form-item label="姓名" prop="nickname" borderBottom class="formItem">
      <view class="formItem">
        <u-input v-model="formData.nickname" border="none" inputAlign="right" />
      </view>
    </u-form-item>
    <u-form-item label="性别" prop="gender" borderBottom>
      <view class="formItem">
        <u-input v-model="formData.gender" border="none" inputAlign="right" />
      </view>
    </u-form-item>
    <u-form-item label="地区" prop="bust" borderBottom>
      <view class="formItem">
        <u-input v-model="formData.bust" border="none" inputAlign="right" />
      </view>
    </u-form-item>
    <u-form-item label="体重" prop="weight" borderBottom>
      <view class="formItem">
        <u-input
          v-model="formData.weight"
          border="none"
          type="number"
          inputAlign="right"
        >
          <template #suffix> KG </template>
        </u-input>
      </view>
    </u-form-item>
    <u-form-item label="身高" prop="height" borderBottom>
      <view class="formItem">
        <u-input
          v-model="formData.height"
          border="none"
          type="number"
          inputAlign="right"
        >
          <template #suffix> CM </template>
        </u-input>
      </view>
    </u-form-item>
    <u-form-item label="胸围" prop="gender" borderBottom>
      <view class="formItem">
        <u-input
          v-model="formData.bust"
          border="none"
          type="number"
          inputAlign="right"
        >
          <template #suffix> CM </template>
        </u-input>
      </view>
    </u-form-item>
    <u-form-item label="腰围" prop="waistline" borderBottom>
      <view class="formItem">
        <u-input
          v-model="formData.waistline"
          border="none"
          type="number"
          inputAlign="right"
        >
          <template #suffix> CM </template>
        </u-input>
      </view>
    </u-form-item>
    <u-form-item label="臀围" prop="hip" borderBottom>
      <view class="formItem">
        <u-input
          v-model="formData.hip"
          border="none"
          type="number"
          inputAlign="right"
        >
          <template #suffix> CM </template>
        </u-input>
      </view>
    </u-form-item>
  </u-form>
  <view class="but">
    <u-button type="primary" text="保存" @click="sub" />
  </view>
</template>

<script setup lang="ts">
import { TuserInfo } from '@/types/user';
import { EditUserInfo } from '@/apis/user';
import UploadFile from '@/components/UploadFile.vue';
import useUserStore from '@/stores/userStore';
const userStore = useUserStore();
const formData = reactive<TuserInfo>({
  ...userStore.userInfo
});
const rules = {};

const sub = async () => {
  uni.showLoading({ title: '保存中' });
  try {
    await EditUserInfo(formData);
    await userStore.getUserInfo();
    uni.navigateBack();
  } catch (err) {}
  uni.hideLoading();
};

const fileList = computed({
  get() {
    return formData.avatar ? [formData.avatar] : [];
  },
  set(list) {
    formData.avatar = list[0];
  }
});
</script>

<style scoped>
.formItem {
  margin-right: 30rpx;
}
.avatar {
  display: flex;
  justify-content: flex-end;
}
.but {
  padding: 30rpx;
}
</style>
