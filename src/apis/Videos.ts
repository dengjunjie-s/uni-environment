import requredService from '@/utils/request';
import { Tvideos } from '@/types/Videos';

/**获取相册分页 */
export const GetVideosPage = (data: any) =>
  requredService<TPageBase<Tvideos>>({
    url: '/keep/staff/negotiate/orders/page',
    data,
    loadingMsg: '加载中',
    method: 'get'
  });

/** 相册新增 */
export const SaveVideos = (data: Tvideos) =>
  requredService({
    url: '/keep/staff/negotiate/orders',
    data,
    loadingMsg: data.id ? '修改中' : '新增中',
    successMsg: data.id ? '修改成功' : '新增成功',
    method: 'post'
  });

/** 相册删除 */
export const DelVideoss = (ids: any[]) =>
  requredService({
    url: '/keep/staff/negotiate/orders',
    data: { ids },
    method: 'delete'
  });
