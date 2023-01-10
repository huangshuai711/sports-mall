<template>
  <div class="commodity-info flex-col-box">
    <SearchFrom
      ref="search"
      :formData="formData"
      :btnArr="btnArr"
      @btnClick="operation"
    ></SearchFrom>
    <Table
      :tableRow="tableRow"
      :tableData="tableData"
      :loading="loading"
      @operateEvent="operateEvent"
      class="flex-fill"
    ></Table>
    <Pagination ref="page" :total="total" class="flex-bot" @refresh="getData"></Pagination>
  </div>
</template>

<script>
import SearchFrom from '@/components/searchFrom'
import Table from '@/components/table'
import Pagination from '@/components/pagination'
import { getLogs, exportLogs, deleteLog } from '@/api/system'
import { downloadFile } from '@/utils'
export default {
  name: 'commodity-info',
  components: { SearchFrom, Table, Pagination },
  data() {
    return {
      formData: [
        {
          type: 'date',
          name: '创建时间',
          key: ['updateStartTime', 'updateEndTime'],
          value: []
        },
        {
          type: 'input',
          name: '用户名称',
          key: 'username',
          value: ''
        }
      ],
      btnArr: [
        { key: 'query', name: '查询' },
        { key: 'export', name: '导出' },
        { key: 'reset', name: '重置' }
      ],
      tableRow: [
        { key: 'username', label: '用户名称' },
        { key: 'loginTime', label: '创建时间' },
        {
          key: 'operate',
          label: '操作',
          btn: [{ key: 'delete', name: '删除' }]
        }
      ],
      tableData: [],
      total: 0,
      queryParam: {},
      loading: false
    }
  },
  created() {
    if (this.$route.params.username) {
      this.formData.find(item => item.key == 'username').value = this.$route.params.username
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    operation(key) {
      if (key == 'query') {
        this.query()
      } else if (key == 'reset') {
        this.reset()
      } else if (key == 'export') {
        this.export()
      }
    },
    query() {
      this.queryParam = this.$refs.search.getValue()
      this.$refs.page.resetPageNum()
      this.getData()
    },
    reset() {
      this.$refs.search.reset()
    },
    async export() {
      try {
        const res = await exportLogs(this.queryParam)
        downloadFile(res, '用户信息')
      } catch (error) {}
    },
    operateEvent(data) {
      if (data.key == 'delete') {
        this.delete(data.row)
      }
    },
    delete(row) {
      this.$confirm(`确认删除此日志？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteLog(row.id).then(res => {
          if (res.code == 200) {
            this.getData()
            this.$message.success('删除成功')
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    async getData() {
      try {
        this.loading = true
        const paging = this.$refs.page.getPage()
        const res = await getLogs(this.queryParam, paging)
        this.tableData = res.data.records
        this.total = res.data.total
        this.loading = false
      } catch (error) {}
    }
  }
}
</script>
<style lang="scss" scoped>
.flex-col-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  .flex-fill {
    margin: 30px 0;
    overflow: auto;
  }
  .flex-bot {
    margin-bottom: 30px;
    display: flex;
    justify-content: right;
  }
}
</style>
