<template>
  <div class="home">
    首页
    <br />
    <!-- <button @click="$store.state.count++">点击count+1</button> -->
    <button @click="handleClick">点击</button>
    <!-- {{ $store.state.count }} -->

    <!-- 在state中因为要先.模块名再.变量名 -->
    <!-- {{ $store.state.count.count }}
    {{ $store.getters.countDouble }}
    {{ $store.getters.countAdd(3) }}
    {{ obj }} -->

    {{ storeCount }}
    {{ countDouble }} {{ $store.getters['count/countDouble'] }}
    {{ countAdd(3) }}
    {{ obj }}


    <!-- <input type="text" v-model="$store.state.msg" /> 报错的{{ msg }} -->
    <!-- <input type="text" :value="msg" @input="handleInput" /> {{ msg }} -->
    <input type="text" v-model="msg" /> {{ msg }}
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import {
  COUNT_INCREMENT,
  CHANGE_OBJ,
  UPDATE_MSG,
} from "@/store/mutation-types.js";

export default {
  data() {
    return {
      count: 100,
    };
  },
  methods: {
    handleInput(e) {
      this.$store.commit(UPDATE_MSG, { value: e.target.value });
    },
    handleClick() {
      const num = Math.floor(Math.random() * 10);
      // this.$store.commit("countIncrement", {
      //   amount: num,
      // }); //更推荐这样,因为这样我们能一眼知道这个函数是mutation
      // this.countIncrement();

      // this.$store.commit({
      //   type: COUNT_INCREMENT,
      //   amount: Math.floor(Math.random() * 10),
      // });

      this.$store.commit(CHANGE_OBJ);

      this.$store
        .dispatch("count/countIncrement", { amount: num })
        .then((data) => console.log("action结束啦"));
    },
    ...mapMutations([COUNT_INCREMENT]),
  },
  computed: {
    // ...mapState(['count']),
    ...mapState('count',{
      // storeCount:(state) => state.count + 10,
      storeCount: "count",
    }),
    ...mapState(["obj"]),
    // ...mapState(["obj","msg"]),
    ...mapGetters('count',["countAdd", "countDouble"]),//要加上count模块名了
    msg: {
      get() {
        return this.$store.state.msg;
      },
      set(value) {
        this.$store.commit(UPDATE_MSG, { value });
      },
    },
  },
  created() {
    // console.log(this.$store.state.count);//
  },
};
</script>