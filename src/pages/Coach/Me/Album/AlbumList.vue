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
            clearable
          />
        </view>
        <u-icon name="search" color="#fff" size="28" @tap="refreshPage" />
      </view>
      <view />
    </template>
    <view class="cnateiner">
      <u-list
        @scrolltolower="nextPage"
        v-if="pageList.length"
        height="calc(100vh - 150px)"
      >
        <u-list-item v-for="item in pageList" :key="item.id">
          <view class="item">
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
    </view>
  </PageHeader>
</template>

<script setup lang="ts">
import useTurn from '@/hooks/useTurn';
import { GetAlbumPage, DelAlbums } from '@/apis/album';
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
  uni.navigateTo({
    url:
      '/pages/Coach/Me/Album/AlbumDetails' +
      (item ? '?data=' + JSON.stringify(item) : '')
  });
};
const toDel = async (ids: any[]) => {
  await DelAlbums(ids);
  refreshPage();
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
</style>
