<!-- 图标组件 -->
<template>
  <u-upload
    :fileList="copyFileList"
    :accept="accept"
    :maxCount="mex"
    :multiple="multiple"
    @afterRead="afterRead"
    @delete="deleteItem"
  />
</template>

<script setup lang="ts">
import { imgToBese64 } from '@/utils/file';
import uniqueid from 'lodash.uniqueid';
const props = withDefaults(
  defineProps<{
    fileList: string[];
    size?: number;
    accept?: 'all' | 'media' | 'image' | 'file' | 'video';
    capture?: ('album' | 'camera')[];
    mex?: number;
    multiple?: boolean;
  }>(),
  {
    accept: 'image',
    capture: () => ['album'],
    mex: 1,
    multiple: true
  }
);
const copyFileList = ref<any[]>([]);

watch(
  () => props.fileList,
  () => {
    loadCopyFileList();
  }
);
const loadCopyFileList = () => {
  props.fileList?.forEach((url) => {
    copyFileList.value.some((item) => url === item.url) ||
      copyFileList.value.push({
        url,
        status: 'success',
        message: '',
        uuid: uniqueid()
      });
  });
};
onMounted(() => loadCopyFileList());

const deleteItem = ({ index }: any) => {
  copyFileList.value.splice(index, 1);
  updatFileList();
};

const afterRead = ({ file }: { file: any[] }) => {
  file.forEach((item) => {
    const uuid = uniqueid();
    copyFileList.value.push({
      url: item.url,
      status: 'uploading',
      message: '上传中',
      uuid: uuid
    });
    uploadFilePromise(item.url, uuid);
  });
};

const emit = defineEmits(['update:fileList']);
const uploadFilePromise = async (url: string, uuid: any) => {
  try {
    const res = await imgToBese64(url);
    Object.assign(
      copyFileList.value[
        copyFileList.value.findIndex((item) => uuid === item.uuid)
      ],
      {
        url: res,
        status: 'success',
        message: ''
      }
    );
    updatFileList();
  } catch (err) {
    Object.assign(
      copyFileList.value[
        copyFileList.value.findIndex((item) => uuid === item.uuid)
      ],
      {
        status: 'fail'
      }
    );
  }
};
const updatFileList = () => {
  emit(
    'update:fileList',
    copyFileList.value.reduce((list, item) => {
      item.status === 'success' && list.push(item.url);
      return list;
    }, [])
  );
};
</script>
