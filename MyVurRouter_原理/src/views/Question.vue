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
  data() {
    return {
      question: null,
    };
  },
  mounted() {
    // console.log(this.$route.params);
    // this.getData();
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
      const { name } = this.$route; //如果我们不知道name是多少的话
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
      const { id } = this.$route.params;
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