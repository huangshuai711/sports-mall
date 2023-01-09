<template>
  <div class="homePage">
    <div class="nav">
      <div
        class="nav-box"
        v-for="item in typeArr"
        :key="item.key"
        :style="{ 'background-color': item.color }"
      >
        <Icon :type="item.icon" width="80px" height="80px"></Icon>
        <div class="info">
          <div class="title">{{ item.name }}</div>
          <div class="num">{{ dataAnalyse?.[item.key] }}</div>
        </div>
      </div>
    </div>
    <div>
      <div ref="echart111" class="echart"></div>
      <div ref="echart1" class="echart"></div>
      <div ref="echart11" class="echart"></div>
    </div>
    <div>
      <div ref="echart222" class="echart"></div>
      <div ref="echart2" class="echart"></div>
      <div ref="echart22" class="echart"></div>
    </div>
    <div>
      <div ref="echart333" class="echart"></div>
      <div ref="echart3" class="echart"></div>
      <div ref="echart33" class="echart"></div>
    </div>
  </div>
</template>

<script>
import {
  listComment,
  listProductSell,
  listSecondProductNumDto,
  getDataAnalyse
} from '@/api/homePage'
import * as echarts from 'echarts'
export default {
  name: 'homePage',
  data() {
    return {
      typeArr: [
        { name: '商品总数', icon: 'commodity', key: 'productNum', color: 'rgb(0, 206, 209)' },
        { name: '用户总数', icon: 'user', key: 'userNum', color: 'rgb(255,127,80)' },
        { name: '今日订单', icon: 'shopCart', key: 'orderNum', color: 'rgb(50,205,50)' },
        { name: '好评数', icon: 'colle', key: 'goodNum', color: 'rgb(255,215,0)' }
      ],
      dataAnalyse: null
    }
  },
  components: {},
  mounted() {
    this.getListComment()
    this.getListProductSell()
    this.getListSecondProductNumDto()
    this.getDataAnalyses()
  },
  methods: {
    async getDataAnalyses() {
      try {
        const res = await getDataAnalyse()
        this.dataAnalyse = res.data
      } catch (error) {}
    },
    async getListComment() {
      try {
        const res = await listComment()
        const names = []
        const values = []
        const data = []
        res.data.forEach(item => {
          names.push(item.productName || '')
          values.push(item.countNum || 0)
          data.push({ value: item.countNum || 0, name: item.productName || '' })
        })
        this.$nextTick(() => {
          var myChart = echarts.init(this.$refs.echart1)
          var myChart2 = echarts.init(this.$refs.echart11)
          var myChart3 = echarts.init(this.$refs.echart111)
          myChart3.setOption({
            title: {
              text: '商品收藏榜'
            },
            legend: {
              top: 'bottom'
            },
            toolbox: {
              show: true,
              feature: {
                saveAsImage: { show: true }
              }
            },
            series: [
              {
                name: 'Nightingale Chart',
                type: 'pie',
                radius: [50, 180],
                center: ['50%', '38%'],
                roseType: 'area',
                itemStyle: {
                  borderRadius: 8,
                  normal: {
                    labelLine: {
                      length: 10
                    }
                  }
                },
                data: data
              }
            ]
          })
          myChart.setOption({
            grid: {
              bottom: '0%',
              containLabel: true
            },
            toolbox: {
              show: true,
              feature: {
                saveAsImage: { show: true }
              }
            },
            tooltip: {},
            xAxis: {
              data: names,
              axisLabel: {
                rotate: names.length > 3 ? 30 : 0,
                formatter: function (value) {
                  if (value.length > 6) {
                    return `${value.slice(0, 6)}...`
                  } else {
                    return value
                  }
                }
              }
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
          myChart2.setOption({
            toolbox: {
              show: true,
              feature: {
                saveAsImage: { show: true }
              }
            },
            xAxis: {
              type: 'category',
              data: names,
              axisLabel: {
                rotate: names.length > 3 ? 30 : 0,
                formatter: function (value) {
                  if (value.length > 6) {
                    return `${value.slice(0, 6)}...`
                  } else {
                    return value
                  }
                }
              }
            },
            grid: {
              bottom: '0%',
              containLabel: true
            },
            tooltip: {},
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: values,
                type: 'line'
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
        const data = []
        res.data.forEach(item => {
          names.push(item.productName || '')
          values.push(item.countNum || 0)
          data.push({ value: item.countNum || 0, name: item.productName || '' })
        })
        this.$nextTick(() => {
          var myChart = echarts.init(this.$refs.echart2)
          var myChart2 = echarts.init(this.$refs.echart22)
          var myChart3 = echarts.init(this.$refs.echart222)
          myChart3.setOption({
            title: {
              text: '商品销量榜'
            },

            legend: {
              top: 'bottom'
            },
            toolbox: {
              show: true,
              feature: {
                saveAsImage: { show: true }
              }
            },
            series: [
              {
                name: 'Nightingale Chart',
                type: 'pie',
                radius: [50, 180],
                center: ['50%', '38%'],
                roseType: 'area',
                itemStyle: {
                  borderRadius: 8,
                  normal: {
                    labelLine: {
                      length: 10
                    }
                  }
                },
                data: data
              }
            ]
          })
          myChart.setOption({
            toolbox: {
              show: true,
              feature: {
                saveAsImage: { show: true }
              }
            },
            tooltip: {},
            xAxis: {
              data: names,
              axisLabel: {
                rotate: names.length > 3 ? 30 : 0,
                formatter: function (value) {
                  if (value.length > 6) {
                    return `${value.slice(0, 6)}...`
                  } else {
                    return value
                  }
                }
              }
            },
            grid: {
              bottom: '0%',
              containLabel: true
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
          myChart2.setOption({
            toolbox: {
              show: true,
              feature: {
                saveAsImage: { show: true }
              }
            },
            xAxis: {
              type: 'category',
              data: names,
              axisLabel: {
                rotate: names.length > 3 ? 30 : 0,
                formatter: function (value) {
                  if (value.length > 6) {
                    return `${value.slice(0, 6)}...`
                  } else {
                    return value
                  }
                }
              }
            },
            grid: {
              bottom: '0%',
              containLabel: true
            },
            tooltip: {},
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: values,
                type: 'line'
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
        const data = []
        res.data.forEach(item => {
          names.push(item.productType || '')
          values.push(item.countNumPercent || 0)
          data.push({ value: item.countNumPercent || 0, name: item.productType || '' })
        })
        this.$nextTick(() => {
          var myChart = echarts.init(this.$refs.echart3)
          var myChart2 = echarts.init(this.$refs.echart33)
          var myChart3 = echarts.init(this.$refs.echart333)
          myChart3.setOption({
            title: {
              text: '商品二级销量榜'
            },
            legend: {
              top: 'bottom'
            },
            toolbox: {
              show: true,
              feature: {
                saveAsImage: { show: true }
              }
            },
            series: [
              {
                name: 'Nightingale Chart',
                type: 'pie',
                radius: [50, 180],
                center: ['50%', '38%'],
                roseType: 'area',
                itemStyle: {
                  borderRadius: 8,
                  normal: {
                    labelLine: {
                      length: 10
                    }
                  }
                },
                data: data
              }
            ]
          })
          myChart.setOption({
            toolbox: {
              show: true,
              feature: {
                saveAsImage: { show: true }
              }
            },
            tooltip: {},
            xAxis: {
              data: names,
              axisLabel: {
                rotate: names.length > 3 ? 30 : 0,
                formatter: function (value) {
                  if (value.length > 6) {
                    return `${value.slice(0, 6)}...`
                  } else {
                    return value
                  }
                }
              }
            },
            grid: {
              bottom: '0%',
              containLabel: true
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
          myChart2.setOption({
            toolbox: {
              show: true,
              feature: {
                saveAsImage: { show: true }
              }
            },
            xAxis: {
              type: 'category',
              data: names,
              axisLabel: {
                rotate: names.length > 3 ? 30 : 0,
                formatter: function (value) {
                  if (value.length > 6) {
                    return `${value.slice(0, 6)}...`
                  } else {
                    return value
                  }
                }
              }
            },
            grid: {
              bottom: '0%',
              containLabel: true
            },
            tooltip: {},
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: values,
                type: 'line'
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
.nav {
  display: flex;
  .nav-box {
    cursor: pointer;
    padding: 0 20px;
    box-sizing: border-box;
    height: 110px;
    width: 300px;
    border-radius: 5px;
    margin-right: 20px;
    box-shadow: 0 3px 12px rgb(98 107 181 / 25%);
    display: flex;
    align-items: center;
    .info {
      flex: 1;
      line-height: 40px;
      text-align: center;
      font-size: 22px;
      color: #fff;
    }
  }
}
</style>
