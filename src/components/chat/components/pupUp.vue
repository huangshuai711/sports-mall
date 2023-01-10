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
    <OrderDetails ref="detail" v-model="detailsShow"></OrderDetails>
  </div>
</template>

<script>
import { initTalk, robotDtoRecord, userChoose } from '@/api/system'
import OrderDetails from '@/views/order/components/details.vue'
import { getOrderDetail } from '@/api/order'
export default {
  components: { OrderDetails },
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
      new_data: null,
      detailsShow: false
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
            if (item.userChoose) {
              list.push(this.setMineDia(item.createTime, item.userChoose))
            }
          })
          this.new_data = res[res.length - 1]
          this.list = list
        } else {
          await initTalk()
          this.setRecord()
        }
      } catch (error) {}
    },
    async setRecord() {
      const res = await robotDtoRecord().then(res => res.data)
      res.reverse()
      const list = []
      res.forEach(item => {
        list.push(this.setRobotDia(item.createTime, item.beforeWord))
        if (item.userChoose) {
          list.push(this.setMineDia(item.createTime, item.userChoose))
        }
      })
      this.new_data = res[res.length - 1]
      this.list = list
      return
    },
    setRobotDia(date, text) {
      const dialogue = {
        date: date || '',
        text: { text: this.handleText(text) },
        mine: false,
        name: '机器人客服',
        img: require('@/assets/img/robot.jpg')
      }
      return dialogue
    },
    handleText(text) {
      if (!text) {
        return ''
      } else if (text.substr(0, 4) == 'http') {
        const keyVal = {}
        text
          .split('?')[1]
          ?.split('&')
          ?.forEach(item => {
            this.$set(keyVal, item.split('=')[0], item.split('=')[1])
          })
        // && keyVal.type == 'orderDetails'
        if (keyVal.type && keyVal.type == 'details') {
          return `<span class="link" type="${keyVal.type}" id="${keyVal.id}">查看订单详情<span>`
        } else {
          return `<a class="link" href="${text}" target="_blank">${text}<a>`
        }
      } else {
        return text
      }
    },
    setMineDia(date, text) {
      const dialogue = {
        date: date || '',
        text: { text: this.handleText(text) },
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
      console.log(play, 'play')
      if (play.data.indexOf('details') != -1) {
        const params = {}
        var re = /([^ ]+)=\s*(['"]?[^ '"]+['"]?)/g
        let match = []
        while ((match = re.exec(play.data))) {
          params[match[1]] = JSON.parse(match[2])
        }
        this.goOrderDetails(params)
      }
    },
    async goOrderDetails(row) {
      try {
        const info = await getOrderDetail(row.id).then(res => res.data)
        const detailsInfo = { ...info, ...info.orderProduct }
        detailsInfo.sysFilePath = detailsInfo?.sysFile?.filePath
        detailsInfo.sysFileListPath = detailsInfo?.sysFileList?.map(item => item.filePath)
        this.$refs.detail.data = detailsInfo
        this.detailsShow = true
      } catch (error) {}
    },
    bindEnter(str) {
      const msg = this.inputMsg
      if (!msg) return
      const param = {
        id: this.new_data?.id,
        beforeWordKey: this.new_data?.beforeWordKey || 5,
        beforeWord: this.new_data?.beforeWord || this.new_data?.initTalk || '',
        robotCode: this.new_data?.robotCode || '5',
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
::v-deep .link {
  cursor: pointer;
  color: rgb(64, 158, 255) !important;
}
</style>
<style scoped></style>
<style></style>
