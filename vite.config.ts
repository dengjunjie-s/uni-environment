import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

export default defineConfig({
  // transpileDependencies: ["uview-plus"],
  plugins: [uni()]
});
