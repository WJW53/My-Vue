export default {
  functional: true,//函数式组件
  render (h, { parent }) {
    const routeMap = parent.$router.routeMap;
    const path = parent.$route.path;
    return h(routeMap[path]);
  }
};