<template>
  <view class="container">
    <u-navbar
      placeholder
      safeAreaInsetTop
      fixed
      :title="title"
      :bgColor="bg"
      @rightClick="backFun"
      :autoBack="showBack"
      :titleStyle="{
        color: '#fff'
      }"
    >
      <template #right> </template>
    </u-navbar>
    <slot />
  </view>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string;
    backFun?: any;
    showBack?: boolean;
    bg: string;
  }>(),
  {
    showBack: false,
    backFun: () => uni.navigateBack,
    bg: '#2b3167'
  }
);
</script>

<style scoped></style>
