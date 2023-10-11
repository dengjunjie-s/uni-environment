<template>
  <PageHeader title="账号列表">
    <view class="cnateiner">
      <scroll-view
        scroll-y
        @scrolltolower="nextPage"
        style="height: calc(100vh - 160rpx)"
      >
        <u-cell-group>
          <u-cell
            v-for="item in pageList"
            :key="item.id"
            @click="toDetails(item)"
            :title="item.userName"
          />
        </u-cell-group>
        <u-empty v-if="!pageList.length" />
      </scroll-view>
    </view>
  </PageHeader>
</template>

<script setup lang="ts">
import useTurn from '@/hooks/useTurn';
import { GetAccountPage } from '@/apis/administrators';
import { setform } from '@/utils/uniStorage';
import useUserStore from '@/stores/userStore';
const userStore = useUserStore();
const { pageList, nextPage, refreshPage } = useTurn(
  async (params: TPageParams) => {
    return await GetAccountPage({ ...params });
  }
);

const toDetails = (item?: any) => {
  setform(1, JSON.stringify(item));
  uni.navigateTo({
    url: '/pages/Coach/Me/Administrators/Account/AccountDetails/index'
  });
};

onShow(() => refreshPage());
</script>

<style scoped lang="scss">
.cnateiner {
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
</style>
