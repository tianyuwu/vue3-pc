<template>
  <el-menu router v-bind="$attrs" :default-active="activeIndex">
    <el-menu-item v-for="(item, index) in data" :key="index" :index="item.key">{{
      item.name
    }}</el-menu-item>
  </el-menu>
</template>

<script lang="ts">
/**
 * 路由导航菜单
 */
import { defineComponent, PropType, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { MenuItem } from './types'
export default defineComponent({
  name: 'RouterMenu',
  props: {
    data: {
      type: Array as PropType<MenuItem[]>,
      default: () => [],
    },
  },
  setup() {
    const route = useRoute()
    const activeIndex = ref('')

    // 路由变化后赋值
    watchEffect(() => {
      activeIndex.value = route.path
    })

    return {
      activeIndex,
    }
  },
})
</script>
