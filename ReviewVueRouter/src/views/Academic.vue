<template>
  <div>
    <ul v-if="questionList && questionList.length">
      <router-link
        tag="li"
        :to="{ name: 'question', params: { id: question.id } }"
        v-for="question in questionList"
        :key="question.id"
      >
        {{ question.title }}
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questionList: [],
    };
  },
  mounted() {
    //这个 / 直接就能匹配到这个question.json(她在public下啊)了啊?怎么回事儿,太凶了吧
    this.$axios.get("/question").then((res) => {
      this.questionList = res;
    });
  },
};
</script>

<style scoped>
li {
  margin-bottom: 15px;
  cursor: pointer;
}
li:hover {
  text-decoration: underline;
  color: #3385ff;
}
</style>