<template>
  <div class="signUp">
    <div class="form-box">
      <FormLists ref="formlists" width="100%" labelWidth="80px" :formArr="formArr"></FormLists>
      <el-button class="btn" type="primary" @click="submitForm('ruleForm')">注 册</el-button>
      <div class="login"><el-link @click="goLogin">已有账号 去登陆</el-link></div>
    </div>
  </div>
</template>
<script>
import { signUp } from '@/api/user'
import FormLists from '@/components/formLists'
export default {
  components: { FormLists },
  name: 'signUp',
  data() {
    return {
      formArr: [
        { type: 'upAvatar', label: '用户头像', prop: 'avatar', upType: 'img' },
        { type: 'input', label: '用户名', prop: 'username', req: true },
        { type: 'input', label: '联系电话', prop: 'telephone', req: true, check: 'phone' },
        { type: 'input', label: '邮箱', prop: 'email', req: true, check: 'email' },
        { type: 'address', label: '地址', prop: 'address', wrap: true, req: true },
        { type: 'password', label: '密码', prop: 'password', req: true, check: 'pass' },
        {
          type: 'password',
          label: '确认密码',
          prop: 'orPassword',
          req: true,
          check: 'orPass',
          link: 'password'
        }
      ]
    }
  },
  methods: {
    async submitForm() {
      try {
        const valid = await this.$refs.formlists.checkFrom()
        if (valid) {
          const params = this.$refs.formlists.getData()
          const res = await signUp(params)
          if (res.data.code == 200) {
            this.$message.success('注册成功')
            setTimeout(() => {
              this.goLogin()
            }, 300)
          } else {
            this.$message.error(res.msg)
          }
        }
      } catch (error) {}
    },
    goLogin() {
      this.$router.push('/user/login')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.signUp {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: url('@/assets/img/login-bj.png');
  background-size: 100% 100%;
  .form-box {
    margin-top: 10%;
    width: 300px;
    border-radius: 10px;
    padding: 20px 30px;
    box-shadow: 0px 0px 10px 6px rgba($color: #000, $alpha: 0.3);
    background-color: #fff;
    .btn {
      width: 100%;
    }
    .login {
      text-align: right;
      margin-bottom: 10px;
    }
  }
}
</style>
