<template>
  <PageHeader title="个人标签">
    <view class="tagBox">
      <view class="tagBox-item" v-for="item in defaultList" :key="item">
        <u-tag
          :text="item"
          :plain="!chocieList.includes(item)"
          type="primary"
          :name="item"
          plainFill
          @click="tagClick(item)"
        />
      </view>
      <view class="tagBox-item">
        <u-tag
          text="添加自定义标签"
          type="primary"
          @click="openPopup"
          icon="plus"
          :plain="false"
        />
      </view>
    </view>
    <view class="but">
      <u-button type="primary" text="保存" @click="sub" />
    </view>
    <PopupVertical :show="popupShow" height="100rvh">
      <u-input
        placeholder="请输入新增标签名称"
        v-model="addTagName"
        clearable
      />
      <view class="but">
        <u-button type="primary" text="确认新增" @click="addTag" />
      </view>
    </PopupVertical>
  </PageHeader>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue';
import useUserStore from '@/stores/userStore';
import { EditUserInfo } from '@/apis/user';
import PopupVertical from '@/components/PopupVertical.vue';
const userStore = useUserStore();
onMounted(() => {
  try {
    const list = JSON.parse(userStore.userInfo.tags + '');
    list.forEach((item: string) => {
      defaultList.value.includes(item) || defaultList.value.splice(0, 0, item);
    });
  } catch (err) {
    err;
  }
});

const chocieList = ref<string[]>([]);

const tagClick = (name: any) => {
  const index = chocieList.value.findIndex((item) => item === name);
  index === -1
    ? chocieList.value.push(name)
    : chocieList.value.splice(index, 1);
};

const sub = async () => {
  uni.showLoading({ title: '保存中' });
  try {
    await EditUserInfo({
      ...userStore.userInfo,
      tags: JSON.stringify(chocieList.value)
    });
    await userStore.getUserInfo();
    uni.navigateBack();
  } catch (err) {
    console.log(err);
  }
  uni.hideLoading();
};

const popupShow = ref(false);
const addTagName = ref('');
const openPopup = () => {
  addTagName.value = '';
  popupShow.value = true;
};
const addTag = () => {
  if (addTagName.value) {
    defaultList.value.splice(0, 0, addTagName.value);
    chocieList.value.push(addTagName.value);
    popupShow.value = false;
  } else {
    uni.showToast({ title: '请输入标签' });
  }
};

const defaultList = ref([
  '网球',
  '团操',
  '游泳',
  '颜值高',
  '体育学院',
  '篮球',
  '减脂',
  '十年经验',
  '塑形',
  'HIIT',
  '营养师',
  '大维度',
  '五年经验',
  '足球',
  '工作室',
  '无器械',
  '三年经验',
  '产后恢复'
]);
</script>

<style scoped lang="scss">
.tagBox {
  display: flex;
  flex-wrap: wrap;
  padding: 30rpx;
  padding-bottom: 0;
  &-item {
    margin: 20rpx 10rpx;
  }
}

.but {
  padding: 30rpx;
}
</style>
