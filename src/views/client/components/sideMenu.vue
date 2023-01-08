<template>
  <div class="type-menu">
    <div class="title">商品分类：</div>
    <el-menu class="el-menu-vertical-demo" :collapse="true" @select="select">
      <el-submenu :index="item.id" v-for="item in treeData" :key="item.id">
        <template slot="title">{{ item.name }} </template>
        <el-menu-item :index="itemc.id" v-for="itemc in item.children" :key="itemc.id">{{
          itemc.name
        }}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import { getSortTree } from '@/api/client'
export default {
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name',
        id: 'id'
      },
      treeData: []
    }
  },
  computed: {},
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        this.treeData = await getSortTree().then(res => res.data)
      } catch (error) {}
    },
    select(index) {
      this.$router.push({ path: '/client/allClass', query: { productTypeId: index } })
      this.$store.commit('SET_PRODUCTTYPE', index)
    }
  }
}
</script>
<style lang="scss" scoped>
.type-menu {
  width: 100%;
  height: 100%;
  box-shadow: 0 3px 12px rgb(98 107 181 / 25%);
  padding: 20px 0 20px 30px;
  box-sizing: border-box;
  .title {
    margin-bottom: 30px;
    font-size: 20px;
  }
}
::v-deep .el-tree {
  background-color: rgba($color: #000000, $alpha: 0);
}
::v-deep .el-menu {
  width: 100%;
  margin: 0;
  background-color: rgba($color: #000, $alpha: 0);
  border: none;
}
::v-deep .el-submenu__title {
  padding-left: 50px !important;
  font-size: 20px;
}
</style>
