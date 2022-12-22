<template>
  <el-dialog
    :title="title"
    :visible.sync="childShow"
    :close-on-click-modal="false"
    width="600px"
    :before-close="close"
    center
    ><Table
      :tableRow="tableRow"
      :tableData="tableData"
      :loading="loading"
      class="flex-fill"
    ></Table>
  </el-dialog>
</template>
<script>
import Table from '@/components/table'
import { commentList } from '@/api/client'
export default {
  components: { Table },
  model: {
    prop: 'fatherShow',
    event: 'shoChange'
  },
  props: {
    fatherShow: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      childShow: this.fatherShow,
      tableRow: [
        { key: 'productName', label: '评论人' },
        { key: 'sysFilePath', label: '评论内容' },
        { key: 'updateTime', label: '评论时间' }
      ],
      tableData: [],
      data: null,
      title: '评论列表',
      loading: false
    }
  },
  watch: {
    fatherShow(val) {
      this.childShow = val
      val && this.getData()
    }
  },
  created() {},
  computed: {},
  methods: {
    close() {
      this.$emit('shoChange', false)
    },
    async getData() {
      try {
        this.loading = true
        this.tableData = await commentList(this.id).then(res => res.data)
        this.loading = false
      } catch (error) {}
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep.el-dialog__wrapper {
  position: absolute !important;
}
::v-deep.v-modal {
  position: absolute !important;
}
</style>
