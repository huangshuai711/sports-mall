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
          <!-- <Tab></Tab> -->
        </div>
        <div class="content-box">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <div class="bottom-home" v-if="$route.path == '/client/home'">
      <Home></Home>
    </div>
  </div>
</template>

<script>
import HeadNav from './components/headNav'
import SideMenu from './components/sideMenu'
import Home from './components/home'
export default {
  name: 'home',
  components: { SideMenu, HeadNav, Home },
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
  background: url('@/assets/img/client-bj.png');
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  .top-nav {
    width: 100%;
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
  .bottom-home {
    height: 35.4%;
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
