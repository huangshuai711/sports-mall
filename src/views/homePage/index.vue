<template>
  <div class="homePage">
    <el-carousel trigger="click">
      <el-carousel-item v-for="item in imgArr" :key="item.id">
        <div class="img-box">
          <img :src="item.filePath" alt="" />
        </div>
      </el-carousel-item>
    </el-carousel>
    <div ref="echart1" class="echart"></div>
    <div ref="echart2" class="echart"></div>
    <div ref="echart3" class="echart"></div>
  </div>
</template>

<script>
import { getPictures } from '@/api/pictureManage'
import { listComment, listProductSell, listSecondProductNumDto } from '@/api/homePage'
import * as echarts from 'echarts'
export default {
  name: 'homePage',
  data() {
    return {
      imgArr: []
    }
  },
  components: {},
  mounted() {
    this.getCarousel()
    this.getListComment()
    this.getListProductSell()
    this.getListSecondProductNumDto()
  },
  methods: {
    async getCarousel() {
      try {
        const res = await getPictures()
        this.imgArr = res.data
      } catch (error) {}
    },
    async getListComment() {
      try {
        const res = await listComment()
        const names = []
        const values = []
        res.data.forEach(item => {
          names.push(item.productName || '')
          values.push(item.countNum || 1)
        })
        this.$nextTick(() => {
          var myChart = echarts.init(this.$refs.echart1)
          myChart.setOption({
            title: {
              text: '商品收藏榜'
            },
            tooltip: {},
            xAxis: {
              data: names
            },
            yAxis: {},
            series: [
              {
                name: '收藏',
                type: 'bar',
                data: values
              }
            ]
          })
        })
      } catch (error) {}
    },
    async getListProductSell() {
      try {
        const res = await listProductSell()
        const names = []
        const values = []
        res.data.forEach(item => {
          names.push(item.productName || '')
          values.push(item.countNum || 1)
        })
        this.$nextTick(() => {
          var myChart = echarts.init(this.$refs.echart2)
          myChart.setOption({
            title: {
              text: '商品销量榜'
            },
            tooltip: {},
            xAxis: {
              data: names
            },
            yAxis: {},
            series: [
              {
                name: '销量',
                type: 'bar',
                data: values
              }
            ]
          })
        })
      } catch (error) {}
    },
    async getListSecondProductNumDto() {
      try {
        const res = await listSecondProductNumDto()
        const names = []
        const values = []
        res.data.forEach(item => {
          names.push(item.productType || '')
          values.push(item.countNum || 1)
        })
        this.$nextTick(() => {
          var myChart = echarts.init(this.$refs.echart3)
          myChart.setOption({
            title: {
              text: '商品二级销量榜'
            },
            tooltip: {},
            xAxis: {
              data: names
            },
            yAxis: {},
            series: [
              {
                name: '销量',
                type: 'bar',
                data: values
              }
            ]
          })
        })
      } catch (error) {}
    }
  }
}
</script>

<style lang="scss" scoped>
.homePage {
  height: 100%;
  overflow: auto;
}
::v-deep .el-carousel__container {
  height: auto;
}
::v-deep .el-carousel__container:before {
  content: ' ';
  display: block;
  padding-top: 40%;
}
::v-deep .el-carousel {
  position: relative;
  .img-box {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      margin: auto;
    }
  }
}
::v-deep .el-carousel__item:nth-child(n) {
  background-color: #99a9bf;
}
.echart {
  width: 600px;
  height: 500px;
  display: inline-block;
  margin: 30px 30px 30px 0;
}
</style>
