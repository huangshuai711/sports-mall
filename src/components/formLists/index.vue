<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    :label-width="labelWidth"
    :style="{ width: width }"
  >
    <el-form-item v-for="item in formArr" :key="item.prop" :label="item.label" :prop="item.prop">
      <template v-if="item.type == 'input'">
        <el-input
          v-model="ruleForm[item.prop]"
          :placeholder="'请输入' + item.label"
          clearable
        ></el-input>
      </template>

      <template v-else-if="item.type == 'password'">
        <el-input
          show-password
          clearable
          v-model="ruleForm[item.prop]"
          :placeholder="'请输入' + item.label"
        ></el-input>
      </template>
      <template v-else-if="item.type == 'upAvatar'">
        <el-upload
          class="avatar-uploader"
          :action="upLoadFileUrl"
          :show-file-list="false"
          :before-upload="file => beforeUpload(file, item.prop)"
        >
          <img v-if="ruleForm[item.prop]" :src="reImgUrl(ruleForm[item.prop])" class="avatar" />
          <i v-else class="el-icon-plus uploader-icon"></i>
        </el-upload>
      </template>
      <template v-else-if="item.type == 'upImg'">
        <el-upload
          class="img-uploader"
          :action="upLoadFileUrl"
          :show-file-list="false"
          :before-upload="file => beforeUpload(file, item.prop)"
        >
          <img v-if="ruleForm[item.prop]" :src="reImgUrl(ruleForm[item.prop])" class="imger" />
          <i v-else class="el-icon-plus uploader-icon img-icon"></i>
        </el-upload>
      </template>
      <template v-else-if="item.type == 'upImgList'">
        <div class="imgListBox">
          <div class="item-img" v-for="(url, ind) in ruleForm[item.prop]" :key="url">
            <el-image
              :src="reImgUrl(url)"
              :preview-src-list="reImgUrl(ruleForm[item.prop])"
              class="imger"
            >
            </el-image>
            <el-link class="del" @click="delImg(item.prop, ind)">删除</el-link>
          </div>
          <el-upload
            class="img-uploader"
            :action="upLoadFileUrl"
            :show-file-list="false"
            :before-upload="file => beforeUpload(file, item.prop, 'list')"
          >
            <i class="el-icon-plus uploader-icon img-icon"></i>
          </el-upload>
        </div>
      </template>
      <template v-else-if="item.type == 'radio'">
        <el-radio-group v-model="ruleForm[item.prop]">
          <el-radio v-for="rad in item.dict" :key="rad.val" :label="rad.val">{{
            rad.text
          }}</el-radio>
        </el-radio-group>
      </template>
      <template v-else-if="item.type == 'radioTree'">
        <el-cascader
          :options="
            treeFormat(
              item.treeData,
              data?.[item.value],
              item.name,
              item.value,
              item.children,
              item.disabled
            )
          "
          :props="{
            checkStrictly: true
          }"
          v-model="ruleForm[item.prop]"
          style="width: 100%"
          clearable
        ></el-cascader>
      </template>
      <template v-else-if="item.type == 'address'">
        <Distpicker ref="distpicker" :wrap="item.wrap" v-model="ruleForm[item.prop]"></Distpicker>
      </template>
      <template v-else-if="item.type == 'rete'">
        <el-rate class="rete" v-model="ruleForm[item.prop]" show-text> </el-rate>
      </template>
      <template v-else-if="item.type == 'textarea'">
        <el-input type="textarea" v-model="ruleForm[item.prop]"></el-input>
      </template>
    </el-form-item>
  </el-form>
</template>
<script>
import { checkGroup } from '@/utils'
import Distpicker from '@/components/distpicker'
import { uploadFiles } from '@/api/public'

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
      type: String,
      default: '500px'
    },
    // label宽度
    labelWidth: {
      type: String,
      default: '100px'
    },
    // 回显数据
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      ruleForm: {},
      rules: {},
      upLoadFileUrl: process.env.VUE_APP_BASE_URL + '/api/sysFiles/fileUpload'
    }
  },
  filters: {},
  created() {
    this.addFromField()
  },
  methods: {
    // 树格式转换
    treeFormat(tree, id, label = 'label', value = 'value', children = 'children', disabled) {
      const list = []
      try {
        tree.forEach((e, ind) => {
          let e_new = {
            value: e[value],
            label: e[label]
          }
          if (disabled && e[value] == id) {
            e_new = { ...e_new, disabled: true }
          }

          if (e[children] && e[children].length) {
            const new_children = this.treeFormat(e[children], id, label, value, children)
            e_new = { ...e_new, children: new_children }
          }
          list.push(e_new)
        })
      } catch (error) {
        return []
      }
      return list
    },
    // 添加字段及校验
    addFromField() {
      this.formArr.forEach(item => {
        if (item.type == 'rete') {
          this.$set(this.ruleForm, item.prop, 0)
        } else {
          this.$set(this.ruleForm, item.prop, '')
        }

        if (item.req) {
          let check = []
          if (item.check) {
            if (item.check != 'orPass') {
              check = [{ required: true, trigger: 'blur', validator: checkGroup[item.check] }]
            } else {
              check = [
                {
                  required: true,
                  trigger: 'blur',
                  validator: (rule, value, callback) =>
                    this.validatePass(rule, value, callback, item.link)
                }
              ]
            }
          } else if (item.type == 'address') {
            check = [{ required: true, trigger: 'blur' }]
          } else {
            check = [{ required: true, message: '请输入' + item.label, trigger: 'blur' }]
          }
          this.$set(this.rules, item.prop, check)
        }
      })
    },
    validatePass(rule, value, callback, link) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm[link]) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },
    // 回显
    echoData() {
      Object.keys(this.ruleForm).forEach(key => {
        this.ruleForm[key] = this.data?.[key]
      })
    },
    beforeUpload(file, prop, list) {
      var testmsg = /^image\/(jpeg|png|jpg)$/.test(file.type)
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!testmsg) {
        this.$message.error('上传图片格式不对!')
      }
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      const formData = new FormData()
      formData.append('multipartFile', file)
      uploadFiles(formData).then(res => {
        if (list) {
          if (!Array.isArray(this.ruleForm[prop])) {
            this.ruleForm[prop] = []
          }
          this.ruleForm[prop].push(res.data?.fileUrl)
        } else {
          this.ruleForm[prop] = res.data?.fileUrl
        }
      })
      return false
    },
    delImg(prop, ind) {
      this.ruleForm[prop].splice(ind, 1)
    },
    async checkFrom() {
      let primiseArr = []
      primiseArr.push(this.$refs.ruleForm.validate())
      if (this.$refs.distpicker) {
        if (Array.isArray(this.$refs.distpicker)) {
          this.$refs.distpicker.forEach(item => {
            primiseArr.push(item.validate())
          })
        } else {
          primiseArr.push(this.$refs.distpicker.validate())
        }
      }
      const valid = await Promise.all(primiseArr)
        .then(res => {
          res?.forEach(item => {
            if (!item) return false
          })
          return true
        })
        .catch(err => {
          return false
        })
      return valid
    },
    getData() {
      const params = {}
      Object.keys(this.ruleForm).forEach(key => {
        this.ruleForm[key] && (params[key] = this.ruleForm[key])
      })
      return params
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
      Object.keys(this.ruleForm).forEach(key => {
        this.ruleForm[key] = ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep(.el-upload) {
  border: 1px dashed rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep(.el-upload:hover) {
  border-color: #409eff;
}

::v-deep(.img-uploader .el-upload) {
  border-radius: 5px;
}
.uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.avatar {
  width: 60px;
  height: 60px;
  object-fit: cover;
  display: block;
}
.img-icon {
  width: 120px;
  height: 80px;
  line-height: 80px;
}
.imger {
  width: 120px;
  height: 80px;
  object-fit: cover;
  display: block;
}
.imgListBox {
  display: flex;
  flex-wrap: wrap;
  .item-img {
    margin-right: 10px;
    margin-bottom: 20px;
    position: relative;
    .del {
      position: absolute;
      bottom: -30px;
      left: 50px;
    }
  }
}
.avatar-uploader {
  line-height: 0;
}
.rete {
  position: relative;
  top: 10px;
}
</style>
