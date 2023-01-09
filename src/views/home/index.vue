<template>
  <div class="home">
    <div class="top-nav">
      <HeadNav></HeadNav>
    </div>
    <div class="menu-content">
      <div class="menu">
        <SideMenu></SideMenu>
      </div>
      <div class="content">
        <div class="content-nav">
          <Tab></Tab>
        </div>
        <div class="content-box">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <Chat></Chat>
  </div>
</template>

<script>
import HeadNav from './components/headNav'
import SideMenu from './components/sideMenu'
import Tab from './components/tab'
import Chat from '@/components/chat'
export default {
  name: 'home',
  components: { SideMenu, Tab, HeadNav, Chat },
  data() {
    return {}
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
.home {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  .top-nav {
    width: 100%;
    background: #fff;
    box-shadow: 0 3px 12px rgb(98 107 181 / 25%);
    height: 72px;
  }
  .menu-content {
    flex: 1;
    overflow: hidden;
    display: flex;
    .menu {
      height: 100%;
      width: 350px;
      .el-menu-vertical-demo {
        height: 100%;
      }
    }
    .content {
      flex: 1;
      overflow: hidden;
      display: flex;
      padding: 10px;
      flex-direction: column;
      .content-nav {
        width: 100%;
      }
      .content-box {
        flex: 1;
        position: relative;
        overflow: hidden;
      }
    }
  }
}
</style>
