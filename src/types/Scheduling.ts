/**
 * 排课基础字段
 */
export interface TScheduling {
  /**
   * 排课时间，日期 Date对线字符串
   */
  date?: string | Date;
  id?: string;
  /**
   * 课程备注
   */
  remark?: string;
  /**
   * 关联id字段
   */
  staffId?: number;
  /**
   * 课程状态，1已排课，2，已上课，3，未上课
   */
  state?: number;
  /**
   * 排课学生的id，前端拼
   */
  studentIds?: string;
  dateValue?: number;
  courseId?: number;
  dayjs?: any;
}
