<template>
  <view class="container">
    <view class="header">
      <view class="header-text">资讯></view>
      <view class="header-input">
        <u-input shape="circle" placeholder="搜索资讯" prefixIcon="search" />
      </view>
    </view>
    <view class="swiper">
      <u-swiper :list="swiperImgList" indicator indicatorMode="line" circular />
    </view>
    <view class="moduleList">
      <u-scroll-list>
        <view
          v-for="(moduleItem, moduleIndex) in moduleList"
          :key="moduleIndex"
        >
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
      </u-scroll-list>
    </view>
    <NewsList />
  </view>
</template>

<script setup lang="ts">
import guanyuwomen from '@/static/image/guanyuwomen.png';
import huiyuanzhanshi from '@/static/image/huiyuanzhanshi.png';
import shenqingruhui from '@/static/image/shenqingruhui.png';
import lianxiwomen from '@/static/image/lianxiwomen.png';

import NewsList from './News/components/NewsList.vue';
const swiperImgList = ref([
  'https://cdn.uviewui.com/uview/swiper/swiper3.png',
  'https://cdn.uviewui.com/uview/swiper/swiper2.png',
  'https://cdn.uviewui.com/uview/swiper/swiper1.png'
]);
const moduleList = ref([
  {
    img: guanyuwomen,
    name: '关于我们',
    path: '/pages/Home/AboutUs'
  },
  { img: huiyuanzhanshi, name: '会员展示' },
  { img: shenqingruhui, name: '申请入会' },
  { img: lianxiwomen, name: '联系我们' },
  { img: huiyuanzhanshi, name: '会员展示' },
  { img: shenqingruhui, name: '申请入会' },
  { img: lianxiwomen, name: '联系我们' },
  { img: huiyuanzhanshi, name: '会员展示' },
  { img: shenqingruhui, name: '申请入会' },
  { img: lianxiwomen, name: '联系我们' },
  { img: huiyuanzhanshi, name: '会员展示' },
  { img: shenqingruhui, name: '申请入会' },
  { img: lianxiwomen, name: '联系我们' }
]);

const moduleItemClick = (path?: string) => {
  path && uni.navigateTo({ url: path });
};

const tabsClick = () => {
  //
};
</script>

<style scoped lang="scss">
.container {
  background: rgb(248, 248, 248);

  .header {
    background: #fff;
    padding: 20rpx;
    display: flex;
    align-items: center;
    &-text {
      font-weight: 550;
      font-size: 37rpx;
      margin-right: 20rpx;
    }
    &-input {
      width: 300rpx;
    }
  }
  .swiper {
    margin: 20rpx;
  }
  .moduleList {
    background: #fff;
    padding-top: 20rpx;
    margin: 20rpx;
    border-radius: 15rpx;
    .moduleItem {
      text-align: center;
      font-size: 26rpx;
      margin: 0 30rpx;
    }
  }
}
.sticky {
  width: 100%;
  background: #000;
}
</style>
