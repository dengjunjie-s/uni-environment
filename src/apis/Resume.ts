import requredService from '@/utils/request';
import { TResume } from '@/types/Resume';

/**获取相册分页 */
export const GetResumePage = (data: any) =>
  requredService<TPageBase<TResume>>({
    url: '/keep/coach/resume/page',
    data,
    loadingMsg: '加载中',
    method: 'get'
  });

/** 相册新增 */
export const SaveResume = (data: TResume) =>
  requredService({
    url: '/keep/coach/resume',
    data,
    loadingMsg: data.id ? '修改中' : '新增中',
    successMsg: data.id ? '修改成功' : '新增成功',
    method: 'post'
  });

/** 相册删除 */
export const DelResumes = (ids: any[]) =>
  requredService({
    url: '/keep/coach/resume',
    data: { ids },
    method: 'delete'
  });
