import requredService from '@/utils/request';
import { Talbum } from '@/types/album';

/**获取相册分页 */
export const GetAlbumPage = (data: any) =>
  requredService<TPageBase<Talbum>>({
    url: '/韬哥金轮相册',
    data,
    loadingMsg: '加载中',
    method: 'get'
  });

/** 相册新增 */
export const AddAlbum = (data: Talbum) =>
  requredService({
    url: '/韬哥金轮相册',
    data,
    loadingMsg: '新增中',
    successMsg: '新增成功',
    method: 'post'
  });

/** 相册修改 */
export const EditAlbum = (data: Talbum) =>
  requredService({
    url: '/韬哥金轮相册',
    data,
    loadingMsg: '修改中',
    successMsg: '修改成功',
    method: 'put'
  });

/** 相册删除 */
export const DelAlbums = (ids: any[]) =>
  requredService({
    url: '/韬哥金轮相册',
    data: { ids },
    method: 'delete'
  });
