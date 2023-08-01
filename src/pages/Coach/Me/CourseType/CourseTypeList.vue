<template>
  <PageHeader title="课程种类">
    <template #top>
      <view class="searchBox">
        <u-icon name="plus-circle" color="#fff" size="28" @tap="toDetails()" />
        <view class="input">
          <u-input
            placeholder="请输入搜索关键字"
            v-model="searchValue"
            border="bottom"
            clearable
          />
        </view>
        <u-icon name="search" color="#fff" size="28" @tap="refreshPage" />
      </view>
      <view />
    </template>
    <view class="cantainer">
      <scroll-view
        scroll-y
        @scrolltolower="nextPage"
        style="height: calc(100vh - 260rpx)"
      >
        <view
          v-for="item in pageList"
          :key="item.id"
          class="item"
          @click="toDetails(item)"
        >
          <view class="item-title">
            {{ item.name }}
          </view>
          <view class="item-image" v-if="item.remark">
            {{ item.remark }}
          </view>
        </view>
        <u-empty v-if="!pageList.length" />
      </scroll-view>
    </view>
  </PageHeader>
</template>

<script setup lang="ts">
import useTurn from '@/hooks/useTurn';
import { GetCourseTypePage, DelCourseTypes } from '@/apis/Course';
import { TcourseType } from '@/types/Course';
import useUserStore from '@/stores/userStore';
const userStore = useUserStore();

const searchValue = ref('');
const { pageList, nextPage, refreshPage } = useTurn<TcourseType>(
  async (params: TPageParams) => {
    return await GetCourseTypePage({ ...params, staffId: userStore.userId });
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
onShow(() => refreshPage());
</script>

<style scoped lang="scss">
.cantainer {
  background: #f0f0f0;
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
.item {
  padding: 20rpx;
  margin: 26rpx 26rpx;
  background: #fff;
  &-title {
    font-weight: 500;
    margin-bottom: 20rpx;
  }
  &-image {
    display: flex;
    margin-top: 20rpx;
    justify-content: space-between;
  }
  &-but {
    display: flex;
    justify-content: flex-end;
    margin-top: 20rpx;
    background: #fff;
  }
}
</style>
