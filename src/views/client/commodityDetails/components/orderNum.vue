<template>
  <el-dialog
    :title="title"
    :visible.sync="childShow"
    :close-on-click-modal="false"
    width="600px"
    :before-close="close"
    center
    ><el-form :model="formRole" ref="from" label-width="100px" class="demo-ruleForm">
      <el-form-item label="数量" prop="num">
        <el-input-number v-model="formRole.num" :min="1" label="描述文字"></el-input-number>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" placeholder="请输入内容" v-model="formRole.remark"> </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提 交</el-button>
        <el-button @click="close">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import Table from '@/components/table'
import { addOrder, paysPay } from '@/api/client'
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
      formRole: {
        num: 0,
        remark: ''
      },
      tableData: [],
      data: null,
      title: '加入购物车',
      loading: false
    }
  },
  watch: {
    fatherShow(val) {
      this.childShow = val
    }
  },
  created() {},
  computed: {},
  methods: {
    submitForm() {
      this.$refs.from.validate(valid => {
        if (valid) {
          const param = {
            state: this.title === '加入购物车' ? 5 : 6,
            orderProduct: { ...this.formRole, productId: this.id }
          }
          addOrder(param).then(res => {
            if (res.code == 200) {
              this.$message.success(this.title + '成功')
              if (this.title == '下单') {
                paysPay(res.data).then(res => {
                  this.$router.push('/client/orderCenter')
                })
              } else {
                this.$refs.from.resetFields()
                this.close()
              }
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    close() {
      this.$emit('shoChange', false)
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
