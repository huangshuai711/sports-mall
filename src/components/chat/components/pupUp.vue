<template>
  <div class="jwchat__body wrapper">
    <JwChat-index
      :config="config"
      :taleList="list"
      @enter="bindEnter"
      v-model="inputMsg"
      :showRightBox="false"
      :toolConfig="toolConfig"
      scrollType="scroll"
      @clickTalk="talkEvent"
    >
    </JwChat-index>
  </div>
</template>

<script>
import { initTalk, robotDtoRecord, userChoose } from '@/api/system'
export default {
  components: {},
  data() {
    return {
      inputMsg: '',
      list: [],
      config: {
        img: require('@/assets/img/robot.jpg'),
        name: '机器人客服',
        callback: this.bindCover,
        historyConfig: {
          show: true,
          tip: '加载更多',
          callback: this.bindLoadHistory
        }
      },
      toolConfig: {
        // 现在只配置了 ["file", "video", "img", "hongbao", "more", "history"]
        show: [], // 二级数组中放自定义名称
        showEmoji: true, // 是否显示表情图标
        callback: function toolEvent(type, plyload) {
          console.log('tools', type, plyload)
        }
      },
      new_data: null
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo
    }
  },
  mounted() {
    this.getListArr()
  },
  methods: {
    async getListArr() {
      try {
        const res = await robotDtoRecord().then(res => res.data)
        res.reverse()
        if (res?.length && res[res.length - 1].isEnd == 0) {
          const list = []
          res.forEach(item => {
            list.push(this.setRobotDia(item.createTime, item.beforeWord))
            list.push(this.setMineDia(item.createTime, item.userChoose))
          })
          this.new_data = res[res.length - 1]
          this.list = list
        } else {
          const record = await initTalk().then(res => res.data)
          this.new_data = record
          this.list = [this.setRobotDia(record.createTime, record.initTalk)]
        }
      } catch (error) {}
    },
    setRobotDia(date, text) {
      const dialogue = {
        date: date || '',
        text: { text: text || '' },
        mine: false,
        name: '机器人客服',
        img: require('@/assets/img/robot.jpg')
      }
      return dialogue
    },
    setMineDia(date, text) {
      const dialogue = {
        date: date || '',
        text: { text: text || '' },
        mine: true,
        name: this.userInfo?.username,
        img: this.userInfo?.avatar
      }
      return dialogue
    },
    bindLoadHistory() {
      this.list = this.list
    },
    talkEvent(play) {
      console.log(play)
    },
    bindEnter(str) {
      const msg = this.inputMsg
      if (!msg) return
      const param = {
        beforeWordKey: this.new_data?.beforeWordKey || 5,
        beforeWord: this.new_data?.beforeWord || this.new_data?.initTalk || '',
        robotCode: this.new_data?.robotCode,
        userChoose: msg
      }
      userChoose(param).then(res => {
        this.getListArr()
      })
    },
    bindCover(event) {
      console.log('header', event)
    }
  }
}
</script>
<style lang="scss" scoped>
.jwchat__body {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
::v-deep .web__main-user {
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
<style scoped></style>
<style></style>
