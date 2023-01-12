<template>
  <div class="login">
    <div class="title">{{ loginType ? '管理员登录' : '用户登录' }}</div>
    <div class="form-box">
      <div class="youke" @click="youke" v-if="!loginType"><el-link>游客登录</el-link></div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="50px"
        label-position="left"
        :hide-required-asterisk="true"
        style="width: 100%; margin-top: 30px"
      >
        <el-form-item label="账号" prop="username">
          <el-autocomplete
            style="width: 100%"
            popper-class="my-autocomplete"
            v-model="ruleForm.username"
            :fetch-suggestions="querySearch"
            placeholder="请输入用户名"
            @select="handleSelect"
          >
            <template slot-scope="{ item }">
              <div class="name">{{ item.username }}</div>
            </template>
          </el-autocomplete>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            show-password
            clearable
            v-model="ruleForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-checkbox v-model="ruleForm.memory"><el-link>记住密码</el-link></el-checkbox>
      <el-button class="btn" type="primary" @click="submitForm('ruleForm')">登 录</el-button>

      <div class="signUp"><el-link @click="goSignUp">注册账号</el-link></div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import FormLists from '@/components/formLists'
import { push } from 'store/storages/all'
export default {
  name: 'login',
  data() {
    return {
      options: [],
      value: [],
      ruleForm: {
        username: '',
        password: '',
        memory: false
      },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      restaurants: [],
      state: ''
    }
  },
  computed: {
    loginType() {
      return this.$route?.name == 'adminLogin' ? 1 : 0
    }
  },
  mounted() {
    this.restaurants = this.$store.getters.getAccountArr
    this.echo(this.restaurants?.[0])
  },
  methods: {
    ...mapActions(['Login']),
    goSingUp() {
      this.$router.push('/user/signUp')
    },
    handleSelect(item) {
      this.echo(item)
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },
    createFilter(queryString) {
      return restaurant => {
        return restaurant.username.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.Login(this.ruleForm).then(res => {
            if (res.data.code == 200) {
              this.$message.success('登录成功')
              const accountArr = this.$store.getters.getAccountArr
              let index = -1
              accountArr.find((item, ind) => {
                if (item.username == this.ruleForm.username) {
                  index = ind
                }
                return item.username == this.ruleForm.username
              })
              if (index != -1) {
                accountArr.splice(index, 1)
              }
              if (this.ruleForm.memory) {
                accountArr.unshift({ ...this.ruleForm, memory: this.ruleForm.memory })
              } else {
                accountArr.unshift({ username: this.ruleForm.username })
              }
              this.$store.commit('SET_ACCOUNTARR', accountArr)
              window.location.reload()
            } else {
              this.$message.error(res.data.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    youke() {
      this.$router.push('/client/home')
    },
    echo(data) {
      if (!data) return
      Object.keys(data).forEach(key => {
        this.ruleForm[key] = data[key]
      })
    },
    goSignUp() {
      this.$router.push({ path: '/user/signUp', query: { loginType: this.loginType } })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url('@/assets/img/login-bj.png');
  background-size: 100% 100%;
  height: 100vh;
  width: 100vw;
  .title {
    position: relative;
    top: 8%;
    font-size: 40px;
  }
  .form-box {
    margin-top: 10%;
    width: 300px;
    border-radius: 10px;
    padding: 20px 30px;
    box-shadow: 0px 0px 10px 6px rgba($color: #000, $alpha: 0.3);
    background-color: #fff;
    .youke {
      text-align: right;
    }
    .btn {
      margin-top: 10px;
      width: 100%;
    }
    .signUp {
      text-align: right;
      margin-bottom: 10px;
    }
  }
}
// ::v-deep(.el-select-dropdown) {
//   display: none;
// }
</style>
