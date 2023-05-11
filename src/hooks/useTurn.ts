export interface paramsType {
  pageNumber: number;
  pageSize: number;
}

import { reactive, ref } from 'vue';

//分页hooks
export default function useTurn<TItemInfo>(pageData: any) {
  const params = reactive({
    //分页数据，用于请求
    pageNumber: 1,
    pageSize: 10
  });
  const pageList = ref<TItemInfo[]>([]);
  const totalPages = ref(0);
  const loading = ref(true);

  //获取分页数据
  async function loadData() {
    loading.value = true;
    try {
      const { content, pageable }: TPageBase<any> = await pageData(params);
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
    loadData, //刷新数据
    nextPage,
    loading,
    refreshPage,
    pageList //列表数据
  };
}
