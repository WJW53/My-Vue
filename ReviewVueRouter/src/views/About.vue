<template>
  <div class="about">
    关于
    <div id="a">aaaaaa</div>
    <router-link tag="div" class="link" to="/">回首页</router-link>
  </div>
</template>

<script>
export default {
  mounted() {
    // console.log(this.$route.params);
    // console.log(this.$route.meta);
  },
};
</script>

<style scoped>
.link{
  margin-top: 1000px;
}
#a{
  margin-top: 1000px;
}
</style>