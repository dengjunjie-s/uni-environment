import { defineConfig } from 'vite';

import AutoImport from 'unplugin-auto-import/vite';
import uni from '@dcloudio/vite-plugin-uni';

export default defineConfig({
  plugins: [
    uni(),
    AutoImport({
      imports: ['vue'],
      dts: './src/types/global/auto-imports.d.ts'
    })
  ]
});
