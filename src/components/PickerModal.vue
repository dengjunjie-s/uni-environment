<template>
  <u-picker
    :show="pickerShow"
    ref="uPicker"
    :columns="[columns.map((item) => item.name)]"
    @confirm="pickerConfirm"
    @cancel="pickerShow = false"
  />
  <view class="slot" @click="pickerShow = true">
    <slot>
      <u-input v-model="inputValue" type="number" inputAlign="right" />
    </slot>
    <view class="mask" />
  </view>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value?: any;
    columns: { name?: string; value?: any }[];
  }>(),
  {}
);

const inputValue = computed(() => {
  return props.columns.find((item) => props.value === item.value)?.name;
});

const pickerShow = ref(false);
const emit = defineEmits(['update:value', 'confirm']);
const pickerConfirm = ({ value }: any) => {
  const backData = props.columns.find((item) => value[0] === item.name);
  emit('update:value', backData?.value);
  emit('confirm', backData?.value);
  pickerShow.value = false;
};
defineExpose({ pickerShow });
</script>

<style scoped>
.slot {
  position: relative;
}
.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
</style>
