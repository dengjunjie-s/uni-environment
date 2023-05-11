/**
 * @param key localStorage的key
 * @param value //localStorage的value
 * @param millisecond // 保存的时间,超出时间无法返回，单位秒,传0则无限制
 */
export const SetStorageTiming = (
  key: string,
  value: any,
  millisecond?: number
) => {
  if (value) {
    const overtime = millisecond
      ? new Date().getTime() + millisecond * 1000
      : undefined;
    uni.setStorageSync(key, {
      value,
      overtime
    });
  } else {
    uni.removeStorageSync(key);
  }
};

//获取localStorage
export const GetStorageTiming = <T>(key: string) => {
  try {
    const storeData = uni.getStorageSync(key);
    if (storeData) {
      const nowTime = new Date().getTime();
      if (storeData.overtime) {
        return storeData.overtime > nowTime
          ? (storeData.value as T)
          : undefined;
      } else {
        return storeData.value as T;
      }
    }
  } catch (err) {
    return undefined;
  }
};
