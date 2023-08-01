<template>
  <view class="calendar">
    <view class="calendar-top">
      <view class="calendar-top-item">
        <view>{{ setDate.getUTCFullYear() }}</view>
        <view>{{ setDate.getUTCMonth() + 1 }}月 </view>
      </view>
      <view
        v-for="(day, dayBoxIndex) in dayDateList"
        :key="dayBoxIndex"
        class="calendar-top-item"
      >
        <view :class="nowDate.isSame(day.date, 'day') ? 'today' : null">
          {{ day.date.getDate() }}号
        </view>
        <view>
          周{{
            {
              0: '一',
              1: '二',
              2: '三',
              3: '四',
              4: '五',
              5: '六',
              6: '七'
            }[dayBoxIndex]
          }}
        </view>
      </view>
    </view>
    <scroll-view
      scroll-y
      :style="{
        height: 'calc(100vh - 410rpx)'
      }"
    >
      <view class="calendar-body">
        <view class="calendar-body-text">
          <view
            class="calendar-body-text-box"
            v-for="(item, index) in timeNum"
            :key="item"
          >
            {{ index }}:00
          </view>
        </view>
        <view
          class="calendar-body-week"
          v-for="(day, index) in dayDateList"
          :key="index"
        >
          <view
            class="calendar-body-week-box"
            v-for="time in timeNum"
            @click="boxClick(day.dateValue + time)"
            :key="time"
          >
            <view class="calendar-body-week-box-item">
              {{ checkDate(day.dateValue + time) ? '已排课' : '' }}
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import useUserStore from '@/stores/userStore';
import { GetSchedulingPage } from '@/apis/Scheduling';
import { TScheduling } from '@/types/Scheduling';
const userStore = useUserStore();

const props = withDefaults(
  defineProps<{
    setDate: Date;
    nowDate: any;
  }>(),
  {}
);

const boxClick = (dateValue: number) => {
  const findItem = schedulingList.value.find(
    (item) => item.dateValue === dateValue
  );
  if (findItem) {
    uni.navigateTo({
      url:
        '/pages/Coach/Scheduling/SchedulingDetails?data=' +
        JSON.stringify(findItem)
    });
  } else {
    uni.navigateTo({
      url:
        '/pages/Coach/Scheduling/SchedulingDetails?data=' +
        JSON.stringify({ date: new Date(dateValue) })
    });
  }
};
const checkDate = (dateValue: number) => {
  return schedulingList.value.some((item) => item.dateValue === dateValue);
};

const weekStartValue = computed(() => {
  const weekNum = props.setDate.getDay() ? props.setDate.getDay() - 1 : 6;
  return props.setDate.setHours(0, 0, 0, 0) - 86400000 * weekNum;
});

const dayDateList = computed(() => {
  return ['', '', '', '', '', '', ''].map((item, index) => {
    const date = new Date(weekStartValue.value + index * 86400000);
    return {
      date,
      dateValue: date.valueOf()
    };
  });
});

const timeNum = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
].map((item, index) => 3600000 * index);

const schedulingList = ref<TScheduling[]>([]);
const loadSchedulingList = async () => {
  const res = await GetSchedulingPage({
    size: -1,
    page: 1,
    staffId: userStore.userId,
    startDate: new Date(weekStartValue.value).toJSON(),
    endDate: new Date(weekStartValue.value + 7 * 86400000).toJSON()
  });
  schedulingList.value =
    res.content?.map((item) => {
      const date = item.date ? new Date(item.date) : undefined;
      return {
        ...item,
        date,
        dateValue: date?.valueOf()
      };
    }) || [];
};
defineExpose({ loadSchedulingList });
</script>

<style scoped lang="scss">
.calendar {
  width: 750rpx;
  &-body {
    display: flex;
    justify-content: space-between;
    color: #424242;
    &-text {
      flex: 1;
      &-box {
        height: 100rpx;
        text-align: center;
      }
    }
    &-week {
      flex: 1;
      &-box {
        height: 100rpx;
        &-item {
          border-left: 1rpx solid #424242;
          border-bottom: 1rpx solid #424242;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
  &-top {
    display: flex;
    background: $my-bg;
    color: #fff;
    justify-content: space-between;
    &-item {
      flex: 1;
      height: 120rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      .today {
        background: #7e7e7e;
        height: 60rpx;
        width: 60rpx;
        line-height: 60rpx;
        text-align: center;
        border-radius: 30rpx;
      }
    }
  }
}
</style>
