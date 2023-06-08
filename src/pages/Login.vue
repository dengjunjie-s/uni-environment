<template>
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
    <!-- <u-button open-type="getPhoneNumber" @getphonenumber="getphonenumber">
      获取手机号
    </u-button> -->
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import ggbony from '@/static/image/ggbony.png';
const userStore = useUserStore();

const form = reactive<{
  mobile?: string;
  passWord?: string;
  wxCode?: string;
}>({});

const sub = async () => {
  if (!form.passWord || !form.mobile) {
    return uni.showToast({
      title: !form.passWord ? '请填写密码' : '请填写账号',
      icon: 'none'
    });
  }
  await userStore.wxlogin(form);
  uni.redirectTo({ url: 'pages/Home/index' });
};
const wxlogin = async () => {
  const loginInfo: any = await uni.login({
    provider: 'weixin'
  });
  await userStore.wxlogin({ wxCode: loginInfo.code });
  uni.redirectTo({
    url: '/pages/Home/index'
  });
};
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
