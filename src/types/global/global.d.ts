export {};

declare global {
  /**环境变量字段 */
  const process: any;
  /**分页基础字段*/
  interface TPageBase<TContent> {
    content?: TContent[];
    pageable: {
      /**
       * 当前的页数
       */
      pageNumber: number;
      /**
       * 每页的数量
       */
      pageSize: number;
      /**
       * 数据总数量
       */
      totalItems: number;
      /**
       * 总页数
       */
      totalPages: number;
    };
  }
  /**
   * 分页请求字段
   * @pageNumber 请求的页数
   * @pageSize 请求的数量
   */
  interface TPageParams {
    /**请求的页数*/
    pageNumber: number;
    /**请求的数量*/
    pageSize: number;
  }
}
