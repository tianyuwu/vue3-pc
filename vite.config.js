import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

function pathResolve(dir) {
  return resolve(__dirname, '.', dir)
}

export default {
  alias: {
    '/@/': `${pathResolve('src')}/`,
  },
  plugins: [vue()],
}
