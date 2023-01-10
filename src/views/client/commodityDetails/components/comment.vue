<template>
  <div class="content-box">
    <!-- 一级评论 -->
    <div class="first" v-for="(item, index) in commentArr" :key="index">
      <div class="first-img">
        <img
          :src="
            item.avatar || 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          "
          alt=""
        />
      </div>
      <div class="first-content">
        <div class="name-time">
          <p class="first-username">{{ item.username }}</p>
          <p class="first-time">{{ item.commentDate }}</p>
        </div>

        <div class="comment-rete">
          <p class="first-comment">
            {{ item.commentContent }}
          </p>
          <el-rate disabled class="rete" v-model="item.commentStar" show-score> </el-rate>
        </div>
        <div class="num">购买数量：{{ item.commentStar }}</div>
      </div>
    </div>
    <!-- 暂无评论的空状态 -->
    <el-empty description="暂无评论" v-if="!comments?.length"></el-empty>
    <div class="pagination">
      <el-pagination
        background
        layout="total,  prev, pager, next, jumper"
        :total="comments?.length || 0"
        @current-change="currentPage"
        :current-page="page"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: ['comments'],
  data() {
    return {
      page: 1,
      show: false //暂无条件显示
    }
  },
  computed: {
    commentArr() {
      return this.splitArr(this.comments || [], 10)?.[this.page - 1] || []
    }
  },
  methods: {
    currentPage(val) {
      this.page = val
    },
    splitArr(ar, size = 1) {
      let index = 0
      let res = []
      while (index < ar.length) {
        let last = index + size < ar.length ? index + size : ar.length
        res.push(ar.slice(index, last))
        index += size
      }
      return res
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
.content-box {
  position: relative;
  box-sizing: border-box;
  padding-bottom: 52px;
  height: 100%;
  .first {
    display: flex;
    position: relative;
    padding: 10px 20px 20px;
    text-align: left;
    border-bottom: 1px solid rgba($color: #999, $alpha: 0.3);
    .first-img {
      text-align: center;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .first-content {
      flex: 1;
      .name-time {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
        line-height: 50px;
        .first-username {
          color: #504f4f;
          font-size: 18px;
        }
        .first-time {
          color: #767575;
          font-size: 14px;
        }
      }
      .comment-rete {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
        .first-comment {
          flex: 1;
          color: #504f4f;
          font-size: 18px;
        }
        .rete {
          width: 200px;
          text-align: right;
        }
      }
      .num {
        color: #767575;
        font-size: 14px;
      }
    }
  }
  .pagination {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 10px;
  }
}
</style>
