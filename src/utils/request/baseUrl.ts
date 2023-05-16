//NODE_ENV === production为生产环境   development为开发环境
/**基础baseurl */
export const getBaseUrl = () => {
  return process.env.NODE_ENV === 'production'
    ? 'https://school.linkease.net.cn'
    : 'http://cyt.linkease.net.cn:8888';
};

/**基础baseurl */
export const getMockUrl = () => {
  return process.env.NODE_ENV === 'production'
    ? ''
    : 'http://127.0.0.1:4523/m1/2688839-0-default';
};
