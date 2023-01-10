<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pageNum"
    :page-sizes="[10, 20, 30, 50, 100]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  >
  </el-pagination>
</template>
<script>
export default {
  props: {
    total: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 20
    }
  },
  computed: {
    refresh() {
      const { pageSize, pageNum } = this
      return { pageSize, pageNum }
    }
  },
  watch: {
    refresh() {
      this.$emit('refresh')
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.pageNum = val
    },
    getPage() {
      const { pageSize, pageNum } = this
      return { pageSize, pageNum }
    },
    resetPageNum() {
      this.pageNum = 1
    }
  }
}
</script>
<style lang="scss" scoped></style>
