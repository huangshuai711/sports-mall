<template>
  <div class="jwchat__body wrapper">
    <JwChat-index
      :config="config"
      :taleList="list"
      @enter="bindEnter"
      v-model="inputMsg"
      :showRightBox="false"
      scrollType="scroll"
      @clickTalk="talkEvent"
    >
    </JwChat-index>
  </div>
</template>

<script>
const listData = [
  {
    date: '2020/05/20 23:19:07',
    text: { text: '起床不' },
    mine: false,
    name: '机器人客服',
    img: 'https://img1.baidu.com/it/u=2109725846,3376113789&fm=26&fmt=auto&gp=0.jpg'
  }
]
import { initTalk, robotDtoRecord, userChoose } from '@/api/system'
export default {
  components: {},
  data() {
    return {
      inputMsg: '',
      list: [],
      config: {
        img: 'https://img1.baidu.com/it/u=2109725846,3376113789&fm=26&fmt=auto&gp=0.jpg',
        name: '机器人客服',
        callback: this.bindCover,
        historyConfig: {
          show: true,
          tip: '加载更多',
          callback: this.bindLoadHistory
        }
      },
      new_data: null
    }
  },
  mounted() {
    this.getListArr()
  },
  methods: {
    async getListArr() {
      try {
        const res = await robotDtoRecord().then(res => res.data)
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
        img: 'https://img1.baidu.com/it/u=2109725846,3376113789&fm=26&fmt=auto&gp=0.jpg'
      }
      return dialogue
    },
    setMineDia(date, text) {
      const dialogue = {
        date: date || '',
        text: { text: text || '' },
        mine: true,
        name: '我',
        img: 'https://img1.baidu.com/it/u=2109725846,3376113789&fm=26&fmt=auto&gp=0.jpg'
      }
      return dialogue
    },
    bindLoadHistory() {
      const history = new Array(3).fill().map((i, j) => {
        return {
          date: '2020/05/20 23:19:07',
          text: { text: j + new Date() },
          mine: false,
          name: 'JwChat',
          img: 'https://img1.baidu.com/it/u=31094377,222380373&fm=26&fmt=auto&gp=0.jpg'
        }
      })
      let list = history.concat(this.list)
      this.list = list
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
<style scoped>
.rightSlot {
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex-direction: column;
}
</style>
<style>
.active {
  color: red;
}
.jwchat__body {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
