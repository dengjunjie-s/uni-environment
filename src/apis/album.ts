import requredService from '@/utils/request';
import { Talbum } from '@/types/album';

/**获取相册分页 */
export const GetAlbumPage = (data: any) =>
  requredService<TPageBase<Talbum>>({
    url: '/keep/staff/personal/image',
    data,
    loadingMsg: '加载中',
    method: 'get'
  });

/** 相册新增 */
export const SaveAlbum = (data: Talbum) =>
  requredService({
    url: '/keep/staff/personal/image',
    data,
    loadingMsg: data.id ? '修改中' : '新增中',
    successMsg: data.id ? '修改成功' : '新增成功',
    method: 'post'
  });

/** 相册删除 */
export const DelAlbums = (ids: any[]) =>
  requredService({
    url: '/keep/staff/personal/image',
    data: { ids },
    method: 'delete'
  });
