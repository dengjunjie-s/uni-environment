<template>
  <view
    v-for="(item, index) in treeData"
    :key="item[fieldKey]"
    class="treeItems"
  >
    <view
      class="title"
      @click="valueChange(item[fieldKey])"
      :style="{ paddingLeft: leftPaddingRpx + 'rpx' }"
    >
      <view> {{ item[fieldName] }} </view>
      <checkbox
        class="checkbox"
        :checked="treeValues[index]"
        v-if="!!item[fieldKey]"
      />
    </view>
    <view class="child">
      <TreeItems
        :treeData="item[fieldChild]"
        :values="values"
        :fieldKey="fieldKey"
        :fieldName="fieldName"
        :fieldChild="fieldChild"
        :leftPaddingRpx="leftPaddingRpx + leftPaddingRpx"
        @valueChange="valueChange"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import TreeItems from './TreeItems.vue';
const props = withDefaults(
  defineProps<{
    treeData: any[];
    values: any[];
    fieldKey: string;
    fieldName: string;
    fieldChild: string;
    leftPaddingRpx: number;
  }>(),
  {}
);
const treeValues = computed(() => {
  const { treeData, fieldKey, values } = props;
  return treeData.map((item) => {
    if (!item[fieldKey]) return false;
    return values.some((val) => val === item[fieldKey]);
  });
});

const emit = defineEmits(['valueChange']);
const valueChange = (val: any) => {
  if (!val) return;
  emit('valueChange', val);
};
</script>
<style scoped lang="scss">
.treeItems {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    height: 70rpx;
    .checkbox {
      transform: scale(0.7);
    }
  }
}
</style>
