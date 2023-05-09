<template>
  <view class="container">
    <view class="tianjnglog">
      <image
        class="image"
        src="http://hr-middleground.oss-cn-shenzhen.aliyuncs.com/20230424133911-6d5d780385d66ab48fba5a7a9ee90db8.png"
        mode="widthFix"
      />
      <view class="titiell"> 广东省天津大学校友会 </view>
    </view>
    <view class="uButton">
      <u-button @click="wxLogin" type="success" :ripple="true" shape="circle">
        <u-icon name="weixin-fill" size="40"></u-icon>
        &nbsp;微信授权登录
      </u-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { loginService } from '@/apis/user';

const wxLogin = async () => {
  uni.showLoading({ title: '登录中' });
  try {
    const loginInfo = await uni.login({
      provider: 'weixin'
    });
    const wxUserInfo = await uni.getUserProfile({
      provider: 'weixin',
      desc: '用于获取用户信息'
    });
    await loginService({
      avatar: wxUserInfo.userInfo.avatarUrl,
      nickname: wxUserInfo.userInfo.nickName,
      code: loginInfo.code
    });
  } catch (err) {}
  uni.hideLoading();
};
</script>

<style>
.container {
  margin: 40rpx;
  padding: 50rpx;
  font-size: 40rpx;
  line-height: 48rpx;
}
.tianjnglog {
  /* position:relative;
		*/
  text-align: center;
  width: auto;
  height: 460rpx;
  flex: auto;
}
.titiell {
  /* position:absolute;
		*/
  flex: content;
  font-size: 48rpx;
  font-weight: 4rpx;
}
.image {
  height: 240rpx;
  width: 240rpx;
  margin: 80rpx 0 20rpx 0;
}

.uButton {
  font-size: 50rpx;
}
</style>
