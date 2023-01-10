<template>
  <div class="box" v-if="data">
    <!-- <Comment ref="comment" v-model="commentShow" :id="id"></Comment> -->
    <OrderNum ref="orderNum" v-model="orderNumShow" :id="id"></OrderNum>
    <div class="info-box">
      <div class="spzt"><img :src="data.sysFilePath" alt="" /></div>
      <div class="r-info">
        <div class="name">{{ data.productName }}</div>
        <div class="price">
          价格：<span>￥{{ data.promotionPrice }}</span>
        </div>
        <div class="num">数量： <el-input-number v-model="num" :min="1"></el-input-number></div>
        <div class="info-btn">
          <el-button size="mini" type="primary" @click="addShopp">加入购物车</el-button>
          <el-button size="mini" type="primary" @click="collect(data)">{{
            data.isComment == 1 ? '取消收藏' : '收藏'
          }}</el-button>
          <el-button size="mini" type="primary" @click="placeOrder">下单</el-button>
          <el-button size="mini" type="primary" @click="back">返回</el-button>
        </div>
      </div>
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
      <div class="js-pl">
        <div class="js-pl-box">
          <el-tabs type="border-card" v-model="activeTab" @tab-click="tabClick">
            <el-tab-pane label="商品介绍" name="js"> </el-tab-pane>
            <el-tab-pane label="商品评价" name="pl"></el-tab-pane>
          </el-tabs>
          <div class="tab-cen">
            <div v-if="activeTab == 'js'">
              <div class="zt">
                <el-image :src="data.sysFilePath" :preview-src-list="[data.sysFilePath]">
                </el-image>
              </div>
              <div class="ft">
                <el-image
                  v-for="img in data.sysFileListPath"
                  :key="img"
                  :src="img"
                  :preview-src-list="data.sysFileListPath"
                >
                </el-image>
              </div>
            </div>
            <Comment v-if="activeTab == 'pl'" :comments="data?.commentDtoList"></Comment>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Exhibition from '@/components/exhibition'
import { getDetails } from '@/api/commodity'
import Comment from './components/comment.vue'
import OrderNum from './components/orderNum.vue'
import { getTjCommoditys, switchCollectState } from '@/api/client'
import Table from '@/components/table'
export default {
  components: { Exhibition, Comment, OrderNum, Table },
  data() {
    return {
      tableRow: [
        { key: 'username', label: '评论人' },
        { key: 'commentContent', label: '评论内容' },
        { key: 'commentDate', label: '评论时间' }
      ],
      data: null,
      commentShow: false,
      orderNumShow: false,
      num: 1,
      tjcommoditys: [],
      activeTab: 'js',
      id: ''
    }
  },
  watch: {},
  created() {
    this.id = this.$route.query.id
    this.getData()
    this.gettjData()
  },
  computed: {},
  methods: {
    tabClick(tab) {
      console.log(tab.name)
    },
    back() {
      this.$router.go(this.$route.query.id ? -1 : -2)
    },
    comJump(item) {
      this.$router.push({ path: '/client/commodityDetails', query: { id: item.id } })
    },
    addShopp() {
      this.$refs.orderNum.title = '加入购物车'
      this.$refs.orderNum.formRole.num = this.num

      this.orderNumShow = true
    },
    placeOrder() {
      this.$refs.orderNum.title = '下单'
      this.$refs.orderNum.formRole.num = this.num
      this.orderNumShow = true
    },
    async getData() {
      try {
        this.data = await getDetails(this.id).then(res => res.data)
        this.data.sysFilePath = this.data.sysFile.filePath
        this.data.sysFileListPath = []
        this.data.sysFileList?.forEach(item => {
          this.data.sysFileListPath.push(item.filePath)
        })
      } catch (error) {}
    },
    async gettjData() {
      try {
        this.tjcommoditys = await getTjCommoditys({}).then(res => res.data)
      } catch (error) {}
    },
    async collect(item) {
      const params = {
        id: item.id,
        type: item.isComment == 1 ? 2 : 1
      }
      try {
        const res = await switchCollectState(params)
        if (res?.code == 200) {
          this.$message.success(item.isComment == 1 ? '收藏成功' : '取消成功')
          this.getData()
        }
      } catch (error) {}
    },
    close() {
      this.$emit('shoChange', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  padding: 50px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .info-box {
    display: flex;
    .spzt {
      height: 300px;
      width: 300px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .r-info {
      flex: 1;
      line-height: 60px;
      margin-left: 25px;
      .name {
        font-size: 26px;
      }
      .price {
        span {
          color: rgb(237, 63, 20);
        }
      }
      .num {
        padding-bottom: 30px;
        border-bottom: 1px solid rgba($color: #666, $alpha: 0.3);
      }
      .info-btn {
        padding-left: 30px;
      }
    }
  }
  .content {
    margin-top: 50px;
    flex: 1;
    display: flex;
    position: relative;
    overflow: hidden;
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
    .js-pl {
      margin-left: 300px;
      flex: 1;
      .js-pl-box {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      ::v-deep .el-tabs__content {
        padding: 0;
      }
      .tab-cen {
        padding: 20px;
        overflow: auto;
        flex: 1;
        background-color: #fff;
        border: 1px solid #dcdfe6;
        box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
        .zt,
        .ft {
          margin-bottom: 30px;
          ::v-deep .el-image {
            margin-right: 20px;
            img {
              max-height: 500px;
              max-width: 500px;
            }
          }
        }
      }
    }
  }
}
::v-deep.el-dialog__wrapper {
  position: absolute !important;
}
::v-deep.v-modal {
  position: absolute !important;
}
</style>
