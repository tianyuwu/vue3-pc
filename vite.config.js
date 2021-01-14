import { resolve } from 'path'
export default {
  alias: {
    '/@/': resolve(__dirname, 'src'),
  },
  build: {
    manifest: true,
    rollupOptions: {
      output: {
        compact: true,
      },
    },
  },
}
