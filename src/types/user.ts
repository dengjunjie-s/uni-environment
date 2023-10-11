export interface TuserInfo {
  /**
   * 权限
   */
  authority?: string;
  avatar?: string;
  /**
   * 胸围
   */
  bust?: number;
  /**
   * 地区
   */
  district?: string;
  /**
   * 就职单位
   */
  employed?: string;
  /**
   * 性别
   */
  gender?: number;
  /**
   * 毕业学校
   */
  graduateSchool?: string;
  /**
   * 身高
   */
  height?: number;
  /**
   * 臀围
   */
  hip?: number;
  id?: number;
  /**
   * 职业信息
   */
  jobs?: string;
  /**
   * 昵称
   */
  name?: string;
  /**
   * 学校
   */
  school?: string;
  /**
   * 个人标签   前端拼列表
   */
  tags?: string;
  /**
   * 腰围
   */
  waistline?: number;
  /**
   * 体重
   */
  weight?: number;
}

export interface CourseResp {
  Id?: number;
  Name?: string;
  Remark?: string;
}

/**用户反馈字段 */

export interface Tfeetback {
  id?: number;
  staffId?: number;
  text?: string;
  phoneOrMail?: string;
  imgStr?: string;
}
