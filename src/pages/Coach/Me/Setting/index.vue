<template>
  <PageHeader title="系统设置">
    <u-cell-group>
      <u-cell title="用户反馈" :isLink="true" @click="toFeetBack" />
      <u-cell
        title="退出登录"
        :isLink="true"
        @click="modalTitle = '是否退出登录'"
      />
      <u-cell
        title="绑定微信账号"
        :isLink="true"
        @click="modalTitle = '是否本账号绑定微信'"
      />
    </u-cell-group>
    <u-modal
      :show="!!modalTitle"
      :title="modalTitle"
      showCancelButton
      @confirm="confirm"
      @cancel="modalTitle = ''"
    />
  </PageHeader>
</template>

<script setup lang="ts">
import useUserStore from '@/stores/userStore';
import { EditAccountRoleOrWxcode } from '@/apis/user';
const userStore = useUserStore();

const modalTitle = ref('');
const confirm = async () => {
  if (modalTitle.value === '是否退出登录') {
    userStore.loadOut();
  } else if (modalTitle.value === '是否本账号绑定微信') {
    //
    const loginInfo: any = await uni.login({
      provider: 'weixin'
    });
    const wxCode = loginInfo.code;
    await EditAccountRoleOrWxcode({
      wxCode,
      userId: userStore.userId
    });
  }
  modalTitle.value = '';
};
const toFeetBack = () => {
  uni.navigateTo({ url: '/pages/Coach/Me/Setting/Feedback' });
};
</script>

<style scoped></style>
