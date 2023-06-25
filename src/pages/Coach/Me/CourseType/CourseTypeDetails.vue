<template>
  <PageHeader title="课程种类详情">
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
        <u-button type="primary" :text="title" @click="toSub()" />
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
  await SaveCourseType(formData);
  uni.navigateBack();
};

const title = computed(() => {
  return formData.id ? '修改相册' : '新增相册';
});
</script>

<style scoped>
.cantainer {
  padding: 30rpx;
}
</style>
