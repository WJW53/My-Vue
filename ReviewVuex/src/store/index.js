import Vue from 'vue'
import Vuex from "vuex";
import count from "./modules/count";
import student from "./modules/student";

// import { COUNT_INCREMENT, CHANGE_OBJ, UPDATE_MSG } from "./mutation-types"
import { CHANGE_OBJ, UPDATE_MSG } from "./mutation-types"

Vue.use(Vuex);
const store = new Vuex.Store({
  // strict: true,
  strict: process.env.NODE_ENV !== "production",
  modules:{
    count,
    student
  },
  state: {
    // count: 0,
    // studentList: [],
    obj: {
      a: 1
    },
    msg: ""
  },
  getters: {
    // countDouble(state) {
    //   return state.count * 2;
    // },
    // // addCount(state){
    // //   return function(num){
    // //     return state.count + num;
    // //   }
    // // }
    // countAdd: state => num => state.count + num,
    // studentLength: state => state.studentList.length,
    // studentJuveniles: state => state.studentList.filter(student => student.age < 18),
  },
  mutations: {
    // [COUNT_INCREMENT](state, payload) {
    //   // setTimeout(() => {
    //   //   state.count++;
    //   // }, 1000);
    //   state.count += payload.amount;//变更状态
    // },
    [CHANGE_OBJ](state) {
      // state.obj.b = 10;//不能响应式才对啊,为啥我的响应式了呢?
      //是因为在新的Vuex版本中state中的数据可以这样搞?
      // state.obj = { ...state.obj, b: 10 };//可
      Vue.set(state.obj, 'b', 10);
      // this.$set(state.obj, 'b', 10);//不行,因为这里的this不是vue实例
    },
    [UPDATE_MSG](state, payload) {
      state.msg = payload.value;
    }
  },
  // actions: {
  //   countIncrement(context, payload) {//ACTION可以处理异步函数
  //     return new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         context.commit(COUNT_INCREMENT, payload);
  //         resolve();
  //       }, 1000);
  //     })
  //   }
  // }
});

export default store;