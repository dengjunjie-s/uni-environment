/**
 * 角色字段
 */
export interface TRoleBase {
  /**
   * 判断是否默认角色      SuperAdministrator 超级管理员
   */
  roleCode?: string;
  id?: number;
  /**
   * 角色名
   */
  name?: string;
  /**
   * 长字符串  存json
   */
  roleJson?: string;
}
