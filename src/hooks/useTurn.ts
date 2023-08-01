//分页hooks
export default function useTurn<TItemInfo>(
  pageData: (params: TPageParams) => Promise<TPageBase<TItemInfo>>
) {
  const params = reactive({
    //分页数据，用于请求
    page: 0,
    size: 10
  });
  const pageList = ref<TItemInfo[]>([]) as Ref<TItemInfo[]>;
  const totalPages = ref(0);
  const loading = ref(true);
  //获取分页数据
  async function loadData() {
    loading.value = true;
    try {
      const res = await pageData(params);
      res?.content && (pageList.value = [...pageList.value, ...res.content]);
      res?.pageable && (totalPages.value = res.pageable.totalPages);
    } catch (err) {
      console.log(err);
    }
    loading.value = false;
  }

  const nextPage = () => {
    if (params.page >= totalPages.value)
      return uni.showToast({
        title: '已到最底部',
        icon: 'none'
      });
    params.page++;
    loadData();
  };
  const isLast = computed(() => params.page >= totalPages.value);

  const refreshPage = () => {
    totalPages.value = 0;
    params.page = 1;
    pageList.value = [];
    loadData();
  };
  return {
    /**下一页方法 */
    nextPage,
    /**是否加载中 */
    loading,
    /**刷新页数，从1开始 */
    refreshPage,
    /**数据列表 */
    pageList,
    /**是否最后一页 */
    isLast
  };
}
