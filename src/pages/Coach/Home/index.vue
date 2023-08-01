<template>
  <PageHeader title="任务列表" :showBack="false" bodyBg="#f0f0f0">
    <scroll-view scroll-y style="height: calc(100vh - 320rpx)">
      <view
        class="item"
        v-for="item in schedulingList"
        :key="item.id"
        @click="itemClick(item)"
      >
        <view class="item-title">
          {{ item.dayjs?.format('YYYY年MM月DD日 ') }}周{{
            {
              0: '一',
              1: '二',
              2: '三',
              3: '四',
              4: '五',
              5: '六',
              6: '七'
            }[item.dayjs?.toDate().getDay() as 0]
          }}
        </view>
        <view class="item-box">
          <view class="item-box-left">
            <view class="top">
              {{ getCourseTypeValByField(item.courseId, 'name') }}
            </view>
            <view class="bottom">
              {{ item.dayjs?.format('HH:mm') }}
            </view>
          </view>
          <view class="item-box-right">
            <view>
              <u-text
                :type="item.state === 2 ? 'success' : 'warning'"
                :text="item.state === 2 ? '·已上课' : '·未上课'"
              />
            </view>
            <u-icon name="arrow-right" color="#707070" size="20" />
          </view>
        </view>
      </view>
      <u-empty v-if="!schedulingList.length" />
    </scroll-view>
  </PageHeader>
</template>

<script setup lang="ts">
import useUserStore from '@/stores/userStore';
import { GetSchedulingPage } from '@/apis/Scheduling';
import { TScheduling } from '@/types/Scheduling';
import useCourseType from '@/hooks/useCourseType';
import Dayjs from 'dayjs';
const userStore = useUserStore();
const nowDate = ref<Date | undefined>();
const schedulingList = ref<TScheduling[]>([]);
const loadSchedulingList = async () => {
  nowDate.value = new Date();
  nowDate.value.setHours(0, 0, 0, 0);
  const res: { content?: TScheduling[] } = await GetSchedulingPage({
    size: -1,
    page: 1,
    staffId: userStore.userId,
    startDate: new Date(nowDate.value.valueOf() - 86400000 * 2).toJSON()
  });
  schedulingList.value =
    res.content
      ?.map((item) => {
        const date = item.date ? Dayjs(new Date(item.date)) : undefined;
        return {
          ...item,
          dayjs: date
        };
      })
      .sort((a, b) => {
        return (a.dateValue || 0) - (b.dateValue || 0);
      }) || [];
};

watch(
  () => userStore.refreshState,
  () => loadSchedulingList()
);
loadSchedulingList();
const { getCourseTypeValByField } = useCourseType();

const itemClick = (data: TScheduling) => {
  const copyDate = { ...data };
  delete copyDate.dayjs;
  uni.navigateTo({
    url: '/pages/Coach/Home/DateDetails?data=' + JSON.stringify(copyDate)
  });
};
</script>

<style scoped lang="scss">
.item {
  &-title {
    padding: 15rpx 20rpx;
    color: #707070;
  }
  &-box {
    background: #fff;
    color: #707070;
    padding: 20rpx;
    display: flex;
    justify-content: space-between;
    &-left {
      .top {
        margin-bottom: 20rpx;
        color: #000;
      }
      .bottom {
        font-size: 30rpx;
      }
    }
    &-right {
      display: flex;
      align-items: center;
    }
  }
}
.cantainer {
  background: #f0f0f0;
  height: 100%;
}
.searchBox {
  display: flex;
  justify-content: space-between;
  width: 100%;
  .input {
    width: 400rpx;
    input {
      background: #000;
    }
  }
}
</style>
