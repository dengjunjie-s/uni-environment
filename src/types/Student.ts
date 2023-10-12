export interface TStudent {
  /**
   * 头像
   */
  avatar?: string;
  endDate?: string;
  /**
   * 性别
   */
  gender?: number;
  /**
   * 身高
   */
  height?: number;
  id?: number;
  /**
   * 记录
   */
  record?: string;
  /**
   * 关联id
   */
  staffId?: number;
  /**
   * 开始日期
   */
  startDate?: string;
  /**
   * 学员名称
   */
  studentName?: string;
  /**
   * 学员编号码
   */
  studentPhone?: string;
  /**
   * 体重
   */
  weight?: number;
}

export interface TStudentDom {
  /**
   * 前端转字符串，后端只需要存字符串
   */
  videoPath?: string;
  id?: number;
  /**
   * 相册名称
   */
  date?: string;
  imgList?: string[];
  /**
   * 关联userid
   */
  staffId?: number;
}
