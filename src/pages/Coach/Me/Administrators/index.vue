<template>
  <PageHeader title="管理员设置">
    <u-cell-group>
      <u-cell
        v-for="(item, index) in moduleList"
        :key="index"
        :icon="item.icon"
        :title="item.title"
        @click="gridClick(item.path)"
      />
    </u-cell-group>
  </PageHeader>
</template>

<script setup lang="ts">
import useUserStore from '@/stores/userStore';
const userStore = useUserStore();
const gridClick = (path?: string) => {
  path
    ? uni.navigateTo({ url: path })
    : uni.showToast({ title: '正在开发....', icon: 'none' });
};

const moduleList = [
  {
    icon: 'account',
    title: '角色管理',
    path: '/pages/Coach/Me/Administrators/Role/index',
    check: userStore.checkRole(['roleConfig'])
  },
  {
    icon: 'account',
    title: '账号角色绑定',
    path: '/pages/Coach/Me/Administrators/Account/index',
    check: userStore.checkRole(['accountConfig'])
  }
];
</script>

<style scoped></style>
