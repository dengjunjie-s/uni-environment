import { reactive, ref } from 'vue';

//分页hooks
export default function useTurn<TItemInfo>(
  pageData: (params: TPageParams) => Promise<TPageBase<TItemInfo>>
) {
  const params = reactive({
    //分页数据，用于请求
    pageNumber: 1,
    pageSize: 10
  });
  const pageList = ref<TItemInfo[]>([]) as Ref<TItemInfo[]>;
  const totalPages = ref(0);
  const loading = ref(true);
  //获取分页数据
  async function loadData() {
    loading.value = true;
    try {
      const { content, pageable } = await pageData(params);
      content && (pageList.value = content);
      pageable && (totalPages.value = pageable.totalPages);
    } catch (err) {
      console.log(err);
    }
    loading.value = false;
  }

  const nextPage = () => {
    if (params.pageNumber >= totalPages.value)
      return uni.showToast({
        title: '已到最底部',
        icon: 'none'
      });
    params.pageNumber++;
    loadData();
  };

  const refreshPage = () => {
    totalPages.value = 0;
    params.pageNumber = 1;
    pageList.value = [];
    loadData();
  };
  loadData();
  return {
    /**下一页方法 */
    nextPage,
    /**是否加载中 */
    loading,
    /**刷新页数，从1开始 */
    refreshPage,
    /**数据列表 */
    pageList
  };
}
