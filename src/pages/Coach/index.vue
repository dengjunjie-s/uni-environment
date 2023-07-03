<template>
  <view class="transition">
    <Me v-if="tabbarValue === '我的'" />
    <Student v-if="tabbarValue === '学员'" />
  </view>
  <u-tabbar v-model:value="tabbarValue" fixed placeholder safeAreaInsetBottom>
    <u-tabbar-item
      v-for="item in tabbarList"
      :key="item.name"
      :text="item.name"
      :name="item.name"
      :icon="item.icon"
      @click="tabbarClick"
    />
  </u-tabbar>
</template>

<script setup lang="ts">
import Me from './Me/index.vue';
import Student from './Student/index.vue';
const tabbarValue = ref('我的');
const tabbarClick = (name: string) => {
  console.log(name);
  tabbarValue.value = name;
};
const tabbarList = [
  { name: '首页', icon: 'home' },
  { name: '放映厅', icon: 'photo' },
  { name: '学员', icon: 'play-right' },
  { name: '我的', icon: 'account' }
];
</script>

<style scoped>
.transition {
  height: 100%;
}
</style>
