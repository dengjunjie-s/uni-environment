import requredService from '@/utils/request';
import { TuserInfo, Tfeetback } from '@/types/user';
import { TRoleBase } from '@/types/administrators';
import { getBaseUrl } from '@/utils/request/baseUrl';
import { GetToken } from '@/utils/localStorage';

/**微信登录接口,返回token */
export const LoginService = (data: any) =>
  requredService<{ access_token: string; userId: number }>({
    url: '/keep/user/login',
    data,
    method: 'post',
    noToken: true
  });

/**微信登录接口,返回token */
export const GetUserRoleByToken = () =>
  requredService<TRoleBase>({
    url: '/keep/staff/token',
    method: 'post'
  });

/**上传文件 */
export const UploadFileRequre = (url: any) =>
  new Promise((resolve, reject) => {
    uni.uploadFile({
      url: getBaseUrl() + '/keep/coach/file',
      filePath: url,
      name: 'file',
      header: {
        Authorization: `Bearer ${GetToken()}`
      },
      success(res) {
        const data = JSON.parse(res.data + '');
        resolve(data.data);
      },
      fail(err) {
        reject(err);
      }
    });
  });

export const UploadVideoRequre = (url: any) =>
  new Promise((resolve, reject) => {
    uni.uploadFile({
      url: getBaseUrl() + '/keep/coach/tx/video',
      filePath: url,
      name: 'file',
      header: {
        Authorization: `Bearer ${GetToken()}`
      },
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

export const AddFeetback = (data: any) =>
  requredService({
    url: '/keep/coach/record',
    method: 'post',
    data: data
  });

/**账号绑定角色或者wxCode*/
export const EditAccountRoleOrWxcode = (data: any) =>
  requredService({
    url: '/keep/user/login',
    data,
    method: 'put',
    successMsg: '修改成功'
  });
