<template>
  <img
    class="icon"
    v-if="iconKey[type]?.type == 'img'"
    :src="iconKey[type]?.value"
    alt=""
    :style="{ width, height }"
  />
  <img class="icon" v-else :src="iconKey[type]?.value" alt="" :style="{ width, height }" />
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'home'
    },
    width: {
      type: String,
      default: '18px'
    },
    height: {
      type: String,
      default: '18px'
    }
  },
  data() {
    return {
      iconKey: {
        home: { type: 'img', value: require('@/assets/icon/home.png') },
        collYes: { type: 'img', value: require('@/assets/icon/collect-yes.png') },
        collNo: { type: 'img', value: require('@/assets/icon/collect-no.png') },
        user: { type: 'img', value: require('@/assets/icon/用户.png') },
        colle: { type: 'img', value: require('@/assets/icon/收藏.png') },
        commodity: { type: 'img', value: require('@/assets/icon/商品.png') },
        shopCart: { type: 'img', value: require('@/assets/icon/购物车.png') },
        remove: { type: 'img', value: require('@/assets/icon/删除.png') }
      }
    }
  },
  computed: {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.icon {
  position: relative;
  padding: 0 5px;
  vertical-align: text-top;
}
</style>
