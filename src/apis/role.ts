import requredService from '@/utils/request';
import { TRoleBase } from '@/types/role';

/**获取相册分页 */
export const GetRolePage = (data: any) =>
  requredService<TPageBase<TRoleBase>>({
    url: '/keep/coach/role/page',
    data,
    loadingMsg: '加载中',
    method: 'get'
  });

/** 相册新增 */
export const GetRole = (data: { id: any }) =>
  requredService<TRoleBase>({
    url: '/keep/coach/role',
    data,
    loadingMsg: '查询中',
    method: 'post'
  });

/** 相册新增 */
export const SaveRole = (data: TRoleBase) =>
  requredService({
    url: '/keep/coach/role',
    data,
    loadingMsg: data.id ? '修改中' : '新增中',
    successMsg: data.id ? '修改成功' : '新增成功',
    method: 'post'
  });

/** 相册删除 */
export const DelRole = (ids: any[]) =>
  requredService({
    url: '/keep/coach/role',
    data: { ids },
    method: 'delete'
  });
