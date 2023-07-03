export interface Talbum {
  /**
   * 前端转字符串，后端只需要存字符串
   */
  albumList?: string;
  id?: number;
  /**
   * 相册名称
   */
  title?: string;
  /**
   * 关联userid
   */
  staffId?: number;
}
