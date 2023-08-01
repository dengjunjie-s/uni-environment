<template>
  <PageHeader title="课程排程" :show-back="false" body-padding="">
    <swiper class="swiper" circular @change="swiperChange">
      <swiper-item itemId="0">
        <Calendar
          ref="refCalendar0"
          :setDate="dateList[0]"
          :nowDate="nowDate"
        />
      </swiper-item>
      <swiper-item itemId="1">
        <Calendar
          ref="refCalendar1"
          :setDate="dateList[1]"
          :nowDate="nowDate"
        />
      </swiper-item>
      <swiper-item itemId="2">
        <Calendar
          ref="refCalendar2"
          :setDate="dateList[2]"
          :nowDate="nowDate"
        />
      </swiper-item>
    </swiper>
  </PageHeader>
</template>

<script setup lang="ts">
import useUserStore from '@/stores/userStore';
import PageHeader from '@/components/PageHeader.vue';
import Calendar from './Calendar.vue';
import Dayjs from 'dayjs';
const userStore = useUserStore();

const refCalendar0 = ref();
const refCalendar1 = ref();
const refCalendar2 = ref();

const choiceIndex = ref(0);
const choiceDate = ref<Date>(new Date());
choiceDate.value.setHours(0, 0, 0, 0);

const dateList = computed<[Date, Date, Date]>(() => {
  const choice = choiceDate.value.valueOf();
  const previous = choice - 7 * 86400000;
  const next = choice + 7 * 86400000;
  return choiceIndex.value === 0
    ? [new Date(choice), new Date(next), new Date(previous)]
    : choiceIndex.value === 1
    ? [new Date(previous), new Date(choice), new Date(next)]
    : [new Date(next), new Date(previous), new Date(choice)];
});
const swiperChange = ({ detail }: any) => {
  choiceDate.value = dateList.value[Number(detail.currentItemId)];
  choiceIndex.value = Number(detail.currentItemId);
};

const loadData = () => {
  const val = choiceIndex.value;
  val === 0
    ? refCalendar0.value.loadSchedulingList()
    : val === 1
    ? refCalendar1.value.loadSchedulingList()
    : refCalendar2.value.loadSchedulingList();
};
watch(choiceIndex, () => loadData());
watch(
  () => userStore.refreshState,
  () => loadData()
);
onShow(() => loadData());
onMounted(() => loadData());
const nowDate = Dayjs();
</script>

<style scoped lang="scss">
.swiper {
  height: calc(100vh - 320rpx);
}
</style>
