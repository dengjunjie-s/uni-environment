import { getBaseUrl } from './baseUrl';
import { GetToken } from '../localStorage';
interface TRequredOption {
  /**请求的baseUrl,不传用默认 */
  baseUrl?: string;
  /**请求的路径， */
  url: string;
  /**请求的数据 */
  data: any;
  /**请求的类型 */
  method?: any;
  /**请求是否不传token，默认false */
  noToken?: boolean;
  /**请求头 */
  header?: any;
  /**请求成功后弹出提示，没有泽不弹 */
  successMessage?: string;
  /**请求是是否showLoading，请求结束自动关闭 */
  isLoading?: boolean;
}
interface TBackData<T> {
  data: T;
  code: number;
  msg: string;
}

const requredService = async <TBackType>(option: TRequredOption) => {
  option.isLoading && uni.showLoading({ title: '加载中' });
  const header: any = option.header ? option.header : {};
  option.noToken || (header['Authorization'] = `Bearer ${GetToken()}`);
  try {
    const res = await uni.request({
      url: (option.baseUrl || getBaseUrl()) + option.url,
      method: option.method,
      header: header,
      data: option.data
    });
    option.isLoading && uni.hideLoading();
    if (res.statusCode === 200) {
      const { code, data, msg } = res.data as TBackData<TBackType>;
      if (code === 200) {
        return Promise.resolve(data);
      } else {
        uni.showToast({
          title: code + ':' + msg,
          icon: 'none'
        });
        return Promise.reject(data);
      }
    }
    uni.showToast({
      title: res.statusCode + ':请检查网络设置',
      icon: 'none'
    });
    return Promise.reject(res.statusCode + ':请求失败');
  } catch (err) {
    console.log(err);
    option.isLoading && uni.hideLoading();
    uni.showToast({
      title: '网络请求失败:' + err.errMsg,
      icon: 'none'
    });
    return Promise.reject('请求失败' + err.errMsg);
  }
};
export default requredService;
