<template>
  <div class="home">
    <div class="top-nav">
      <HeadNav></HeadNav>
    </div>
    <div class="client-home" v-if="$route.path == '/client/home'">
      <div class="menu-content">
        <div class="menu">
          <SideMenu></SideMenu>
        </div>
        <div class="content">
          <div class="content-box">
            <router-view></router-view>
          </div>
        </div>
      </div>
      <div class="bottom-home">
        <Home></Home>
      </div>
    </div>
    <div class="other-content" v-else>
      <div class="menu">
        <TopMenu></TopMenu>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
    <Chat></Chat>
  </div>
</template>

<script>
import HeadNav from './components/headNav'
import SideMenu from './components/sideMenu'
import TopMenu from './components/topMenu'
import Home from './components/home'
import Chat from '@/components/chat'
export default {
  name: 'home',
  components: { SideMenu, HeadNav, Home, TopMenu, Chat },
  data() {
    return {}
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
.home {
  height: 100vh;
  overflow: auto;
  background: url('@/assets/img/client-bj.png');
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  .top-nav {
    width: 100%;
    box-shadow: 0 3px 12px rgb(98 107 181 / 25%);
    height: 72px;
  }

  .client-home {
    flex: 1;
    overflow: auto;
    padding: 0 10%;
    .menu-content {
      flex: 1;
      overflow: hidden;
      display: flex;
      height: 25vw;
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
      width: 100%;
      box-sizing: border-box;
    }
  }
  .other-content {
    display: flex;
    flex-direction: column;
    padding: 30px 10% 0;
    overflow: auto;
    flex: 1;
    .content {
      flex: 1;
      margin-bottom: 30px;
    }
  }
}
</style>
