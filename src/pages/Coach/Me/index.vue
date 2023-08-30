<template>
  <PageHeader title="我的" :show-back="false" body-padding="">
    <view class="top">
      <view class="info">
        <u-avatar
          class="info-avatar"
          :src="userStore.userInfo.avatar"
          :size="70"
        />
        <view class="info-box">
          <view class="name"> {{ userStore.userInfo.name }}</view>
        </view>
      </view>
    </view>
    <view class="grid">
      <scroll-view scroll-y style="height: calc(100vh - 590rpx)">
        <u-cell
          v-for="(item, index) in moduleList"
          :key="index"
          :icon="item.icon"
          :title="item.title"
          @click="gridClick(item.path)"
        />
      </scroll-view>
    </view>
  </PageHeader>
</template>

<script setup lang="ts">
import useUserStore from '@/stores/userStore';
import PageHeader from '@/components/PageHeader.vue';
const userStore = useUserStore();

const moduleList = [
  // { icon: 'file-text', title: '数据统计' },
  { icon: 'account', title: '个人信息', path: '/pages/Coach/Me/UserInfo' },
  { icon: 'tags', title: '个人标签', path: '/pages/Coach/Me/UserTags' },
  {
    icon: 'order',
    title: '课程种类',
    path: '/pages/Coach/Me/CourseType/CourseTypeList'
  },
  { icon: 'man-add', title: '邀请好友' },
  { icon: 'account', title: '账号设置', path: '/pages/Coach/Me/Setting/index' },
  {
    icon: 'account',
    title: '管理员设置',
    path: '/pages/Coach/Me/Administrators/index'
  }
];

const gridClick = (path?: string) => {
  path
    ? uni.navigateTo({ url: path })
    : uni.showToast({ title: '正在开发....', icon: 'none' });
};
</script>

<style scoped lang="scss">
.top {
  background: $my-bg;
  height: 270rpx;
  border-radius: 0 0 0 70rpx;
  .info {
    padding-left: 70rpx;
    padding-top: 30rpx;
    padding-bottom: 70rpx;
    color: #fff;
    display: flex;
    align-items: center;
    &-box {
      margin-left: 50rpx;

      .mobile {
        margin-top: 10px;
        font-size: 24rpx;
      }
      .name {
        font-size: 30rpx;
      }
    }
  }
}
.grid {
  .gridItem {
    padding: 20rpx;
    height: 120rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
  }
}
</style>
