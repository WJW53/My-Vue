import { COUNT_INCREMENT } from "../mutation-types"
const store = {
    namespaced: true,
    state: {
        count: 0,
    },
    getters: {
        countDouble: (state, getters, rootState) => {
            // console.log(getters);
            // console.log(rootState);
            return state.count * 2;
        },
        countAdd: state => num => state.count + num,
    },
    mutations: {
        [COUNT_INCREMENT](state, payload) {
            state.count += payload.amount;//变更状态
        },
    },
    actions: {
        countIncrement(context, payload) {//ACTION可以处理异步函数
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    context.commit(COUNT_INCREMENT, payload);
                    resolve();
                }, 1000);
            })
        }
    }
};

export default store;