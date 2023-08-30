<template>
  <PageHeader
    :title="formData.id ? '排课详情' : '新增排课'"
    bodyPadding="30rpx"
  >
    <u-form ref="refForm" labelPosition="top" labelWidth="100%">
      <u-form-item label="预约时间:">
        <DateChoice v-model:value="formData.date" />
      </u-form-item>
      <u-form-item label="课程种类:">
        <ChoiceModal
          :columns="pickerColumns"
          v-model:value="formData.courseId"
        />
      </u-form-item>
      <u-form-item label="选择学生:">
        <StudentChoicevue v-model:value="formData.studentIds" />
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
import { SaveScheduling, DelScheduling } from '@/apis/Scheduling';
import { TScheduling } from '@/types/Scheduling';
import DateChoice from '@/components/Choice/DateChoice.vue';
import useUserStore from '@/stores/userStore';
import StudentChoicevue from '@/components/Choice/StudentChoice.vue';
import ChoiceModal from '@/components/Choice/ChoiceModal.vue';
import { GetCourseTypePage } from '@/apis/Course';
const userStore = useUserStore();

const formData = reactive<TScheduling>({});
onLoad(({ data }: any) => {
  try {
    const form: TScheduling = JSON.parse(data);
    Object.assign(formData, form);
  } catch (err) {
    console.log(err);
    formData.staffId = userStore.userId;
    formData.state = 1;
  }
  formData.staffId = userStore.userId;
});

const refForm = ref();

const toSub = async () => {
  if (!formData.date) {
    return uni.showToast({ icon: 'none', title: '日期未选择' });
  } else if (!formData.courseId) {
    return uni.showToast({ icon: 'none', title: '课程未选择' });
  } else if (!formData.studentIds) {
    return uni.showToast({ icon: 'none', title: '学员未选择' });
  }
  await SaveScheduling({
    ...formData,
    date: new Date(formData.date).toJSON()
  });
  userStore.refreshState++;
  uni.navigateBack();
};

const pickerColumns = ref<any[]>([]);
const loadPickerColumns = async () => {
  const res = await GetCourseTypePage({
    staffId: userStore.userId,
    page: 1,
    size: -1
  });
  pickerColumns.value =
    res.content?.map(({ name, id }) => {
      return { name, value: id };
    }) || [];
};
loadPickerColumns();

const del = () => {
  uni.showModal({
    title: '提示',
    content: '确定要删除该数据吗?',
    success: async function (res) {
      if (res.confirm) {
        await DelScheduling([formData.id]);
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
