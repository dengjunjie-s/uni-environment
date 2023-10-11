export interface TResume {
  /**
   * 前端转字符串，后端只需要存字符串
   */
  imgStr?: string;
  id?: number;
  /**
   * 相册名称
   */
  title?: string;
  remark?: string;
  /**
   * 关联userid
   */
  staffId?: number;
}
