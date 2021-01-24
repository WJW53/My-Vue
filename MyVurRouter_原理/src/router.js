import Vue from 'vue';
import VueRouter from "vue-router";
import Home from './views/Home';


//禁止全局路由错误处理打印，这个也是vue-router开发者给出的解决方案：
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);//捕获且不打印
}

Vue.use(VueRouter);

const routes = [
  {
    path: "/",/* webpackChunkName:'acdemic' */
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home,
    // alias: "/",//取一个别名,但是首页那个字不会应用到加粗样式了,这样用户体验还是稍欠,所以还是用重定向吧
  },
  {
    path: "/learn",
    component: () => import("./views/Learn")
  }, {
    path: "/student",
    component: () => import("./views/Student")
  },
  {
    path: "/about",
    component: () => import("./views/About")
  },
  {
    path: '/activity',
    component: () => import(/* webpackChunkName:'academic' */'./views/Activity'),
    //重定向的三种写法
    // redirect:"/activity/academic",
    // redirect:{name:"academic"},
    redirect(to) {
      // console.log(to);//activity的路由信息
      return {
        name: "academic"
      }
    },
    children: [
      // {
      //   path: "",//使用重定向的话就不要配置这个空路径了
      //   component: () => import("./views/Academic")
      // },
      {
        path: "academic",
        name: "academic",
        component: () => import(/* webpackChunkName:'academic' */"./views/Academic")
      },
      {
        path: "personal",
        name: "personal",
        component: () => import("./views/Personal")
      },
      {
        path: "download",
        name: "download",
        component: () => import("./views/Download")
      },
    ]
  },
  {
    path: "/course/:userId",//一定要用:开头,后面的名字语义化就行,这样就可以动态路径了
    component: () => import("./views/About"),
    // children: [
    //   {
    //     path: "331578",
    //     component: () => import("./views/About")
    //   },
    //   {
    //     path: "552211",
    //     component: () => import("./views/About")
    //   },
    // ]
  },
  {
    path: "/question/:id",
    name: "question",
    component: () => import("./views/Question")
  }
];

export default new VueRouter({
  mode: "history",
  routes,
  // linkActiveClass: 'link-active',
  // linkExactActiveClass: 'link-exact-active',
});