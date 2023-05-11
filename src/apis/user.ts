import requredService from '@/utils/request';

/**微信登录接口,返回token */
export const WxLoginService = (data: any) =>
  requredService<{ accessToken: string }>({
    url: '/base/v1/user/weChatAppletLogin',
    data,
    method: 'POST',
    noToken: true,
    successMessage: '登录成功'
  });
