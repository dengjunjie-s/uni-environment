<template>
  <u-input v-model="inputValue" border="none" type="number" inputAlign="right">
    <template #suffix>
      <slot name="suffix" />
    </template>
  </u-input>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value?: number;
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
