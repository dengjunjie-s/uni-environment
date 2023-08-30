<!-- 树组件 -->
<template>
  <view class="tree" :style="{ paddingRight: leftPaddingRpx + 'rpx' }">
    <TreeItems
      :treeData="treeData"
      :values="values"
      :fieldKey="fieldKey"
      :fieldName="fieldName"
      :fieldChild="fieldChild"
      :leftPaddingRpx="leftPaddingRpx"
      @valueChange="valueChange"
    />
  </view>
</template>

<script setup lang="ts">
import TreeItems from './TreeItems.vue';
const props = withDefaults(
  defineProps<{
    treeData: any[];
    values: any[];
    fieldKey?: string;
    fieldName?: string;
    fieldChild?: string;
    leftPaddingRpx?: number;
  }>(),
  {
    fieldKey: 'id',
    fieldName: 'name',
    fieldChild: 'child',
    leftPaddingRpx: 20
  }
);

const emit = defineEmits(['update:values']);
const valueChange = (val: any) => {
  const { values } = props;
  const index = values.findIndex((item) => val === item);
  const copyValue = [...values];
  index === -1 ? copyValue.push(val) : copyValue.splice(index, 1);
  emit('update:values', copyValue);
};
</script>

<style scoped lang="scss">
.tree {
  padding-top: 20rpx;
  padding-bottom: 20rpx;
}
</style>
