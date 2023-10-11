<template>
  <PageHeader :title="formData.id ? '学员详情' : '新增学员'">
    <scroll-view scroll-y style="height: calc(100vh - 160rpx)">
      <view class="cantainer">
        <u-form ref="refForm" labelPosition="top" labelWidth="100%">
          <u-form-item label="头像" prop="avatar" borderBottom class="formItem">
            <view class="avatar formItem">
              <UploadFile v-model:fileList="fileList" />
            </view>
          </u-form-item>
          <u-form-item label="学员姓名:">
            <u-input v-model="formData.studentName" />
          </u-form-item>
          <u-form-item label="学员手机号:">
            <u-input v-model="formData.studentPhone" />
          </u-form-item>
          <u-form-item label="学员档案:">
            <u-button
              v-if="formData.id"
              text="编辑学员档案"
              @click="toStudentDom"
            />
          </u-form-item>
          <u-form-item label="性别" prop="gender" borderBottom>
            <view class="formItem">
              <ChoiceModal
                :columns="[
                  { name: '男', value: 1 },
                  { name: '女', value: 2 }
                ]"
                v-model:value="formData.gender"
              />
            </view>
          </u-form-item>
          <u-form-item label="体重" prop="weight" borderBottom>
            <view class="formItem">
              <NumberInput v-model:value="formData.weight">
                <template #suffix> KG </template>
              </NumberInput>
            </view>
          </u-form-item>
          <u-form-item label="身高" prop="height" borderBottom>
            <view class="formItem">
              <NumberInput v-model:value="formData.height">
                <template #suffix> CM </template>
              </NumberInput>
            </view>
          </u-form-item>
          <u-form-item label="vip开始时间" prop="startDate" borderBottom>
            <view class="formItem">
              <DateChoice v-model:value="formData.startDate" mode="date" />
            </view>
          </u-form-item>
          <u-form-item label="vip结束时间" prop="endDate" borderBottom>
            <view class="formItem">
              <DateChoice v-model:value="formData.endDate" mode="date" />
            </view>
          </u-form-item>
        </u-form>
        <view class="but">
          <u-button type="primary" text="提交" @click="toSub()" />
        </view>
        <view class="but">
          <u-button v-if="formData.id" type="error" text="删除" @click="del" />
        </view>
      </view>
    </scroll-view>
  </PageHeader>
</template>

<script setup lang="ts">
import { SaveStudent, DelStudent } from '@/apis/Student';
import { getform } from '@/utils/uniStorage';
import UploadFile from '@/components/UploadFile.vue';
import ChoiceModal from '@/components/Choice/ChoiceModal.vue';
import PageHeader from '@/components/PageHeader.vue';
import NumberInput from '@/components/NumberInput.vue';
import DateChoice from '@/components/Choice/DateChoice.vue';
import { TStudent } from '@/types/Student';
import useUserStore from '@/stores/userStore';
const userStore = useUserStore();

const formData = reactive<TStudent>({});
onLoad(() => {
  try {
    const form: TStudent = JSON.parse(getform(1));
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
  } else if (!formData.avatar) {
    return uni.showToast({ icon: 'none', title: '学员头像未选择' });
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

const fileList = computed({
  get() {
    return formData.avatar ? [formData.avatar] : [];
  },
  set(list) {
    formData.avatar = list[0];
  }
});
const toStudentDom = () => {
  uni.navigateTo({
    url: '/pages/Coach/Student/StudentDom/index'
  });
};
</script>

<style scoped>
.but {
  margin-bottom: 20rpx;
}
.cantainer {
  padding: 30rpx;
}
</style>
