<template>
  <div id="app">
    <div class="nav-box">
      <!-- <div class="logo">渡一教育</div> -->
      <div class="logo" @click="handleClick">渡一教育</div>

      <!-- 这是声名式导航的方式,而我们本节要用编程式导航 -->
      <!-- <router-link to="/home" tag="div" class="logo">渡一教育</router-link> -->

      <div class="nav-list">
        <router-link to="/home">首页</router-link>
        <router-link to="/learn">课程学习</router-link>
        <router-link to="/student">学员展示</router-link>
        <router-link to="/about">关于</router-link>
        <router-link to="/activity">社区</router-link>
      </div>
    </div>
    <div class="container">
      <transition>
        <router-view></router-view>
      </transition>
      <!-- <router-view name="student"></router-view> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  methods: {
    handleClick() {
      //历史路径想象成一个数组,push每次都是添加到最后,
      //而replace是把每次当前的路径替换成要去的路径
      //可以用浏览器的倒退前进按钮测试测试,玩一玩

      // console.log(this.$router);
      // console.log(this.$route);
      //1. 实际上to跳转最终是转为push
      this.$router.push("/home"); //但是我们配置了全局,所以就不用catch了,显得麻烦
      // this.$router.push("/home").catch(err => {console.log(err);});//看我笔记,关于为什么写catch

      // console.log('ok');

      //2.
      // this.$router.replace("/home");

      //go
      //this.$router.go(1);//
    },
  },
};
</script>

<style scoped>
#app{
  overflow: hidden;
}
/* enter */
.v-enter{
  transform: translateX(1000px);
}
.v-enter-active{
  transition: all 0.3s;
}
.v-enter-to{
  transform: translateX(0);
}

.nav-box {
  display: flex;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;
  background-color: #3385ff;
}
.nav-box .logo {
  color: #fff;
  cursor: pointer;
}
.nav-list a {
  text-decoration: none;
  color: #fff;
  margin-left: 40px;
}

.nav-list a.router-link-active {
  font-weight: bold;
}

.container {
  margin-top: 60px;
}
.nav-box,
.container {
  padding-left: 200px;
  padding-right: 200px;
}
</style>