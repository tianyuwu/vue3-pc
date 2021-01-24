<template>
  <div class="basic-table">
    <el-table :data="tableData">
      <template v-for="(item, index) in columns" :key="index">
        <el-table-column :prop="item.prop" :label="item.label"> </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  name: 'BasicTable',
  components: {},
  props: {
    tableData: {
      type: [Array] as PropType<any[]>,
      default: () => [],
    },
    columns: {
      type: [Array] as PropType<any[]>,
      default: () => [],
    },
  },
  setup() {},
})
</script>
<style></style>
