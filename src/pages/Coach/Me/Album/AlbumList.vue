<template>
  <PageHeader title="相册列表">
    <template #top>
      <view class="searchBox">
        <u-icon name="plus-circle" color="#fff" size="28" @tap="toDetails()" />
        <view class="input">
          <u-input
            placeholder="请输入搜索关键字"
            v-model="searchValue"
            border="bottom"
            color="#fff"
            clearable
          />
        </view>
        <u-icon name="search" color="#fff" size="28" @tap="refreshPage" />
      </view>
      <view />
    </template>
    <view class="cnateiner">
      <scroll-view
        scroll-y
        @scrolltolower="nextPage"
        style="height: calc(100vh - 260rpx)"
      >
        <view
          class="item"
          v-for="item in pageList"
          :key="item.id"
          @click="toDetails(item)"
        >
          <view class="item-title">
            {{ item.title }}
          </view>
          <view class="item-image">
            <view
              v-for="(img, index) in getImgList(item.albumList)"
              :key="img"
              class="image"
            >
              <u-image
                width="210rpx"
                height="210rpx"
                :src="img"
                :lazy-load="true"
                v-if="index < 3"
              />
            </view>
          </view>
        </view>
        <u-empty v-if="!pageList.length" />
      </scroll-view>
    </view>
  </PageHeader>
</template>

<script setup lang="ts">
import useTurn from '@/hooks/useTurn';
import { GetAlbumPage } from '@/apis/album';
import useUserStore from '@/stores/userStore';
const userStore = useUserStore();

const searchValue = ref('');
const { pageList, nextPage, refreshPage } = useTurn(
  async (params: TPageParams) => {
    return await GetAlbumPage({ ...params, staffId: userStore.userId });
  }
);

const getImgList = (str?: string) => {
  try {
    const list = JSON.parse(str + '');
    return Array.isArray(list) ? list : [];
  } catch (err) {
    return [];
  }
};

const toDetails = (item?: any) => {
  userStore.formJson = JSON.stringify(item);
  uni.navigateTo({
    url: '/pages/Coach/Me/Album/AlbumDetails'
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
