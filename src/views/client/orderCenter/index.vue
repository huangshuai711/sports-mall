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
    <Pagination ref="page" :total="total" class="flex-bot" @refresh="getData"></Pagination>
    <Details ref="detail" v-model="detailsShow"></Details>
    <Evaluate ref="evaluate" v-model="evaluateShow" @refresh="getData"></Evaluate>
  </div>
</template>

<script>
import SearchFrom from '@/components/searchFrom'
import Table from '@/components/table'
import Pagination from '@/components/pagination'
import { getOrderArr, paysPay } from '@/api/client'
import { changeOrderState, getOrderDetail } from '@/api/order'
import Details from './components/details.vue'
import Evaluate from './components/evaluate.vue'
export default {
  name: 'order-info',
  components: { SearchFrom, Table, Pagination, Details, Evaluate },
  data() {
    return {
      formData: [
        {
          type: 'input',
          name: '商品名称',
          key: 'productName',
          value: ''
        }
      ],
      btnArr: [{ key: 'query', name: '查询' }],
      tableRow: [
        { key: 'orderNum', label: '订单编号' },
        { key: 'productName', label: '商品名称' },
        { key: 'filePath', label: '商品主图', type: 'imger' },
        { key: 'orderTime', label: '下单时间' },
        { key: 'state', label: '订单状态', dict: this.$dict.order.state },
        {
          key: 'operate',
          label: '操作',
          btn: [
            { key: 'details', name: '详情' },
            {
              key: 'delivery',
              dict: { 2: '签收', 3: '评价', 5: '下单', 6: '去支付' },
              link: 'state'
            }
          ]
        }
      ],
      tableData: [],
      total: 0,
      queryParam: {},
      loading: false,
      detailsShow: false,
      evaluateShow: false
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    operation(key) {
      if (key == 'query') {
        this.query()
      }
    },
    query() {
      this.queryParam = this.$refs.search.getValue()
      this.$refs.page.resetPageNum()
      this.getData()
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
      if (row.state == 2 || row.state == 5) {
        const text = row.state == 2 ? '签收' : '下单'
        this.$confirm(`确认${text}？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            const param = {
              id: row.id,
              state: row.state == 2 ? 3 : 6
            }
            changeOrderState(param).then(res => {
              if (res.code == 200) {
                this.$message.success(`${text}成功`)
                this.getData()
              } else {
                this.$message.error(res.msg)
              }
            })
          })
          .catch(() => {})
      } else if (row.state == 3) {
        this.$refs.evaluate.data = row
        this.evaluateShow = true
      } else if (row.state == 6) {
        paysPay(row.orderNum).then(res => {})
      }
    },
    async getData() {
      try {
        this.loading = true
        const paging = this.$refs.page.getPage()
        const res = await getOrderArr(this.queryParam, paging)
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
