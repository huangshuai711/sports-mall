<template>
  <div class="box">
    <Exhibition ref="exhibition" :formArr="formArr" :data="data"></Exhibition>
    <Comment v-model="commentShow" :id="id"></Comment>
    <OrderNum ref="orderNum" v-model="orderNumShow" :id="id"></OrderNum>
    <div>
      <el-button size="mini" type="primary" @click="commentShow = true">查看评论</el-button>
      <el-button size="mini" type="primary" @click="addShopp">加入购物车</el-button>
      <el-button size="mini" type="primary" @click="placeOrder">下单</el-button>
      <el-button size="mini" type="primary" @click="back">返回</el-button>
    </div>
  </div>
</template>
<script>
import Exhibition from '@/components/exhibition'
import { getDetails } from '@/api/commodity'
import Comment from './components/comment.vue'
import OrderNum from './components/orderNum.vue'
export default {
  components: { Exhibition, Comment, OrderNum },
  data() {
    return {
      formArr: [
        { type: 'text', label: '商品名称', prop: 'productName' },
        { type: 'text', label: '品牌商', prop: 'brandingBusiness' },
        { type: 'img', label: '商品主图', prop: 'sysFilePath' },
        { type: 'imgs', label: '商品展示图', prop: 'sysFileListPath' },
        { type: 'text', label: '商品分类', prop: 'productType' },
        { type: 'text', label: '原价', prop: 'originalPrice' },
        { type: 'text', label: '促销价', prop: 'promotionPrice' }
      ],
      data: null,
      commentShow: false,
      orderNumShow: false
    }
  },
  watch: {},
  created() {
    this.getData()
  },
  computed: {
    id() {
      return this.$route.query.id
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    addShopp() {
      this.$refs.orderNum.title = '加入购物车'
      this.orderNumShow = true
    },
    placeOrder() {
      this.$refs.orderNum.title = '下单'
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
        this.$nextTick(() => {
          this.$refs.exhibition.echoData()
        })
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
}
::v-deep.el-dialog__wrapper {
  position: absolute !important;
}
::v-deep.v-modal {
  position: absolute !important;
}
</style>
