<template>
  <div class="type-menu">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="全部商品分类" name="allClass"></el-tab-pane>
      <el-tab-pane label="首页" name="home"></el-tab-pane>
      <el-tab-pane label="我的购物车" name="shoppingCart"></el-tab-pane>
      <el-tab-pane label="我的的订单" name="orderCenter"></el-tab-pane>
      <el-tab-pane label="我的收藏" name="collection"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {
    activeName: {
      get() {
        return this.$route.name
      },
      set(val) {
        this.$router.push({ name: val })
      }
    }
  },
  watch: {},
  created() {},
  methods: {
    jump(tab) {
      this.$router.push({ name: tab.name })
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-tabs__content {
  padding: 0;
}
::v-deep .el-tabs--border-card > .el-tabs__header {
  background-color: rgb(64, 158, 255);
  border-bottom: 1px solid rgb(64, 158, 255);
  margin: 0;
}
::v-deep .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  color: #fff;
}
::v-deep .el-tabs--border-card {
  background: #fff;
  border: 1px solid rgb(64, 158, 255);
}
::v-deep .el-tabs--border-card > .el-tabs__header .el-tabs__item:not(.is-disabled):hover {
  color: #fff;
}
::v-deep .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  color: #409eff !important;
}
</style>
