<template>
  <view class="heard">
    <view class="avatar">
      <u-button open-type="getPhoneNumber" @getphonenumber="getphonenumber">
        <u-avatar :src="userStore.userInfo.avatar" mode="square" />
      </u-button>
    </view>
    <text>{{ userStore.userInfo.name }}</text>
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
const userStore = useUserStore();
const getphonenumber = async (e: any) => {
  userStore.wxlogin(e.detail.code);
};
</script>

<style scoped lang="scss">
.heard {
  background: $uni-color-primary;
  padding-top: 200rpx;
  padding-bottom: 50rpx;
  display: flex;
  align-items: center;
  color: #fff;
  justify-content: flex-start;
  .avatar {
    margin: 0 40rpx;
  }
}
</style>
