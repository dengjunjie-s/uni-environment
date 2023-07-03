<template>
  <view class="pageHeader">
    <u-navbar
      placeholder
      safeAreaInsetTop
      fixed
      :border="false"
      :title="title"
      :bgColor="bg"
      :autoBack="showBack"
      :titleStyle="{
        color: '#fff'
      }"
    >
      <template #left>
        <view v-if="showBack" @click="back">
          <u-icon bold name="arrow-left" color="#fff" />
        </view>
      </template>
    </u-navbar>
    <view :style="{ background: bg }" v-if="!!slots.top" class="pageHeader-top">
      <slot name="top" />
    </view>
    <view
      :style="{
        background: bodyBg,
        padding: bodyPadding
      }"
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
  height: 100%;
  background: #000;
  &-top {
    height: 44px;
    padding: 0 30rpx;
    color: #fff;
  }
}
</style>
