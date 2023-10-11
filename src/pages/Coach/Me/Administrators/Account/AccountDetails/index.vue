<template>
  <PageHeader title="账号详情">
    <view class="cnateiner">
      <scroll-view scroll-y style="height: calc(100vh - 310rpx)">
        <u-form ref="refForm" labelPosition="top" labelWidth="100%">
          <u-form-item label="账号名称:">
            <u-input
              v-model="formData.userName"
              inputAlign="right"
              :disabled="true"
            />
          </u-form-item>
          <u-form-item label="所属角色:">
            <ChoiceModal
              :columns="pickerColumns"
              v-model:value="formData.roleId"
            />
          </u-form-item>
        </u-form>
      </scroll-view>
      <view class="but">
        <u-button type="primary" text="绑定角色" @click="toSub()" />
      </view>
    </view>
  </PageHeader>
</template>

<script setup lang="ts">
import { GetRolePage } from '@/apis/administrators';
import { EditAccountRoleOrWxcode } from '@/apis/user';
import { getform } from '@/utils/uniStorage';
import ChoiceModal from '@/components/Choice/ChoiceModal.vue';
import { TRoleBase } from '@/types/administrators';
import useUserStore from '@/stores/userStore';
const userStore = useUserStore();
const formData = reactive<{ id?: number; roleId?: number; userName?: string }>(
  {}
);
const toSub = async () => {
  await EditAccountRoleOrWxcode({
    userId: formData.id,
    roleId: formData.roleId
  });
  uni.navigateBack();
};

const pickerColumns = ref<any[]>([]);
const getPickerColumns = async () => {
  const { content } = await GetRolePage({ page: 1, size: -1 });
  pickerColumns.value =
    content?.map(({ roleName, id }) => {
      return {
        value: id,
        name: roleName
      };
    }) || [];
};
getPickerColumns();

onLoad(() => {
  try {
    const form: TRoleBase = JSON.parse(getform(1));
    Object.assign(formData, form);
  } catch (err) {}
});
</script>

<style scoped lang="scss">
.cnateiner {
  background: #fff;
  padding: 20rpx;
}
.but {
  padding-top: 20rpx;
}
</style>
