<template>
  <PageHeader title="系统设置">
    <u-cell-group>
      <u-cell title="用户反馈" :isLink="true" @click="toFeetBack" />
      <u-cell title="退出登录" :isLink="true" @click="modalShow = true" />
    </u-cell-group>
    <u-modal
      :show="modalShow"
      title="是否退出登录"
      showCancelButton
      @confirm="confirm"
      @cancel="modalShow = false"
    />
  </PageHeader>
</template>

<script setup lang="ts">
import useUserStore from '@/stores/userStore';
const userStore = useUserStore();
const modalShow = ref(false);
const confirm = () => {
  userStore.loadOut();
};
const toFeetBack = () => {
  uni.navigateTo({ url: '/pages/Coach/Me/Setting/Feedback' });
};
</script>

<style scoped></style>
