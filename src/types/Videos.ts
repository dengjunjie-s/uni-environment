export interface Tvideos {
  /**
   * 前端转字符串，后端只需要存字符串
   */
  videoPath?: string;
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
