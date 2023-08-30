<template>
  <u-calendar showLunar :show="calendarShow" @confirm="calendarConfirm" />
  <ChoiceModal
    ref="refChoiceModal"
    :columns="pickerColumns"
    @confirm="pickerConfirm"
  >
    <span />
  </ChoiceModal>
  <view class="slot" @click="calendarShow = true">
    <slot>
      <u-input v-model="inputValue" type="number" inputAlign="right" />
    </slot>
    <view class="mask" />
  </view>
</template>

<script setup lang="ts">
import ChoiceModal from '@/components/Choice/ChoiceModal.vue';
import Dayjs from 'dayjs';
const props = withDefaults(
  defineProps<{
    value: any;
  }>(),
  {}
);

const inputValue = computed(() => {
  return props.value
    ? Dayjs(new Date(props.value)).format('YYYY-MM-DD HH:mm')
    : '';
});

const calendarShow = ref(false);
const calendarValue = ref(0);
const refChoiceModal = ref();
const calendarConfirm = (data: any) => {
  calendarValue.value = new Date(data[0]).setHours(0, 0, 0, 0).valueOf() || 0;
  calendarShow.value = false;
  refChoiceModal.value.pickerShow = true;
};

const emit = defineEmits(['update:value']);
const pickerConfirm = (value: number) => {
  emit('update:value', new Date(value + calendarValue.value));
};
const pickerColumns = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
].map((item, index) => {
  return { name: index + ':00', value: 3600000 * index };
});
</script>

<style scoped></style>
