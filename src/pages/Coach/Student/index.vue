<template>
  <PageHeader title="学员列表">
    <view class="cantainer">
      <scroll-view scroll-y class="scrollBox" @scrolltolower="nextPage">
        <view v-for="item in pageList" :key="item.id" class="item">
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
      </scroll-view>
      <view class="but">
        <u-button type="primary" text="新增相册" @click="toDetails()" />
      </view>
    </view>
  </PageHeader>
</template>

<script setup lang="ts">
import useTurn from '@/hooks/useTurn';
import { GetAlbumPage, DelAlbums } from '@/apis/album';

const { pageList, nextPage, refreshPage } = useTurn(
  async (params: TPageParams) => {
    return await GetAlbumPage(params);
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
