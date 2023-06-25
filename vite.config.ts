import { defineConfig } from 'vite';
import * as uniDcloudio from '@dcloudio/uni-app';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import uni from '@dcloudio/vite-plugin-uni';

/** 自动引入@dcloudio/uni-app包内的函数 */
const UniDcloudioResolvers = () => {
  const keyList: string[] = [];
  for (const key in uniDcloudio) {
    if (key !== 'default') keyList.push(key);
  }
  return (name) => {
    if (keyList.includes(name)) return { name, from: '@dcloudio/uni-app' };
  };
};

export default defineConfig({
  plugins: [
    uni(),
    AutoImport({
      imports: ['vue'],
      dts: './src/types/global/auto-imports.d.ts',
      resolvers: [UniDcloudioResolvers()],
      eslintrc: {
        enabled: true
      }
    })
    // Components({
    //   dirs: ['src/components', 'node_modules/uview-plus/components'],
    //   extensions: ['vue'],
    //   dts: './src/types/global/components.d.ts',
    //   resolvers: []
    // })
  ]
});
