<template>
  <div class="container">
    <span>{{ text }}</span>
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
  position: relative;
  color: #333;
  text-align: left;

  span {
    font-size: 14px;
    color: #666;
  }
}
</style>
