import { GetCourseTypePage } from '@/apis/Course';
import useUserStore from '@/stores/userStore';
import { TcourseType } from '@/types/Course';

export default () => {
  const userStore = useUserStore();
  const courseTypeList = ref<TcourseType[]>([]);
  const loadTypeList = async () => {
    const res = await GetCourseTypePage({
      staffId: userStore.userId,
      page: 1,
      size: -1
    });
    courseTypeList.value = res.content || [];
  };
  loadTypeList();
  const getCourseTypeValByField = (
    id: number | any,
    field: keyof TcourseType
  ) => {
    if (!id) return '-';
    const findItem = courseTypeList.value.find((item) => item.id === id);
    return findItem ? findItem[field] : '-';
  };
  return { loadTypeList, getCourseTypeValByField };
};
