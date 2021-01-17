<template>
  <RouterMenu :data="data" mode="horizontal"></RouterMenu>
  <router-view></router-view>
</template>

<script type="ts">
import { defineComponent, ref } from 'vue'
import { RouterMenu } from '/@/components/element/NavMenu'

export default defineComponent({
  name: "App",
  components:{ RouterMenu },
  setup() {
    const data = ref([
      { name:'Home', key:"/home" },
      { name: 'About', key:"/about" },
    ])
    return {
      data
    }
  },
})
</script>
