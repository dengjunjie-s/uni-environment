//NODE_ENV === production为生产环境   development为开发环境
/**基础baseurl */
export const getBaseUrl = () => {
  return process.env.NODE_ENV === 'production'
    ? 'http://192.168.31.230:8080'
    : 'http://192.168.31.230:8080';
  // 'http://127.0.0.1:4523/m1/994704-0-default';
};
