export interface paramsType {
  pageNumber: number;
  pageSize: number;
}

import { reactive, ref } from 'vue';

//分页hooks
export default function useTurn<T>(
  pageData: any,
  definePageSize: number,
  definePageNumber: number
) {
  const params = reactive({
    //分页数据，用于请求
    pageNumber: definePageNumber,
    pageSize: definePageSize
  });
  const pageList = ref<T[]>([]);
  const totalPages = ref(0);
  const loading = ref(true);

  //获取分页数据
  async function loadData() {
    loading.value = true;
    try {
      const res = await pageData(params);
      const { content, pageable } = res;
      content && (pageList.value = [...pageList.value, ...content]);
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
    params.pageNumber = definePageNumber;
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
