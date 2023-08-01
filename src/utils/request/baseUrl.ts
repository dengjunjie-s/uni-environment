//NODE_ENV === production为生产环境   development为开发环境
/**基础baseurl */
export const getBaseUrl = () => {
  return process.env.NODE_ENV === 'production'
    ? 'https://mock.apifox.cn/m1/994704-0-default'
    : // : 'http://192.168.0.123:8080';
      'https://mock.apifox.cn/m1/994704-0-default';
};
