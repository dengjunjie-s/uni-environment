<template>
  <PageHeader :title="studentName + '的档案列表'">
    <view class="cnateiner">
      <scroll-view scroll-y style="height: calc(100vh - 160rpx)">
        <view class="add">
          <u-button type="primary" text="新增档案" @click="toDetails()" />
        </view>
        <view
          class="item"
          v-for="item in pageList"
          :key="item.id"
          @click="toDetails(item)"
        >
          <view class="item-title">
            {{
              item.date
                ? Dayjs(new Date(item.date)).format('YYYY-MM-DD HH:mm')
                : ''
            }}
          </view>
          <view class="item-image">
            <view v-for="(img, index) in item.imgList" :key="img" class="image">
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
import { TStudentDom, TStudent } from '@/types/Student';
import useUserStore from '@/stores/userStore';
import Dayjs from 'dayjs';
import { getform, setform } from '@/utils/uniStorage';
const userStore = useUserStore();

const pageList = ref<TStudentDom[]>([]);

const toDetails = (item?: any) => {
  setform(2, JSON.stringify(item));
  uni.navigateTo({
    url: '/pages/Coach/Student/StudentDom/StudentDomDetails?data='
  });
};

const studentName = ref<string>();
onShow(() => {
  try {
    const form: TStudent = JSON.parse(getform(1));
    studentName.value = form.studentName;
    const list = JSON.parse(form.record + '');
    if (Array.isArray(list)) pageList.value = list as any[];
  } catch (err) {}
});
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
.add {
  padding: 10px;
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
