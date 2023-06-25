import requredService from '@/utils/request';
import { TuserInfo, Tfeetback } from '@/types/user';
import { getBaseUrl } from '@/utils/request/baseUrl';

/**微信登录接口,返回token */
export const LoginService = (data: any) =>
  requredService<{ access_token: string; userId: number }>({
    url: '/keep/user/login',
    data,
    method: 'POST',
    noToken: true
  });

/**上传文件 */
export const UploadFileRequre = (url: any) =>
  new Promise((resolve, reject) => {
    uni.uploadFile({
      url: getBaseUrl() + '/keep/coach/file',
      filePath: url,
      name: 'file',
      success(res) {
        const data = JSON.parse(res.data + '');
        resolve(data.data);
      },
      fail(err) {
        reject(err);
      }
    });
  });

/**获取用户信息 */
export const GetUserInfo = (id: any) =>
  requredService<TuserInfo>({
    url: '/keep/staff',
    method: 'get',
    data: { id }
  });

/**修改用户信息 */
export const EditUserInfo = (data: TuserInfo) =>
  requredService({
    url: '/keep/staff/personal',
    method: 'post',
    data: data
  });

export const AddFeetback = (data: Tfeetback) =>
  requredService({
    url: '/韬哥反馈',
    method: 'post',
    data: data
  });
