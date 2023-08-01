<template>
  <PageHeader
    :title="formData.id ? '排课详情' : '排课新增'"
    bodyPadding="30rpx"
  >
    <u-form ref="refForm" labelPosition="top" labelWidth="100%">
      <u-form-item label="预约时间:">
        <DateChoice v-model:value="formData.date" />
      </u-form-item>
      <u-form-item label="课程种类:">
        <PickerModal
          :columns="pickerColumns"
          v-model:value="formData.courseId"
        />
      </u-form-item>
      <u-form-item label="选择学生:">
        <StudentChoicevue v-model:value="formData.studentIds" />
      </u-form-item>
    </u-form>
    <u-row justify="space-between" gutter="10">
      <u-col span="6">
        <u-button type="success" text="已上课" @click="toSub(2)" />
      </u-col>
      <u-col span="6">
        <u-button type="primary" text="保存修改" @click="toSub()" />
      </u-col>
    </u-row>
    <view class="but">
      <u-button type="error" text="删除" @click="del()" />
    </view>
  </PageHeader>
</template>

<script setup lang="ts">
import { SaveScheduling, DelScheduling } from '@/apis/Scheduling';
import { TScheduling } from '@/types/Scheduling';
import DateChoice from '@/components/DateChoice.vue';
import useUserStore from '@/stores/userStore';
import StudentChoicevue from '@/components/StudentChoice.vue';
import PickerModal from '@/components/PickerModal.vue';
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

const toSub = async (state?: number) => {
  if (!formData.date) {
    return uni.showToast({ icon: 'none', title: '日期未选择' });
  } else if (!formData.courseId) {
    return uni.showToast({ icon: 'none', title: '课程未选择' });
  } else if (!formData.studentIds) {
    return uni.showToast({ icon: 'none', title: '学员未选择' });
  }
  await SaveScheduling({
    ...formData,
    date: new Date(formData.date).toJSON(),
    state: state ? state : formData.state
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
  margin-top: 20rpx;
}
</style>
