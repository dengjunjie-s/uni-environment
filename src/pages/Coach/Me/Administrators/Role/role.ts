export interface TroleTree {
  name?: string;
  code?: string;
  child?: TroleTree[];
}
export const roleTree: TroleTree[] = [
  {
    name: '管理员设置',
    child: [
      {
        name: '角色管理',
        code: 'roleConfig'
      },
      {
        name: '账号角色关联管理',
        code: 'accountConfig'
      }
    ]
  }
];
