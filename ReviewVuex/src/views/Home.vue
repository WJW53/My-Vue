<template>
  <div class="home">
    首页
    <br />
    <button @click="$store.state.count++">点击count+1</button>
    <!-- {{ $store.state.count }} -->
    {{ storeCount }}
  </div>
</template>

<script>
import { mapState } from "../../../77.扩展_Vuex_原理实现-辅助函数/src/vuex";
export default {
  data() {
    return {
      count: 100,
    };
  },
  computed: {
    // ...mapState(['count']),
    ...mapState({
      // storeCount:(state) => state.count + 10,
      storeCount: "count",
    }),
  },
  created() {
    console.log(this.$store.state.count);
  },
};
</script>