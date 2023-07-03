import requredService from '@/utils/request';
import { TStudent } from '@/types/Student';

/**获取课程种类分页 */
export const GetStudentList = (data: any) =>
  requredService<TStudent[]>({
    url: '/keep/coach/trainee',
    loadingMsg: '加载中',
    data: data,
    method: 'get'
  });

/** 课程种类新增 */
export const SaveStudent = (data: TStudent) =>
  requredService({
    url: '/keep/coach/trainee',
    data,
    loadingMsg: data.id ? '修改中' : '新增中',
    successMsg: data.id ? '修改成功' : '新增成功',
    method: 'post'
  });

/** 课程种类删除 */
export const DelStudent = (ids: any[]) =>
  requredService({
    url: '/keep/coach/trainee',
    data: { ids },
    method: 'delete'
  });
