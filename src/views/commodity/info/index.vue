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
    <Details ref="detail" v-model="detailsShow"></Details>
    <Edit ref="edit" v-model="editShow" @refresh="getData"></Edit>
  </div>
</template>

<script>
import SearchFrom from '@/components/searchFrom'
import Table from '@/components/table'
import Pagination from '@/components/pagination'
import {
  getCommodityDatas,
  exportCommodity,
  changeCommodityState,
  deleteCommodity,
  changeSellState
} from '@/api/commodity'
import { downloadFile } from '@/utils'
import Details from './components/details.vue'
import Edit from './components/edit.vue'
export default {
  name: 'commodity-info',
  components: { SearchFrom, Table, Pagination, Details, Edit },
  data() {
    return {
      formData: [
        {
          type: 'date',
          name: '更新时间',
          key: ['updateStartTime', 'updateEndTime'],
          value: []
        },
        {
          type: 'input',
          name: '商品名称',
          key: 'productName',
          value: ''
        },
        {
          type: 'input',
          name: '商品分类',
          key: 'productType',
          value: ''
        },
        {
          type: 'input',
          name: '品牌商',
          key: 'brandingBusiness',
          value: ''
        },
        {
          type: 'select',
          name: '商品状态',
          key: 'productStatus',
          option: this.$dict.commodity.state,
          value: ''
        }
      ],
      btnArr: [
        { key: 'query', name: '查询' },
        { key: 'export', name: '导出' },
        { key: 'reset', name: '重置' },
        { key: 'add', name: '新增商品' }
      ],
      tableRow: [
        { key: 'productName', label: '商品名称' },
        { key: 'productType', label: '商品分类' },
        { key: 'isRecommend', label: '推荐商品', dict: this.$dict.commodity.isRecommend },
        { key: 'brandingBusiness', label: '品牌商' },
        { key: 'productStatusStr', label: '商品状态' },
        { key: 'originalPrice', label: '原价' },
        { key: 'promotionPrice', label: '促销价' },
        { key: 'updateTime', label: '更新时间' },
        {
          key: 'operate',
          label: '操作',
          btn: [
            { key: 'details', name: '详情' },
            { key: 'edit', name: '编辑' },
            { key: 'upDown', dict: { 2: '上架', 1: '下架' }, link: 'productStatus' },
            { key: 'delete', name: '删除' },
            { key: 'sell', dict: { 0: '推荐', 1: '取消推荐' }, link: 'isRecommend' }
          ]
        }
      ],
      tableData: [],
      total: 0,
      queryParam: {},
      loading: false,
      detailsShow: false,
      editShow: false
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
      } else if (key == 'add') {
        this.add()
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
        const res = await exportCommodity(this.queryParam)
        downloadFile(res, '商品信息')
      } catch (error) {}
    },
    add() {
      this.$refs.edit.data = null
      this.editShow = true
    },
    operateEvent(data) {
      if (data.key == 'details') {
        this.goDetails(data.row)
      } else if (data.key == 'edit') {
        this.edit(data.row)
      } else if (data.key == 'upDown') {
        this.changeState(data.row)
      } else if (data.key == 'delete') {
        this.delete(data.row)
      } else if (data.key == 'sell') {
        this.sell(data.row)
      }
    },
    dataHandel(row) {
      const newRow = JSON.parse(JSON.stringify(row))
      newRow.sysFilePath = newRow.sysFile.filePath
      newRow.sysFileListPath = []
      newRow.sysFileList?.forEach(item => {
        newRow.sysFileListPath.push(item.filePath)
      })
      return newRow
    },
    goDetails(row) {
      this.$refs.detail.data = this.dataHandel(row)
      this.detailsShow = true
    },
    edit(row) {
      this.$refs.edit.data = this.dataHandel(row)
      this.editShow = true
    },
    changeState(row) {
      const nowSta = row.productStatus == 1 ? '下架' : '上架'
      this.$confirm(`确认${nowSta}此商品？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          changeCommodityState(row.id).then(res => {
            if (res.code == 200) {
              this.getData()
              this.$message.success(nowSta + '成功')
            } else {
              this.$message.error(res.msg)
            }
          })
        })
        .catch(() => {})
    },
    delete(row) {
      this.$confirm(`确认删除此商品？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCommodity(row.id).then(res => {
          if (res.code == 200) {
            this.getData()
            this.$message.success('删除成功')
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    sell(row) {
      const nowSta = row.isRecommend == 0 ? '推荐' : '取消推荐'
      this.$confirm(`确认${nowSta}此商品？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          changeSellState(row.id).then(res => {
            if (res.code == 200) {
              this.getData()
              this.$message.success(nowSta + '成功')
            } else {
              this.$message.error(res.msg)
            }
          })
        })
        .catch(() => {})
    },
    async getData() {
      try {
        this.loading = true
        const paging = this.$refs.page.getPage()
        const res = await getCommodityDatas(this.queryParam, paging)
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
