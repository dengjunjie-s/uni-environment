<!-- 图标组件 -->
<template>
  <view class="alIcon-gongsi" style="font-size: 30px"></view>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: string;
    size?: number;
  }>(),
  {}
);
</script>
<style lang="scss"></style>
