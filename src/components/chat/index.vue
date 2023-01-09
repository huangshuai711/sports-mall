<template>
  <div>
    <div class="robotEntry" @click="open">客服</div>
    <el-dialog
      :visible.sync="outerVisible"
      :modal="false"
      :fullscreen="true"
      :close-on-click-modal="false"
      @before-close="outerVisible = false"
    >
      <PupUp></PupUp>
    </el-dialog>
  </div>
</template>

<script>
import PupUp from './components/pupUp'
export default {
  name: 'home',
  components: { PupUp },
  data() {
    return {
      outerVisible: false
    }
  },
  mounted() {},
  methods: {
    open() {
      this.outerVisible = !this.outerVisible
    }
  }
}
</script>
<style lang="scss" scoped>
.robotEntry {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  background: rgb(0, 206, 209);
  font-size: 28px;
  cursor: pointer;
  color: #fff;
  font-weight: 700;
  text-align: center;
  line-height: 80px;
  position: fixed;
  right: 30px;
  bottom: 50px;
  box-shadow: 0 3px 12px rgb(98 107 181 / 25%);
}
::v-deep .el-dialog__wrapper {
  width: 810px;
  height: 660px;
  position: fixed;
  top: auto;
  left: auto;
  bottom: 150px !important;
  right: 30px !important;
  overflow: auto;
  margin: 0;
}
</style>
