<template>
  <PageHeader title="我的学员" :showBack="false" bodyBg="#f0f0f0">
    <template #top>
      <view class="searchBox">
        <u-icon name="plus-circle" color="#fff" size="28" @tap="toDetails()" />
        <view class="input">
          <u-input
            placeholder="请输入搜索关键字"
            v-model="searchValue"
            border="bottom"
            clearable
            color="#fff"
          />
        </view>
        <u-icon name="search" color="#fff" size="28" @tap="getStudentList" />
      </view>
      <view />
    </template>

    <scroll-view scroll-y style="height: calc(100vh - 410rpx)">
      <view
        class="item"
        v-for="item in dataList"
        :key="item.id"
        @click="toDetails(item)"
      >
        <u-avatar src="" />
        <view class="item-title">
          {{ item.studentName }}
        </view>
      </view>
      <u-empty v-if="!dataList.length" />
    </scroll-view>
  </PageHeader>
</template>

<script setup lang="ts">
import { GetStudentList } from '@/apis/Student';
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

watch(
  () => userStore.refreshState,
  () => getStudentList()
);

const toDetails = (item?: any) => {
  uni.navigateTo({
    url:
      '/pages/Coach/Student/StudentDetails' +
      (item ? '?data=' + JSON.stringify(item) : '')
  });
};
onShow(() => getStudentList());
</script>

<style scoped lang="scss">
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
.item {
  padding: 20rpx;
  margin: 20rpx;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  background: #fff;
  &-title {
    font-weight: 500;
    margin-left: 30rpx;
  }
}
</style>
