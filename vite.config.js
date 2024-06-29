import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), legacy({
    targets: ['ie >= 11'], // 指定需要兼容的浏览器版本  
    additionalLegacyPolyfills: ['regenerator-runtime/runtime'], // 额外的 polyfills  
    // 如果需要自定义 Babel 配置，可以通过 `renderLegacyChunks` 选项  
    // 但通常推荐在 babel.config.js 中配置  
  })]
})
