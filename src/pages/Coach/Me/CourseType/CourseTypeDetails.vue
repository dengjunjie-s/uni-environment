<template>
  <PageHeader :title="title">
    <view class="cantainer">
      <u-form
        :model="formData"
        ref="refForm"
        labelPosition="top"
        labelWidth="100%"
      >
        <u-form-item label="种类名称:">
          <u-input v-model="formData.name" />
        </u-form-item>
        <u-form-item label="备注:">
          <u-textarea v-model="formData.remark" />
        </u-form-item>
      </u-form>
      <view class="but">
        <u-button type="primary" text="提交" @click="toSub()" />
      </view>
    </view>
  </PageHeader>
</template>

<script setup lang="ts">
import { TcourseType } from '@/types/Course';
import { SaveCourseType } from '@/apis/Course';
import useUserStore from '@/stores/userStore';
const userStore = useUserStore();

const formData = reactive<TcourseType>({});
onLoad(({ data }: any) => {
  try {
    const form: TcourseType = JSON.parse(data);
    Object.assign(formData, form);
  } catch (err) {
    formData.staffId = userStore.userId;
  }
});

const toSub = async () => {
  if (!formData.name) {
    return uni.showToast({ title: '种类名称未填写' });
  }
  await SaveCourseType(formData);
  uni.navigateBack();
};

const title = computed(() => {
  return formData.id ? '修改课程种类' : '新增课程种类';
});
</script>

<style scoped>
.cantainer {
  padding: 30rpx;
}
</style>
