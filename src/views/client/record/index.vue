<template>
  <div class="commodits">
    <div class="commodity-info flex-col-box">
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
      <Pagination ref="page" :total="total" class="flex-bot" @refresh="getData"></Pagination>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/pagination'
import { getRecirds, removeViewRecord, switchCollectState } from '@/api/client'
export default {
  name: 'commodity-info',
  components: { Pagination },
  data() {
    return {
      commoditys: [],
      total: 0,
      queryParam: {}
    }
  },
  mounted() {
    this.getData()
  },
  computed: {
    searchValue() {
      return this.$store.getters?.getSearchText?.val || ''
    },
    searchTrigger() {
      return this.$store.getters?.getSearchText?.trigger || false
    }
  },
  watch: {
    searchTrigger(val) {
      this.getData()
    }
  },
  methods: {
    delete(row) {
      this.$confirm(`确认删除此商品？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeViewRecord(row.id).then(res => {
          if (res.code == 200) {
            this.getData()
            this.$message.success('删除成功')
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    async getData() {
      try {
        this.loading = true
        const paging = this.$refs.page.getPage()
        const res = await getRecirds({ productName: this.searchValue }, paging)
        this.commoditys = res.data.records
        this.total = res.data.total
        this.loading = false
      } catch (error) {}
    },
    async collect(item) {
      const params = {
        id: item.productId,
        type: item.isComment == 1 ? 2 : 1
      }
      try {
        await switchCollectState(params)
        this.getData()
      } catch (error) {}
    },
    goDetail(item) {
      this.$router.push({ path: '/client/commodityDetails', query: { id: item.productId } })
    }
  }
}
</script>
<style lang="scss" scoped>
.commodits {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  height: 100%;
  background-color: #fff;
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
.flex-col-box {
  padding: 30px;
  display: flex;
  flex-direction: column;
  height: 100%;
  .flex-fill {
    margin: 30px 0;
  }
  .flex-bot {
    margin-bottom: 30px;
    display: flex;
    justify-content: right;
  }
}
</style>
