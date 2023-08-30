<template>
  <PageHeader title="角色列表">
    <view class="cnateiner">
      <scroll-view scroll-y style="height: calc(100vh - 310rpx)">
        <u-form ref="refForm" labelPosition="top" labelWidth="100%">
          <u-form-item label="角色名称:">
            <u-input v-model="formData.name" />
          </u-form-item>
          <u-form-item label="角色拥有权限:">
            <view v-if="formData.roleCode === 'SuperAdministrator'">
              超级管理员拥有全部权限
            </view>
            <Tree
              v-else
              :treeData="roleTree"
              v-model:values="treeValues"
              fieldKey="code"
            />
          </u-form-item>
        </u-form>
      </scroll-view>
      <view class="but">
        <u-button type="primary" text="提交" @click="toSub()" />
      </view>
    </view>
  </PageHeader>
</template>

<script setup lang="ts">
import { SaveRole } from '@/apis/role';
import { TRoleBase } from '@/types/role';
import useUserStore from '@/stores/userStore';
import Tree from '@/components/Tree/index.vue';
import { roleTree } from '../role';
const userStore = useUserStore();
const formData = reactive<TRoleBase>({});
const treeValues = computed({
  get: () => {
    try {
      const arr = JSON.parse(formData.roleJson + '');
      return Array.isArray(arr) ? arr : [];
    } catch (err) {
      return [];
    }
  },
  set: (val) => {
    formData.roleJson = !val ? '' : JSON.stringify(val);
  }
});
const toSub = async () => {
  if (!formData.name) {
    return uni.showToast({ icon: 'none', title: '相册标题未填写' });
  }
  await SaveRole({ ...formData });
  uni.navigateBack();
};

onLoad(() => {
  try {
    const form: TRoleBase = JSON.parse(userStore.formJson);
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
