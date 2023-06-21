<template>
  <u-popup :show="show" @open="emti('open')" @close="emti('close')">
    <view :style="{ height, padding }">
      <slot></slot>
    </view>
  </u-popup>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    show: boolean;
    height?: string;
    padding?: string;
  }>(),
  {
    height: '60vh',
    padding: '30rpx'
  }
);
const emti = defineEmits(['open', 'close']);
</script>
