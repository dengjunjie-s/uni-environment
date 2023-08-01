<template>
  <PageHeader
    :title="formData.id ? '学员详情' : '新增学员'"
    bodyPadding="30rpx"
  >
    <u-form ref="refForm" labelPosition="top" labelWidth="100%">
      <u-form-item label="学员姓名:">
        <u-input v-model="formData.studentName" />
      </u-form-item>
      <u-form-item label="学员手机号码:">
        <u-input v-model="formData.studentPhone" />
      </u-form-item>
    </u-form>
    <view class="but">
      <u-button type="primary" text="提交" @click="toSub()" />
    </view>

    <view class="but">
      <u-button v-if="formData.id" type="error" text="删除" @click="del" />
    </view>
  </PageHeader>
</template>

<script setup lang="ts">
import { SaveStudent, DelStudent } from '@/apis/Student';
import { TStudent } from '@/types/Student';
import useUserStore from '@/stores/userStore';
const userStore = useUserStore();

const formData = reactive<TStudent>({});
onLoad(({ data }: any) => {
  try {
    const form: TStudent = JSON.parse(data);
    Object.assign(formData, form);
  } catch (err) {
    formData.staffId = userStore.userId;
  }
  formData.staffId = userStore.userId;
});

const refForm = ref();

const toSub = async () => {
  if (!formData.studentName) {
    return uni.showToast({ icon: 'none', title: '学员名称未填写' });
  } else if (!formData.studentPhone) {
    return uni.showToast({ icon: 'none', title: '学员手机号码未填写' });
  }
  await SaveStudent(formData);
  userStore.refreshState++;
  uni.navigateBack();
};

const del = () => {
  uni.showModal({
    title: '提示',
    content: '确定要删除该数据吗?',
    success: async function (res) {
      if (res.confirm) {
        await DelStudent([formData.id]);
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
