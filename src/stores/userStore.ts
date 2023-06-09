import { defineStore } from 'pinia';
import { LoginService, GetUserInfo } from '@/apis/user';
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
    wxlogin: async function (form: any) {
      try {
        const { access_token } = await LoginService(form);
        SetToken(access_token);
        await GetUserInfo();
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }
});
