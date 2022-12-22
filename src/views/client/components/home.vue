<template>
  <div class="box">
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
</template>
<script>
import { getCommoditys, switchCollectState } from '@/api/client'
export default {
  data() {
    return {
      commoditys: []
    }
  },
  computed: {
    productType() {
      return this.$store.getters.getProductType
    },
    searchValue() {
      return this.$store.getters.getSearchText
    },
    refresh() {
      const { productType, searchValue, name } = this
      return { productType, searchValue, name }
    }
  },
  watch: {
    refresh(val) {
      this.getData()
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        const param = this.productType ? { productTypeId: this.productType } : { isRecommend: 1 }
        param.productName = this.searchValue
        this.commoditys = await getCommoditys(param).then(res => res.data)
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
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
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
