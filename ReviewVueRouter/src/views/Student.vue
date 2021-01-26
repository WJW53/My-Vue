<template>
  <div class="student">学员展示</div>
</template>


<script>
export default {
  beforeRouteEnter(to, from, next) {
    // console.log("beforeRouterEnter");
    // console.log(this);
    next((vm) => {
      // console.log(vm.name);
    });
  },
  beforeRouteLeave(to, from, next) {
    // console.log("beforeRouteLeave");
    // console.log(this);
    next();
  },
  data() {
    return {
      name: "student",
    };
  },
};
</script>