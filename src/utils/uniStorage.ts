export const setform = (key: number, dataStr: string) =>
  uni.setStorageSync('form-' + key, dataStr);

export const getform = (key: number) => uni.getStorageSync('form-' + key);
