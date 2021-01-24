<template>
  <div class="table">
    <BasicTable :columns="columns" :tableData="tableData"></BasicTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicTable } from '/@/components/element/Table'
export default defineComponent({
  name: 'Sub',
  components: { BasicTable },
  props: {},
  setup(props) {
    return {
      columns: [
        {
          prop: 'date',
          label: '日期',
        },
        {
          prop: 'name',
          label: '姓名',
        },
        {
          prop: 'address',
          label: '地址',
        },
      ],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
    }
  },
})
</script>
<style></style>
