<template>
  <PageHeader title="个人信息">
    <u-form
      labelPosition="left"
      :model="formData"
      :rules="rules"
      ref="refForm"
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
      <u-form-item label="姓名" prop="name" borderBottom class="formItem">
        <view class="formItem">
          <u-input v-model="formData.name" border="none" inputAlign="right" />
        </view>
      </u-form-item>
      <u-form-item label="性别" prop="gender" borderBottom>
        <view class="formItem">
          <ChoiceModal
            :columns="[
              { name: '男', value: 1 },
              { name: '女', value: 2 }
            ]"
            border="none"
            v-model:value="formData.gender"
          />
        </view>
      </u-form-item>
      <u-form-item label="体重" prop="weight" borderBottom>
        <view class="formItem">
          <NumberInput
            v-model:value="formData.weight"
            border="none"
            inputAlign="right"
          >
            <template #suffix> KG </template>
          </NumberInput>
        </view>
      </u-form-item>
      <u-form-item label="身高" prop="height" borderBottom>
        <view class="formItem">
          <NumberInput
            v-model:value="formData.height"
            border="none"
            inputAlign="right"
          >
            <template #suffix> CM </template>
          </NumberInput>
        </view>
      </u-form-item>
      <u-form-item label="胸围" prop="bust" borderBottom>
        <view class="formItem">
          <NumberInput
            v-model:value="formData.bust"
            border="none"
            inputAlign="right"
          >
            <template #suffix> CM </template>
          </NumberInput>
        </view>
      </u-form-item>
      <u-form-item label="腰围" prop="waistline" borderBottom>
        <view class="formItem">
          <NumberInput
            v-model:value="formData.waistline"
            border="none"
            inputAlign="right"
          >
            <template #suffix> CM </template>
          </NumberInput>
        </view>
      </u-form-item>
      <u-form-item label="臀围" prop="hip" borderBottom>
        <view class="formItem">
          <NumberInput
            v-model:value="formData.hip"
            border="none"
            inputAlign="right"
          >
            <template #suffix> CM </template>
          </NumberInput>
        </view>
      </u-form-item>
      <u-form-item label="头像" prop="avatar" borderBottom class="formItem">
        <view class="avatar formItem">
          <UploadFile v-model:fileList="fileList" />
        </view>
      </u-form-item>
    </u-form>
    <view class="but">
      <u-button type="primary" text="保存" @click="sub" />
    </view>
  </PageHeader>
</template>

<script setup lang="ts">
import { TuserInfo } from '@/types/user';
import { EditUserInfo } from '@/apis/user';
import useUserStore from '@/stores/userStore';
import UploadFile from '@/components/UploadFile.vue';
import ChoiceModal from '@/components/Choice/ChoiceModal.vue';
import PageHeader from '@/components/PageHeader.vue';
import NumberInput from '@/components/NumberInput.vue';
const userStore = useUserStore();
const formData = reactive<TuserInfo>({
  ...userStore.userInfo
});

const rules = {
  name: [
    {
      type: 'string',
      required: true,
      message: '请填写姓名',
      trigger: ['blur', 'change']
    }
  ]
};

const refForm = ref();
const sub = async () => {
  if (!((await refForm.value.validate()) === true)) return;
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
  width: calc(100% - 30rpx);
}
.avatar {
  display: flex;
  justify-content: flex-end;
}
.but {
  padding: 30rpx;
}
</style>
