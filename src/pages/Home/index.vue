<template>
  <view class="container">
    <u-input
      placeholder="搜索资讯"
      prefixIcon="search"
      prefixIconStyle="font-size: 22px;color: #909399"
    />
    <view class="swiper">
      <u-swiper :list="swiperImgList" indicator indicatorMode="line" circular />
    </view>
    <u-grid :border="false" col="4" class="moduleList">
      <u-grid-item
        v-for="(moduleItem, moduleIndex) in moduleList"
        @click="moduleItemClick(moduleItem.path ? moduleItem.path + '' : '')"
        :key="moduleIndex"
      >
        <view class="moduleItem">
          <u-image
            :src="moduleItem.img"
            width="150rpx"
            height="150rpx"
            class="img"
          />
          <text>{{ moduleItem.name }}</text>
        </view>
      </u-grid-item>
    </u-grid>
    <uni-nav-bar title="导航栏组件">asddasd</uni-nav-bar>
  </view>
</template>

<script setup lang="ts">
import guanyuwomen from '@/static/image/guanyuwomen.png';
import huiyuanzhanshi from '@/static/image/huiyuanzhanshi.png';
import shenqingruhui from '@/static/image/shenqingruhui.png';
import lianxiwomen from '@/static/image/lianxiwomen.png';
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
  { img: lianxiwomen, name: '联系我们' }
]);

const moduleItemClick = (path?: string) => {
  path && uni.navigateTo({ url: path });
};
</script>

<style scoped lang="scss">
.container {
  padding: 20rpx;
  .swiper {
    margin-top: 20rpx;
  }
}
.moduleItem {
  margin-top: 20rpx;
  text-align: center;
}
</style>
