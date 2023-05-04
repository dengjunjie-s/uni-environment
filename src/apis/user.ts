import requredService from '@/utils/request';

export const loginService = (data: any) =>
  requredService({
    url: '/app/auth/weixin',
    data,
    method: 'POST'
  });
