<template>
  <u-sticky bgColor="#fff">
    <u-tabs
      :list="[{ name: '学习课程' }, { name: '学习资源' }]"
      itemStyle="height: 44px;padding: 0 20px;"
    />
  </u-sticky>
  <view class="news"> {{ pageList }} </view>
</template>

<script setup lang="ts">
import { GetNewsPage } from '@/apis/news';
import useTurn from '@/hooks/useTurn';
const { nextPage, loading, refreshPage, pageList } = useTurn(
  async (params: TPageParams) => {
    return await GetNewsPage(params);
  }
);
</script>

<style scoped>
.news {
  background: #fff;
  height: 800px;
}
</style>
