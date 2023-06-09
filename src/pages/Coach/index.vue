<template>
  <view class="container">
    <view class="container-top">
      <view class="title">教练端</view>
      <view class="info">
        <u-avatar
          class="info-avatar"
          :src="userStore.userInfo.avatar"
          :size="70"
        />
      </view>
    </view>
    <view class="container-butList">
      <view v-for="(moduleItem, moduleIndex) in moduleList1" :key="moduleIndex">
        <view
          class="moduleItem"
          @click="moduleItemClick(moduleItem?.path + '')"
        >
          <u-image
            :src="moduleItem.img"
            width="120rpx"
            height="120rpx"
            class="img"
          />
          <text>{{ moduleItem.name }}</text>
        </view>
      </view>
    </view>
    <view class="container-butList">
      <view
        v-for="(moduleItem, moduleIndex) in moduleList2"
        :key="moduleIndex"
        class="moduleItem"
        @click="moduleItemClick(moduleItem?.path + '')"
      >
        <u-image
          :src="moduleItem.img"
          width="120rpx"
          height="120rpx"
          class="img"
        />
        <text>{{ moduleItem.name }}</text>
      </view>
      <view class="moduleItem" />
    </view>
    <view class="but">
      <u-button @click="userStore.wxlogin"> 退出登录 </u-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import lishidingdan from '@/static/image/lishidingdan.png';
import lingyongshenqing from '@/static/image/lingyongshenqing.png';
import saoma from '@/static/image/saoma-.png';

import shezhiFill from '@/static/image/shezhi-fill-.png';
import xinzenghuopin from '@/static/image/xinzenghuopin.png';
const userStore = useUserStore();

const moduleList1 = [
  {
    img: lishidingdan,
    name: '预约设置与排期',
    path: '/pages/Home/AboutUs'
  },
  { img: lingyongshenqing, name: '用户预约记录' },
  { img: saoma, name: '核销预约' }
];
const moduleList2 = [
  {
    img: xinzenghuopin,
    name: '登录修改密码',
    path: '/pages/Home/AboutUs'
  },
  { img: shezhiFill, name: '预约设置排期' }
];
const moduleItemClick = (path?: string) => {
  path && uni.navigateTo({ url: path });
};
</script>

<style scoped lang="scss">
.container {
  background: $u-info-light;
  height: 100vh;
  &-butList {
    background: #fff;
    padding: 20rpx;
    display: flex;
    justify-content: space-between;
    margin: 20rpx;
    .moduleItem {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: $u-main-color;
      width: 230rpx;
      text {
        font-size: 28rpx;
        margin-top: 15rpx;
      }
    }
  }
  &-top {
    background: $u-primary;
    height: 350rpx;
    border-radius: 0 0 0 70rpx;

    .title {
      padding: 50rpx;
      color: #fff;
      text-align: center;
    }
    .info {
      margin-left: 50rpx;
    }
  }
  .but {
    padding: 0 20rpx;
  }
}
</style>
