<template>
  <div class="box">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/client/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="item in nav"
        :key="item.nav"
        :to="{ path: '/client/allClass', query: { productTypeId: item.id } }"
        >{{ item.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="menu">
      <div class="lable">分类：</div>
      <el-tabs v-model="active" @tab-click="handleClick" class="tab">
        <el-tab-pane
          v-for="item in nowArr"
          :key="item.id"
          :label="item.name"
          :name="item.id"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <div class="content">
      <div class="tj">
        <div class="title">商品推荐</div>
        <div class="item-box">
          <div class="item" v-for="item in tjcommoditys" :key="item.id" @click="comJump(item)">
            <div class="name">{{ item.productName }}</div>
            <div class="price">￥{{ item.originalPrice }}</div>
          </div>
        </div>
      </div>
      <div class="sp">
        <div class="commodits">
          <div
            class="commodity-box"
            v-for="item in commoditys"
            :key="item.id"
            @click="goDetail(item)"
          >
            <div class="pic"><img :src="item.sysFile?.filePath" alt="" /></div>
            <div class="info info1">
              <div class="name ellip">{{ item.productName }}</div>
              <span @click.stop="collect(item)">
                <Icon
                  class="icon"
                  :type="item.isComment == 1 ? 'collYes' : 'collNo'"
                  width="30px"
                  height="30px"
                ></Icon>
              </span>
            </div>
            <div class="info info2">
              <div class="price">
                {{ item.promotionPrice }} <span class="orPrice">{{ item.originalPrice }}</span>
              </div>
              <div class="pps ellip">{{ item.brandingBusiness }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getSortTree, getCommoditys, getTjCommoditys, switchCollectState } from '@/api/client'
export default {
  data() {
    return {
      nowArr: [],
      nav: [],
      active: '',
      tjcommoditys: [],
      commoditys: []
    }
  },
  computed: {
    productTypeId() {
      return this.$route.query.productTypeId || ''
    }
  },
  watch: {
    productTypeId(val) {
      this.active = val
      this.getSpTypeTree()
      this.getData()
    }
  },
  created() {
    this.active = this.productTypeId
    this.getSpTypeTree()
    this.gettjData()
    this.getData()
  },
  methods: {
    async getSpTypeTree() {
      try {
        const tree = await getSortTree().then(res => res.data)
        this.nowArr = []
        this.nav = []
        this.productTypeId ? this.each(tree, 0) : (this.nowArr = tree)
      } catch (error) {}
    },
    async collect(item) {
      const params = {
        id: item.id,
        type: item.isComment == 1 ? 2 : 1
      }
      try {
        await switchCollectState(params)
        this.getData()
        this.getNewData()
      } catch (error) {}
    },
    async getData() {
      try {
        const param = this.productTypeId ? { productTypeId: this.productTypeId } : {}
        this.commoditys = await getCommoditys(param).then(res => res.data)
      } catch (error) {}
    },
    goDetail(item) {
      this.$router.push({ path: '/client/commodityDetails', query: { id: item.id } })
    },
    async gettjData() {
      try {
        this.tjcommoditys = await getTjCommoditys({}).then(res => res.data)
      } catch (error) {}
    },
    handleClick(tab) {
      this.$router.push({ path: '/client/allClass', query: { productTypeId: tab.name } })
    },
    each(tree, ind) {
      tree.forEach(item => {
        this.$set(this.nav, ind, item)
        if (item.id == this.productTypeId) {
          if (item.children?.length) {
            this.nowArr = item.children
          } else {
            this.nowArr = tree
          }
          this.nav = nav
        } else {
          if (item.children?.length) {
            this.each(item.children, ind + 1)
          }
        }
      })
    },
    comJump(item) {
      this.$router.push({ path: '/client/commodityDetails', query: { id: item.id } })
      this.getData()
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.breadcrumb {
  height: 40px;
  line-height: 40px;
  background-color: rgb(236, 235, 236);
  margin: 20px 0 0;
  padding: 0 20px;
}
.menu {
  height: 40px;
  line-height: 40px;
  margin: 20px 0;
  display: flex;
  .lable {
    font-size: 14px;
    background-color: rgb(236, 235, 236);
    padding: 0 20px;
    width: 250px;
  }
  .tab {
    background-color: #fff;
    flex: 1;
    padding: 0 30px;
  }
}
.content {
  flex: 1;
  display: flex;
  position: relative;
  .tj {
    width: 250px;
    height: 100%;
    box-shadow: 0 3px 12px rgb(98 107 181 / 25%);
    border-radius: 5px;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    .title {
      background-color: rgb(64, 158, 255);
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      box-shadow: 0 3px 12px rgb(98 107 181 / 25%);
    }
    .item-box {
      background-color: #fff;
      flex: 1;
      overflow: hidden;
      padding: 20px;
      padding-bottom: 9999px;
      .item {
        cursor: pointer;
        height: 80px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .price {
          color: rgb(237, 63, 20);
        }
      }
    }
  }
  .sp {
    margin-left: 300px;
    width: 100%;
    background-color: #fff;
    .commodits {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      padding: 20px;
    }
    .commodity-box {
      cursor: pointer;
      width: 200px;
      height: 200px;
      margin: 30px;
      background-color: #fff;
      border-radius: 5px;
      overflow: hidden;
      .pic {
        width: 100%;
        height: 130px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .info {
        padding: 5px 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .info1 {
        .name {
          width: 180px;
        }
        .icon {
          cursor: pointer;
        }
      }
      .info2 {
        .orPrice {
          color: #fd3f31;
          text-decoration: line-through;
        }
        .pps {
          width: 100px;
          text-align: right;
        }
      }
    }
    .commodity-box:hover {
      box-shadow: 0 0 16px rgb(0 0 0 /25%);
    }
  }
}
</style>
