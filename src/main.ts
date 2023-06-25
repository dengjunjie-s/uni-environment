import { createSSRApp } from 'vue';
import uviewPlus from 'uview-plus';
import { createPinia } from 'pinia';
import PageHeader from '@/components/PageHeader.vue';

import App from './App.vue';
export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  app.use(pinia);
  app.use(uviewPlus);
  app.component('PageHeader', PageHeader);
  app.directive('dev', {
    mounted(el) {
      el.onclick = () => {
        uni.showToast({ title: '正在开发...', icon: 'none' });
      };
    }
  });
  return {
    app
  };
}
