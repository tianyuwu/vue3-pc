<template>
  <div class="basic-table">
    <el-table :data="tableData" v-loading="loading">
      <template v-for="(item, index) in columns" :key="index">
        <el-table-column :prop="item.prop" :label="item.label"> </el-table-column>
      </template>
    </el-table>
    <el-pagination
      background
      layout="total, prev, pager, next"
      :total="1000"
      :page-size="1"
      :current-pag="1"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, unref, watchEffect } from 'vue'
export default defineComponent({
  name: 'BasicTable',
  components: {},
  props: {
    columns: {
      type: [Array] as PropType<any[]>,
      default: () => [],
    },
    api: {
      type: Function as PropType<(...arg: any[]) => Promise<any>>,
      default: null,
    },
  },
  setup(props) {
    const tableData = ref([])
    const loading = ref(false)
    const { api } = unref(props)

    async function fetchData() {
      loading.value = true
      const res = await api()
      loading.value = false
      tableData.value = res.data.records
    }

    watchEffect(() => {
      fetchData()
    })

    return {
      tableData,
      loading,
    }
  },
})
</script>
<style></style>
