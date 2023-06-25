<template>
  <u-picker
    :show="pickerShow"
    ref="uPicker"
    :columns="[columns.map((item) => item.name)]"
    @confirm="pickerConfirm"
  />
  <u-input
    v-model="inputValue"
    @focus="pickerShow = true"
    border="none"
    type="number"
    inputAlign="right"
  >
  </u-input>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value: any;
    columns: { name: string; value: any }[];
  }>(),
  {}
);

const inputValue = computed(() => {
  return props.columns.find((item) => props.value === item.value)?.name;
});

const pickerShow = ref(false);
const emit = defineEmits(['update:value']);
const pickerConfirm = ({ value }: any) => {
  emit(
    'update:value',
    props.columns.find((item) => value[0] === item.name)?.value
  );
  pickerShow.value = false;
};
</script>

<style scoped></style>
