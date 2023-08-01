<template>
  <PageHeader :title="formData.id ? '课程种类详情' : '新增课程种类'">
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
      <view class="but">
        <u-button v-if="formData.id" type="error" text="删除" @click="del()" />
      </view>
    </view>
  </PageHeader>
</template>

<script setup lang="ts">
import { TcourseType } from '@/types/Course';
import { SaveCourseType, DelCourseTypes } from '@/apis/Course';
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
    return uni.showToast({ icon: 'none', title: '种类名称未填写' });
  }
  await SaveCourseType(formData);
  uni.navigateBack();
};

const del = () => {
  uni.showModal({
    title: '提示',
    content: '确定要删除该数据吗?',
    success: async function (res) {
      if (res.confirm) {
        await DelCourseTypes([formData.id]);
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
.cantainer {
  padding: 30rpx;
}
.but {
  margin-bottom: 20rpx;
}
</style>
