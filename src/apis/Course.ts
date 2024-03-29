import requredService from '@/utils/request';
import { TcourseType } from '@/types/Course';

/**获取课程种类分页 */
export const GetCourseTypePage = (data: any) =>
  requredService<TPageBase<TcourseType>>({
    url: '/keep/coach/course/page',
    data,
    loadingMsg: '加载中',
    method: 'get'
  });

/** 课程种类新增 */
export const SaveCourseType = (data: TcourseType) =>
  requredService({
    url: '/keep/coach/course',
    data,
    loadingMsg: data.id ? '修改中' : '新增中',
    successMsg: data.id ? '修改成功' : '新增成功',
    method: 'post'
  });

/** 课程种类删除 */
export const DelCourseTypes = (ids: any[]) =>
  requredService({
    url: '/keep/coach/course',
    data: { ids },
    method: 'delete'
  });
