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
    >
      <template slot="num" slot-scope="{ index }">
        <el-input-number
          v-model="purchases[index].num"
          @change="num => numChange(num, index)"
          :min="0"
        ></el-input-number> </template
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
import { getOrderArr, paysPay, getShoppingCartArr, gchangeShoppingCartNum } from '@/api/client'
import { changeOrderState } from '@/api/order'
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
          key: 'orderNum',
          value: ''
        }
      ],
      btnArr: [{ key: 'query', name: '查询' }],
      tableRow: [
        { key: 'orderNum', label: '订单编号' },
        { key: 'createTime', label: '下单时间' },
        { key: 'saleMoneyTotal', label: '价格' },
        { key: 'num', label: '数量', type: 'slot' },
        {
          key: 'state',
          label: '支付状态',
          dict: [
            { text: '待发货', val: 1 },
            { text: '已发货', val: 2 },
            { text: '已签收', val: 3 },
            { text: '已评价', val: 4 },
            { text: '未下单', val: 5 },
            { text: '未支付', val: 6 }
          ]
        },
        {
          key: 'operate',
          label: '操作',
          btn: [
            { key: 'del', name: '删除' },
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
      evaluateShow: false,
      purchases: []
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
    numChange(num, index) {
      gchangeShoppingCartNum({ orderId: this.purchases[index]?.orderId, num: num }).then(res => {
        this.getData()
      })
    },
    async goDetails(row) {
      try {
        const detailsInfo = row
        this.$refs.detail.data = { ...detailsInfo, ...detailsInfo?.orderProduct }
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
        this.evaluateShow = true
      } else if (row.state == 6) {
        paysPay(row.orderNum).then(res => {})
      }
    },
    async getData() {
      try {
        this.loading = true
        const paging = this.$refs.page.getPage()
        const res = await getShoppingCartArr(this.queryParam, paging)
        this.tableData = res.data.records

        this.purchases = []
        this.tableData.forEach(item => {
          this.purchases.push({ orderId: item.id, num: item.num })
        })
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
