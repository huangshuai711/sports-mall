<template>
  <div class="order-info flex-col-box">
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
    <Pagination ref="page" :total="total" class="flex-bot"></Pagination>
    <Details ref="detail" v-model="detailsShow"></Details>
  </div>
</template>

<script>
import SearchFrom from '@/components/searchFrom'
import Table from '@/components/table'
import Pagination from '@/components/pagination'
import { getOrderData, exportOrder, getOrderDetail, changeOrderState } from '@/api/order'
import { downloadFile } from '@/utils'
import Details from './components/details.vue'
export default {
  name: 'order-info',
  components: { SearchFrom, Table, Pagination, Details },
  data() {
    return {
      formData: [
        {
          type: 'date',
          name: '下单时间',
          key: ['updateStartTime', 'updateEndTime'],
          value: []
        },
        {
          type: 'input',
          name: '订单编号',
          key: 'orderNum',
          value: ''
        },
        {
          type: 'input',
          name: '配送地址',
          key: 'address',
          value: ''
        },
        {
          type: 'input',
          name: '下单人',
          key: 'username',
          value: ''
        },
        {
          type: 'select',
          name: '订单状态',
          key: 'state',
          option: this.$dict.order.state,
          value: ''
        }
      ],
      btnArr: [
        { key: 'query', name: '查询' },
        { key: 'export', name: '导出' },
        { key: 'reset', name: '重置' }
      ],
      tableRow: [
        { key: 'orderNum', label: '订单编号' },
        { key: 'address', label: '配送地址' },
        { key: 'orderTime', label: '下单时间' },
        { key: 'username', label: '下单人' },
        { key: 'state', label: '订单状态', dict: this.$dict.order.state },
        { key: 'saleMoneyTotal', label: '促销总价' },
        {
          key: 'operate',
          label: '操作',
          btn: [
            { key: 'details', name: '详情' },
            { key: 'delivery', name: '发货' }
          ]
        }
      ],
      tableData: [],
      total: 0,
      queryParam: {},
      loading: false,
      detailsShow: false
    }
  },
  mounted() {
    this.getdata()
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
      this.getdata()
    },
    reset() {
      this.$refs.search.reset()
    },
    async export() {
      try {
        const res = await exportOrder({})
        downloadFile(res, '订单信息')
      } catch (error) {}
    },
    operateEvent(data) {
      if (data.key == 'details') {
        this.goDetails(data.row)
      } else if (data.key == 'delivery') {
        this.delivery(data.row)
      }
    },
    async goDetails(row) {
      try {
        const info = await getOrderDetail(row.id).then(res => res.data)
        const detailsInfo = { ...info, ...info.orderProduct }
        detailsInfo.sysFilePath = detailsInfo?.sysFile?.filePath
        detailsInfo.sysFileListPath = detailsInfo?.sysFileList?.map(item => item.filePath)
        this.$refs.detail.data = detailsInfo
        this.detailsShow = true
      } catch (error) {}
    },
    delivery(row) {
      this.$confirm(`确认发货？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const param = {
            id: row.id,
            state: 2
          }
          changeOrderState(param).then(res => {
            if (res.code == 200) {
              this.$message.success('发货成功')
              this.getdata()
            } else {
              this.$message.error(res.msg)
            }
          })
        })
        .catch(() => {})
    },
    async getdata() {
      try {
        this.loading = true
        const paging = this.$refs.page.getPage()
        const res = await getOrderData(this.queryParam, paging)
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
  }
  .flex-bot {
    margin-bottom: 30px;
    display: flex;
    justify-content: right;
  }
}
</style>
