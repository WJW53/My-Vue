const store = {
    state: {
        studentList: [],
    },
    getters: {
        studentLength: state => state.studentList.length,
        studentJuveniles: state => state.studentList.filter(student => student.age < 18),
    },
    mutations: {

    },
    actions: {

    }
};

export default store;