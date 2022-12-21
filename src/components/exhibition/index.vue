<template>
  <el-form
    :model="ruleForm"
    ref="ruleForm"
    :label-width="labelWidth + 'px'"
    :style="{ width: width + 'px' }"
  >
    <el-form-item
      v-for="item in formArr"
      :key="item.prop"
      :label="item.label + ':'"
      :prop="item.prop"
    >
      <template v-if="ruleForm[item.prop]">
        <template v-if="item.type == 'text'">
          {{
            item.dict
              ? item.dict.find(dic => dic.val == ruleForm[item.prop])?.text
              : ruleForm[item.prop]
          }}
        </template>

        <template v-else-if="item.type == 'img'">
          <el-image
            v-if="ruleForm[item.prop]"
            style="width: 200px; height: 100px"
            :src="reImgUrl(ruleForm[item.prop])"
            :preview-src-list="[reImgUrl(ruleForm[item.prop])]"
          >
          </el-image>
        </template>
        <template v-else-if="item.type == 'imgs'">
          <el-image
            v-if="ruleForm[item.prop]?.[0]"
            style="width: 200px; height: 100px"
            :src="reImgUrl(ruleForm[item.prop]?.[0])"
            :preview-src-list="reImgUrl(ruleForm[item.prop])"
          >
          </el-image>
        </template>
      </template>
    </el-form-item>
  </el-form>
</template>
<script>
import Distpicker from '@/components/distpicker'

export default {
  components: { Distpicker },
  name: 'formList',
  props: {
    // 表单类型列表
    formArr: {
      type: Array,
      default: () => []
    },
    // 表单整体宽度
    width: {
      type: Number,
      default: 500
    },
    // label宽度
    labelWidth: {
      type: Number,
      default: 100
    },
    // 回显数据
    data: {
      type: Object,
      default: () => {}
    }
  },
  filters: {},
  data() {
    return {
      ruleForm: {}
    }
  },
  created() {
    this.addFromField()
    this.echoData()
  },
  methods: {
    // 添加字段
    addFromField() {
      this.formArr.forEach(item => {
        this.$set(this.ruleForm, item.prop, '')
      })
    },
    // 回显
    echoData() {
      Object.keys(this.ruleForm).forEach(key => {
        this.ruleForm[key] = this.data?.[key]
      })
    },
    resetForm() {
      Object.keys(this.ruleForm).forEach(key => {
        this.ruleForm[key] = ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep(.avatar-uploader .el-upload) {
  border: 1px dashed rgba(0, 0, 0, 0.6);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep(.avatar-uploader .el-upload:hover) {
  border-color: #409eff;
}
::v-deep .el-image__error,
::v-deep .el-image__inner,
::v-deep .el-image__placeholder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  max-height: 100%;
  max-width: 100%;
  height: auto;
  width: auto;
}
</style>
