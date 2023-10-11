<template>
  <u-input
    v-model="inputValue"
    :border="border"
    type="number"
    :inputAlign="inputAlign"
  >
    <template #suffix>
      <slot name="suffix" />
    </template>
  </u-input>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value?: number;
    border?: 'none';
    inputAlign?: 'right';
  }>(),
  {}
);

const emit = defineEmits(['update:value']);
const inputValue = computed({
  get() {
    return (props.value || '') + '';
  },
  set(val) {
    emit('update:value', parseFloat(val));
  }
});
</script>

<style scoped></style>
