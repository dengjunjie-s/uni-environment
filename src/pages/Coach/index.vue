<template>
  <view class="transition">
    <Me v-if="tabbarValue === '我的'" />
    <Student v-if="tabbarValue === '学员'" />
    <Scheduling v-if="tabbarValue === '排课'" />
    <Home v-if="tabbarValue === '任务'" />
  </view>
  <view class="tabbar">
    <view class="tabbar-cantainer">
      <view
        class="tabbar-cantainer-item"
        v-for="item in tabbarList"
        :key="item.name"
        @click="tabbarClick(item.name)"
      >
        <view>
          <u-icon
            :name="item.icon"
            :color="item.name === tabbarValue ? '#3c9cff' : ''"
            size="28"
          />
        </view>
        <view :style="{ color: item.name === tabbarValue ? '#3c9cff' : '' }">
          {{ item.name }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Me from './Me/index.vue';
import Student from './Student/index.vue';
import Scheduling from './Scheduling/index.vue';
import Home from './Home/index.vue';
const tabbarValue = ref('任务');
const tabbarClick = (name: string) => {
  tabbarValue.value = name;
};
const tabbarList = [
  { name: '任务', icon: 'file-text' },
  { name: '排课', icon: 'list-dot' },
  { name: '学员', icon: 'play-right' },
  { name: '我的', icon: 'account' }
];
</script>

<style scoped lang="scss">
.transition {
  height: calc(100vh - 150rpx);
}
.tabbar {
  height: 150rpx;
  background: $my-bg;
  &-cantainer {
    border-top: 1px solid $u-main-color;
    color: #fff;
    display: flex;
    justify-content: space-around;
    &-item {
      height: 140rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
