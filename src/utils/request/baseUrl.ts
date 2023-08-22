//NODE_ENV === production为生产环境   development为开发环境
/**基础baseurl */
export const getBaseUrl = () => {
  return process.env.NODE_ENV === 'production'
    ? 'http://43.139.159.21:19001'
    : 'http://43.139.159.21:19001';
  // 'https://mock.apifox.cn/m1/994704-0-default';
};
