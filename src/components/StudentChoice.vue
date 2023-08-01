<template>
  <view class="tagBox">
    <view
      class="tagBox-item"
      v-for="(item, index) in choiceDataList"
      :key="item?.id"
    >
      <u-tag :text="item.studentName" closable @close="delDataList(index)" />
    </view>
    <view class="tagBox-item">
      <u-tag text="添加学员" @click="addClick" icon="plus" :plain="true" />
    </view>
  </view>
  <PickerModal
    ref="refPickerModal"
    :columns="pickerColumns"
    @confirm="addDataList"
  >
    <span />
  </PickerModal>
</template>

<script setup lang="ts">
import { GetStudentList } from '@/apis/Student';
import { TStudent } from '@/types/Student';
import PickerModal from '@/components/PickerModal.vue';
import useUserStore from '@/stores/userStore';
const userStore = useUserStore();

const refPickerModal = ref();

const props = withDefaults(
  defineProps<{
    value: any;
  }>(),
  {}
);
const emit = defineEmits(['update:value']);
const copyValue = computed({
  get() {
    try {
      const list: number[] = JSON.parse(props.value);
      return list;
    } catch (err) {
      return [];
    }
  },
  set(val) {
    console.log(val);
    emit('update:value', JSON.stringify(val));
  }
});
const addDataList = (id: number) => {
  copyValue.value = [...copyValue.value, id];
};

const delDataList = (index: number) => {
  const list = [...copyValue.value];
  list.splice(index, 1);
  copyValue.value = list;
};

const choiceDataList = computed(() => {
  return copyValue.value.map(
    (id) => dataList.value.find((item) => item.id === id) || {}
  );
});

const dataList = ref<TStudent[]>([]);
const getStudentList = async () => {
  const res = await GetStudentList({ staffId: userStore.userId });
  dataList.value = res;
};
getStudentList();
const pickerColumns = computed(() => {
  return dataList.value
    .filter((item) => !copyValue.value.includes(Number(item.id)))
    .map(({ id, studentName }) => {
      return {
        name: studentName,
        value: id
      };
    });
});
const addClick = () => {
  if (!dataList.value.length)
    return uni.showToast({ title: '请先在首页学员列表添加人员', icon: 'none' });
  refPickerModal.value.pickerShow = true;
};
</script>

<style scoped lang="scss">
.tagBox {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 0;
  &-item {
    margin: 10rpx 10rpx;
    display: flex;
    align-items: flex-end;
  }
}

.but {
  padding: 30rpx;
}
</style>
