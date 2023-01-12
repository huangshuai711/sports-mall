<template>
  <el-dialog
    title="评价"
    :visible.sync="childShow"
    :close-on-click-modal="false"
    width="600px"
    :before-close="close"
    center
    ><FormLists ref="formlists" :formArr="formArr" :data="data"></FormLists>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirm">确 认</el-button>
      <el-button @click="close">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import FormLists from '@/components/formLists'
import { commodityEvaluate } from '@/api/client'
export default {
  components: { FormLists },
  model: {
    prop: 'fatherShow',
    event: 'shoChange'
  },
  props: {
    fatherShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      childShow: this.fatherShow,
      formArr: [
        { type: 'rete', label: '星级', prop: 'commentStart' },
        { type: 'textarea', label: '内容', prop: 'commentContent' }
      ],
      data: null
    }
  },
  watch: {
    fatherShow(val) {
      if (!val) {
        this.$refs.formlists.resetForm()
      } else {
        this.$nextTick(() => {
          this.$refs.formlists.echoData()
        })
      }
      this.childShow = val
    }
  },
  computed: {},
  methods: {
    close() {
      this.$emit('shoChange', false)
    },
    async confirm() {
      console.log('1233')
      try {
        const valid = await this.$refs.formlists.checkFrom()
        if (valid) {
          const params = {}
          params.commentDto = this.$refs.formlists.getData()
          params.commentDto.username = this.$store.getters?.getUserInfo?.username
          const res = await commodityEvaluate(this.data?.id, params)
          if (res.code == 200) {
            this.$message.success('评价成功')
            this.close()
            this.$emit('refresh')
          } else {
            this.$message.error(res.msg)
          }
        }
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
