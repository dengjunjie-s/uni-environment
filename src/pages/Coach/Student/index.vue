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
        <u-icon name="search" color="#fff" size="28" @tap="getStudentList" />
      </view>
      <view />
    </template>
    <u-list v-if="dataList.length" height="calc(100vh - 150px)">
      <u-list-item v-for="item in dataList" :key="item.id">
        <view class="item">
          <view class="item-title">
            {{ item.studentName }}
          </view>
          <!-- <view class="item-image" v-if="item.remark">
            {{ item.remark }}
          </view> -->
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
      </u-list-item>
    </u-list>
    <u-empty v-else />
  </PageHeader>
</template>

<script setup lang="ts">
import { GetStudentList, DelStudent } from '@/apis/Student';

import { TStudent } from '@/types/Student';
import useUserStore from '@/stores/userStore';
const userStore = useUserStore();

const searchValue = ref('');
const dataList = ref<TStudent[]>([]);
const getStudentList = async () => {
  const res = await GetStudentList({ staffId: userStore.userId });
  dataList.value = res;
};
getStudentList();

const toDetails = (item?: any) => {
  uni.navigateTo({
    url:
      '/pages/Coach/Me/CourseType/CourseTypeDetails' +
      (item ? '?data=' + JSON.stringify(item) : '')
  });
};
const toDel = async (ids: any[]) => {
  await DelStudent(ids);
  getStudentList();
};
onShow(() => getStudentList());
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
  margin: 20rpx;
  margin-bottom: 0;
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
