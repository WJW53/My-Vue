<template>
  <div class="question" v-if="question">
    <div class="main">问题：{{ question.title }}</div>
    <div class="other">
      <!-- <div v-for="type in ['prev', 'next']" :key="type" :class="type"> -->
      <div
        v-for="other in otherQuestionList"
        :key="other.id"
        :class="other.type"
        @click="handleClick(other.id)"
      >
        {{ other.title }}
      </div>
      <!-- <div class="prev" :title="question.prev">{{ question.prev }}</div>
      <div class="next" :title="question.next">{{ question.next }}</div> -->
    </div>
  </div>
</template>


<script>
export default {
  beforeRouteUpdate(to, from, next) {
    // console.log("beforeRouteUpdate");
    // console.log(this);
    next();
  },
  // beforeRouteLeave(to, from, next) {
  //   const isLeave = window.confirm("真的要走吗，不再看看了？");
  //   isLeave ? next() : next(false);
  // },
  props: {
    id: {
      type: [String, Number],
    },
    name: {
      type: String,
      default: "question",
    },
  },
  data() {
    return {
      question: null,
    };
  },
  mounted() {
    // console.log(this.$route.params);
    // this.getData();
    // console.log(this.id);
    // console.log(this.name);
  },
  computed: {
    otherQuestionList() {
      const arr = [];
      if (this.question.prev) {
        const { prev, prevId } = this.question;
        arr.push({
          type: "prev",
          title: prev,
          id: prevId,
        });
      }
      if (this.question.next) {
        const { next, nextId } = this.question;
        arr.push({
          type: "next",
          title: next,
          id: nextId,
        });
      }
      //   console.log(arr);
      return arr;
    },
  },
  methods: {
    handleClick(id) {
      // const { name } = this.$route; //如果我们不知道name是多少的话
      const { name } = this;
      this.$router.push({
        // name: "question",
        name,
        params: {
          id,
        },
      });
    },
    getData() {
      //所以把这个获取数据封装成一个函数,当侦听器变化时,重新获取数据即可
      // const { id } = this.$route.params;

      const { id } = this; //解耦,不用你从$route中给我了,我利用props了
      // console.log(typeof id, id);
      this.$axios.get(`/question/${id}`).then((res) => {
        this.question = res;
      });
    },
  },
  watch: {
    $route: {
      handler() {
        //   console.log('watch');
        this.getData();
      },
      immediate: true, //这样就不用在mounted中第一次getData()了,因为效果一样
    },
  },
};
</script>


<style scoped>
.main {
  margin-bottom: 200px;
}
.prev {
  float: left;
}
.next {
  float: right;
}
.prev,
.next {
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #3385ff;
  text-decoration: underline;
  cursor: pointer;
}
</style>