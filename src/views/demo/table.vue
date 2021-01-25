<template>
  <div class="table">
    <BasicTable :columns="columns" :api="api"></BasicTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicTable } from '/@/components/element/Table'
import { defHttp } from '/@/utils/http/axios'
export default defineComponent({
  name: 'Sub',
  components: { BasicTable },
  props: {},
  setup(props) {
    return {
      columns: [
        {
          prop: 'nickname',
          label: '姓名',
        },
        {
          prop: 'tags',
          label: '特点',
        },
        {
          prop: 'introduction',
          label: '秒速',
        },
      ],
      api: () => {
        return defHttp.request({
          url: '/bf/home/teachers',
          method: 'GET',
        })
      },
    }
  },
})
</script>
<style></style>
