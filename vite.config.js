import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

function pathResolve(dir) {
  return resolve(__dirname, '.', dir)
}

export default {
  alias: {
    '/@/': `${pathResolve('src')}/`,
  },
  server: {
    proxy: {
      '/bf': {
        target: 'https://test.brightfuture360.com/bf',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/bf/, ''),
      },
    },
  },
  plugins: [vue()],
}
