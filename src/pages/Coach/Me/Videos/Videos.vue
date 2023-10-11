<template>
  <PageHeader title="谈单夹列表">
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
              v-for="(img, index) in getImgList(item.videoPath)"
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
import { setform } from '@/utils/uniStorage';
import { GetVideosPage } from '@/apis/Videos';
import useUserStore from '@/stores/userStore';
const userStore = useUserStore();

const searchValue = ref('');
const { pageList, nextPage, refreshPage } = useTurn(
  async (params: TPageParams) => {
    return await GetVideosPage({ ...params, staffId: userStore.userId });
  }
);

const getImgList = (str?: string) => {
  try {
    const obj = JSON.parse(str + '');
    return Array.isArray(obj.imgList) ? obj.imgList : [];
  } catch (err) {
    return [];
  }
};

const toDetails = (item?: any) => {
  setform(1, JSON.stringify(item));
  uni.navigateTo({
    url: '/pages/Coach/Me/Videos/VideoDetails'
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
