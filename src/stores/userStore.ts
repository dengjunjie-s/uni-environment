import { defineStore } from 'pinia';
import { loginService } from '@/apis/user';

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
    wxlogin: async function (phoneCode: string) {
      uni.showLoading({ title: '登录中' });
      try {
        const wxUserInfo = await uni.getUserProfile({
          provider: 'weixin',
          desc: '用于获取用户信息'
        });
        const loginInfo = await uni.login({
          provider: 'weixin'
        });
        await loginService({
          loginCode: loginInfo.code,
          phoneCode,
          nickName: wxUserInfo.userInfo.nickName,
          avatarUrl: wxUserInfo.userInfo.avatarUrl
        });
      } catch (err) {
        console.log(err);
      }
      uni.hideLoading();
    }
  }
});
