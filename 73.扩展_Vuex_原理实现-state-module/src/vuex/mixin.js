function vuexInit () {
  /**
   * @desc vuex 初始化函数
   */
  const options = this.$options;

  if(options.store) {//根实例上才有store
    // Vue 根实例
    this.$store = options.store;
  } else {
    // 非 根实例
    // 有父亲,并且父亲有$store这个属性,那就让当前这个vue实例拿到父亲的$store
    // 相当于就是从Vue根实例那里传下来的
    if(options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

export default function applyMixin (Vue) {
  /**
   * @desc 添加混入
   * @param { Vue } - Vue
   */
  Vue.mixin({
    beforeCreate: vuexInit
  });
}