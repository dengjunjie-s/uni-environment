import { defineStore } from 'pinia';
import { LoginService, GetUserInfo, GetUserRoleByToken } from '@/apis/user';
import { TuserInfo } from '@/types/user';
import { SetToken } from '@/utils/localStorage';

export default defineStore('userStore', {
  state: () => {
    const userInfo: TuserInfo = {};
    const userId = 0;
    const roleList: string[] = [];
    const roleCode = '';
    return { userInfo, userId, refreshState: 1, roleList, roleCode };
  },
  actions: {
    /**微信登录*/
    async wxlogin(form: any) {
      uni.showLoading({ title: '登录中' });
      try {
        const { access_token, userId } = await LoginService(form);
        SetToken(access_token);
        this.userId = userId;
        await this.getUserInfo();
        this.getUserRole();
        uni.hideLoading();
        return Promise.resolve();
      } catch (err) {
        uni.hideLoading();
        return Promise.reject(err);
      }
    },
    /**获取用户权限*/
    async getUserRole() {
      try {
        const res = await GetUserRoleByToken();
        this.roleCode = res.roleCode + '';
        try {
          const list = JSON.parse(res.roleJson + '');
          Array.isArray(list) && (this.roleList = list);
        } catch (err) {}
      } catch (err) {
        //
        console.log(err);
      }
    },
    checkRole(codes: string[]) {
      if (this.roleCode === 'superAdmin') return true;
      return codes.some((item) => this.roleList.includes(item));
    },
    async getUserInfo() {
      try {
        const info = await GetUserInfo(this.userId);
        Object.assign(this.userInfo, info);
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    },
    loadOut() {
      SetToken('');
      uni.redirectTo({ url: '/pages/Login' });
    }
  }
});
