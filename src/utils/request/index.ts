import { getBaseUrl } from './baseUrl';
interface TRequredOption {
  baseUrl?: string;
  url: string;
  data: any;
  method?: any;
  isLoading?: boolean;
}
interface TBackData<T> {
  data: T;
  code: number;
  msg: string;
}

const requredService = async <TBackType>(option: TRequredOption) => {
  option.isLoading && uni.showLoading({ title: '加载中' });
  try {
    const res = await uni.request({
      url: (option.baseUrl || getBaseUrl()) + option.url,
      method: option.method,
      data: option.data
    });
    option.isLoading && uni.hideLoading();
    const { code, data, msg } = res.data as TBackData<TBackType>;
    if (code === 200) {
      return Promise.resolve(data);
    } else {
      uni.showToast({
        title: 'code:' + msg,
        icon: 'none'
      });
      return Promise.resolve(data);
    }
  } catch (err) {
    console.log(err);
    uni.showToast({
      title: '网络请求失败:' + err.errMsg,
      icon: 'none'
    });
    option.isLoading && uni.hideLoading();
    return Promise.reject('请求失败' + err.errMsg);
  }
};
export default requredService;
