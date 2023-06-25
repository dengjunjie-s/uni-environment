<template>
  <PageHeader title="课程种类">
    <view class="cantainer">
      <scroll-view scroll-y class="scrollBox" @scrolltolower="nextPage">
        <view v-for="item in pageList" :key="item.id" class="item">
          <view class="item-title">
            {{ item.name }}
          </view>
          <view class="item-image" v-if="item.remark">
            {{ item.remark }}
          </view>
          <view class="item-but">
            <view>
              <u-button
                type="primary"
                @click="toDetails(item)"
                text="查看详情"
                size="mini"
                :customStyle="{
                  width: '130rpx'
                }"
              />
            </view>
            <view>
              <u-button
                type="error"
                text="删除"
                @click="toDel([item.id as number])"
                size="mini"
                :customStyle="{
                  marginLeft: '20px',
                  width: '130rpx'
                }"
              />
            </view>
          </view>
        </view>
      </scroll-view>
      <view class="but">
        <u-button type="primary" text="新增种类" @click="toDetails()" />
      </view>
    </view>
  </PageHeader>
</template>

<script setup lang="ts">
import useTurn from '@/hooks/useTurn';
import { GetCourseTypePage, DelCourseTypes } from '@/apis/Course';

const { pageList, nextPage, refreshPage } = useTurn(
  async (params: TPageParams) => {
    return await GetCourseTypePage(params);
  }
);

const toDetails = (item?: any) => {
  uni.navigateTo({
    url:
      '/pages/Coach/Me/CourseType/CourseTypeDetails' +
      (item ? '?data=' + JSON.stringify(item) : '')
  });
};
const toDel = async (ids: any[]) => {
  await DelCourseTypes(ids);
  refreshPage();
};
</script>

<style scoped lang="scss">
.cantainer {
  height: 100vh;
  background: #f6f6f6;

  .scrollBox {
    height: calc(100vh - 160rpx);
    .item {
      padding: 20rpx;
      margin: 20rpx;
      margin-bottom: 0;
      background: #fff;
      &-title {
        font-size: 30rpx;
        font-weight: 500;
        margin-bottom: 20rpx;
      }
      &-image {
        display: flex;
        justify-content: space-between;
      }
      &-but {
        margin-top: 20rpx;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  .but {
    padding: 40rpx;
    background: #fff;
  }
}
</style>
