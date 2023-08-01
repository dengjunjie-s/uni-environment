<template>
  <view
    class="pageHeader"
    :style="
      bodyBg
        ? {
            background: bodyBg
          }
        : {}
    "
  >
    <view :style="{ background: bg }">
      <view class="header">
        <view class="header-back">
          <u-icon
            v-if="showBack"
            @click="back"
            bold
            name="arrow-left"
            color="#fff"
          />
        </view>
        <view>{{ title }}</view>
      </view>
      <view v-if="!!slots.top" class="pageHeader-top">
        <slot name="top" />
      </view>
    </view>

    <view
      :style="
        bodyPadding
          ? {
              padding: bodyPadding
            }
          : {}
      "
    >
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string;
    backFun?: any;
    showBack?: boolean;
    bg?: string;
    bodyBg?: string;
    bodyPadding?: string;
  }>(),
  {
    showBack: true,
    bg: '#2b3167',
    bodyBg: '#ffffff',
    bodyPadding: ''
  }
);
const slots = useSlots();
const back = () => {
  props.backFun ? props.backFun : uni.navigateBack();
};
</script>

<style scoped lang="scss">
.pageHeader {
  height: 100vh;
  .header {
    height: 90rpx;
    padding-top: 80rpx;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &-back {
      position: absolute;
      left: 30rpx;
      bottom: 25rpx;
    }
  }
  &-top {
    height: 90rpx;
    padding: 0 30rpx;
    color: #fff;
  }
}
</style>
