<template>
  <page-header title="登录" :show-back="false">
    <view class="canteiner">
      <view class="logo">
        <u-image :src="ggbony" width="350rpx" height="350rpx" radius="175rpx" />
      </view>
      <view class="formItem">
        <u-input
          placeholder="请输入手机号码"
          v-model="form.mobile"
          type="number"
          clearable
        />
      </view>
      <view class="formItem">
        <u-input
          placeholder="请输入密码"
          v-model="form.passWord"
          type="password"
          clearable
        />
      </view>
      <view class="formItem">
        <u-button type="primary" @click="sub"> 登录 </u-button>
      </view>
      <view class="formItem">
        <u-button type="success" @click="wxlogin"> 微信登录 </u-button>
      </view>
    </view>
  </page-header>
</template>

<script setup lang="ts">
import useUserStore from '@/stores/userStore';
import ggbony from '@/static/image/ggbony.png';
const userStore = useUserStore();

const form = reactive<{
  mobile?: string;
  passWord?: string;
  wxCode?: string;
}>({
  mobile: '15814885346',
  passWord: '123'
});

const sub = async () => {
  if (!form.passWord || !form.mobile) {
    return uni.showToast({
      title: !form.passWord ? '请填写密码' : '请填写账号',
      icon: 'none'
    });
  }
  await userStore.wxlogin(form);
  uni.redirectTo({ url: '/pages/Coach/index' });
};
const wxlogin = async () => {
  const loginInfo: any = await uni.login({
    provider: 'weixin'
  });

  form.wxCode = loginInfo.code;
  await userStore.wxlogin(form);
  uni.redirectTo({
    url: '/pages/Coach/index'
  });
};
// wxlogin();
</script>

<style scoped lang="scss">
.canteiner {
  padding: 20px;
  .formItem {
    margin-bottom: 20rpx;
  }
  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30rpx;
  }
}
</style>
