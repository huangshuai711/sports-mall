<template>
  <div class="box">
    <el-carousel trigger="click">
      <el-carousel-item v-for="item in imgArr" :key="item.id">
        <div class="img-box">
          <img :src="item.filePath" alt="" />
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import { getPictures } from '@/api/pictureManage'
export default {
  data() {
    return {
      imgArr: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getCarousel()
  },
  methods: {
    async getCarousel() {
      try {
        const res = await getPictures()
        this.imgArr = res.data
      } catch (error) {}
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  height: 100%;
  padding-left: 200px;
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
</style>
