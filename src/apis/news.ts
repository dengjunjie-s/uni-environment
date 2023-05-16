import { getMockUrl } from '@/utils/request/baseUrl';
import requredService from '@/utils/request';

/**获取新闻分页 */
export const GetNewsPage = (data: any) =>
  requredService<TPageBase<any>>({
    url: '/base/v1/rolePage',
    data,
    method: 'get',
    baseUrl: getMockUrl()
  });
