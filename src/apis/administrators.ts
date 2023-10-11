import requredService from '@/utils/request';
import { TRoleBase } from '@/types/administrators';

/**获取角色分页 */
export const GetRolePage = (data: any) =>
  requredService<TPageBase<TRoleBase>>({
    url: '/keep/staff/role/page',
    data,
    loadingMsg: '加载中',
    method: 'get'
  });

/** 角色新增 */
export const GetRole = (data: { id: any }) =>
  requredService<TRoleBase>({
    url: '/keep/staff/role',
    data,
    loadingMsg: '查询中',
    method: 'post'
  });

/** 角色新增 */
export const SaveRole = (data: TRoleBase) =>
  requredService({
    url: '/keep/staff/role',
    data,
    loadingMsg: data.id ? '修改中' : '新增中',
    successMsg: data.id ? '修改成功' : '新增成功',
    method: 'post'
  });

/** 角色删除 */
export const DelRole = (ids: any[]) =>
  requredService({
    url: '/keep/staff/role/',
    data: { ids },
    method: 'delete'
  });

/**获取账号分页 */
export const GetAccountPage = (data: any) =>
  requredService<
    TPageBase<{
      id: number;
      roleId: number;
      userName: string;
    }>
  >({
    url: '/keep/staff/user/account/page',
    data,
    loadingMsg: '加载中',
    method: 'get'
  });
