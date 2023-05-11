// const { NODE_ENV } = process.env;
//NODE_ENV === production为生产环境   development为开发环境

export const getBaseUrl = () => {
  return process.env.NODE_ENV === 'production'
    ? 'https://school.linkease.net.cn'
    : 'http://cyt.linkease.net.cn:8888';
};
