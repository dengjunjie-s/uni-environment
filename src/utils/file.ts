export const imgToBese64 = (path: string) => {
  return new Promise((reslove, reject) => {
    uni.getFileSystemManager().readFile({
      filePath: path,
      encoding: 'base64',
      success: (res) => {
        reslove('data:image/jpeg;base64,' + res.data);
      },
      fail: (e) => {
        console.log('图片转换失败');
      }
    });
  });
};
