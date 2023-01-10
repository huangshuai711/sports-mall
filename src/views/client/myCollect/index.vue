<template>
  <div class="commodity-info flex-col-box">
    <Table :tableRow="tableRow" :tableData="tableData" :loading="loading" class="flex-fill"></Table>
    <Pagination ref="page" :total="total" class="flex-bot" @refresh="getData"></Pagination>
  </div>
</template>

<script>
import SearchFrom from '@/components/searchFrom'
import Table from '@/components/table'
import Pagination from '@/components/pagination'
import { getCollectCommoditys } from '@/api/client'
export default {
  name: 'commodity-info',
  components: { SearchFrom, Table, Pagination },
  data() {
    return {
      tableRow: [
        { key: 'productName', label: '商品名称' },
        { key: 'filePath', label: '商品主图', type: 'imger' },
        { key: 'updateTime', label: '收藏时间' }
      ],
      tableData: [],
      total: 0,
      queryParam: {},
      loading: false
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        this.loading = true
        const paging = this.$refs.page.getPage()
        const res = await getCollectCommoditys(this.queryParam, paging)
        this.tableData = res.data
        this.total = res.data.total
        this.loading = false
      } catch (error) {}
    }
  }
}
</script>
<style lang="scss" scoped>
.flex-col-box {
  padding: 30px;
  display: flex;
  flex-direction: column;
  height: 100%;
  .flex-fill {
    margin: 30px 0;
  }
  .flex-bot {
    margin-bottom: 30px;
    display: flex;
    justify-content: right;
  }
}
</style>
