import requredService from '@/utils/request';
import { TScheduling } from '@/types/Scheduling';

/**获取课程种类分页 */
export const GetSchedulingPage = (data: any) =>
  requredService<TPageBase<TScheduling>>({
    url: '/keep/coach/scheduling/page',
    loadingMsg: '加载中',
    data: data,
    method: 'get'
  });

/** 课程种类新增 */
export const SaveScheduling = (data: TScheduling) =>
  requredService({
    url: '/keep/coach/scheduling',
    data,
    loadingMsg: data.id ? '修改中' : '新增中',
    successMsg: data.id ? '修改成功' : '新增成功',
    method: 'post'
  });

/** 课程种类删除 */
export const DelScheduling = (ids: any[]) =>
  requredService({
    url: '/keep/coach/scheduling',
    data: { ids },
    method: 'delete'
  });
