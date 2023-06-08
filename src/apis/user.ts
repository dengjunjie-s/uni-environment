import requredService from '@/utils/request';

/**微信登录接口,返回token */
export const LoginService = (data: any) =>
  requredService<{ access_token: string }>({
    url: '/keep/user/login',
    data,
    method: 'POST',
    noToken: true,
    successMsg: '登录成功',
    loadingMsg: '登录中'
  });
