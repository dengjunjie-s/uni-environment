import { GetStorageTiming, SetStorageTiming } from './localStorageTiming';

/**保存token到Storage*/
export const SetToken = (token: string) => SetStorageTiming('token', token);
/**获取token */
export const GetToken = () => GetStorageTiming<string>('token');
