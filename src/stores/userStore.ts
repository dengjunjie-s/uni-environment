import { defineStore } from 'pinia';
import { WxLoginService } from '@/apis/user';
import { SetToken } from '@/utils/localStorage';

export const useUserStore = defineStore('userStore', {
  state: () => {
    const userInfo: {
      name?: string;
      avatar?: string;
    } = {
      avatar: 'https://cn.bing.com/rp/tfpoqzYv42r7UjQvzw0PVIoT2nY.png',
      name: '123123'
    };
    return { userInfo, isSignIn: false };
  },
  actions: {
    /**微信登录 phoneCode*/
    wxlogin: async function (phoneCode: string) {
      uni.showLoading({ title: '登录中' });
      try {
        const loginInfo = await uni.login({
          provider: 'weixin'
        });
        const { accessToken } = await WxLoginService({
          loginCode: loginInfo.code,
          phoneCode,
          nickName: '微信用户',
          avatar: ''
        });
        SetToken(accessToken);
      } catch (err) {
        console.log(err);
      }
      uni.hideLoading();
    }
  }
});
