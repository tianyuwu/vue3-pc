<template>
  <div class="container">
    <span>{{ text }}</span>
    <el-button type="primary">主要按钮</el-button>
  </div>
</template>

<script type="ts">
import { defineComponent } from 'vue'
import { useTest } from './hooks/useTest'

export default defineComponent({
  name: 'App',
  setup() {
    // const text = ref<string>("Hello World")
    const text = useTest('Hello World')

    return {
      text
    }
  }
})
</script>
<style lang="scss">
.container {
}
</style>
