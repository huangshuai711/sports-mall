<template>
  <div class="box">
    <div class="locNav" v-if="!productType">推荐商品</div>
    <div class="commodits">
      <div class="commodity-box" v-for="item in commoditys" :key="item.id" @click="goDetail(item)">
        <div class="pic"><img :src="item.sysFile?.filePath" alt="" /></div>
        <div class="info info1">
          <div class="name ellip">{{ item.productName }}</div>
          <span @click="collect(item)">
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
    <div class="locNav" v-if="!productType">新品上市</div>
    <div class="commodits" v-if="!productType">
      <div
        class="commodity-box"
        v-for="item in newCommoditys"
        :key="item.id"
        @click="goDetail(item)"
      >
        <div class="pic"><img :src="item.sysFile?.filePath" alt="" /></div>
        <div class="info info1">
          <div class="name ellip">{{ item.productName }}</div>
          <span @click="collect(item)">
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
</template>
<script>
import { getCommoditys, getTjCommoditys, switchCollectState, getNewCommoditys } from '@/api/client'
export default {
  data() {
    return {
      commoditys: [],
      newCommoditys: []
    }
  },
  computed: {
    productType() {
      return this.$store.getters.getProductType
    },
    searchValue() {
      return this.$store.getters?.getSearchText?.val || ''
    },
    searchTrigger() {
      return this.$store.getters?.getSearchText?.trigger || false
    },
    refresh() {
      const { productType, searchTrigger, name } = this
      return { productType, searchTrigger, name }
    }
  },
  watch: {
    refresh(val) {
      this.getData()
    }
  },
  created() {
    this.getData()
    this.getNewData()
  },
  methods: {
    async getData() {
      try {
        const param = this.productType ? { productTypeId: this.productType } : {}
        const inte = this.productType ? getCommoditys : getTjCommoditys
        this.commoditys = await inte(param).then(res => res.data)
      } catch (error) {}
    },
    async getNewData() {
      try {
        this.newCommoditys = await getNewCommoditys({}).then(res => res.data)
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
      } catch (error) {}
    },
    goDetail(item) {
      this.$router.push({ path: '/client/commodityDetails', query: { id: item.id } })
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  .locNav {
    background-color: rgb(224, 23, 39);
    height: 40px;
    line-height: 40px;
    color: #fff;
    margin-top: 10px;
    padding-left: 50px;
  }
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
    box-shadow: 0 3px 12px rgb(98 107 181 / 25%);
  }
}
</style>
