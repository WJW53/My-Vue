import Vue from 'vue';
import VueRouter from "vue-router";
import Home from './views/Home';
import auth from "./util/auth"


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
    // component: () => import("./views/Learn"),
    components: {
      default: () => import("./views/Learn"),
      student: () => import("./views/Student")
    },

  }, {
    path: "/student",
    component: () => import("./views/Student")
  },
  {
    path: "/about",
    component: () => import("./views/About"),
    beforeEnter: (to, from, next) => {
      // console.log('beforeEnter');
      next();
    },
    meta: {
      a: 1,
      requiresLogin: true,
      backAsk: true,
    }
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
    meta: {
      requiresLogin: true,
      backAsk: true,
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
    component: () => import("./views/Question"),
    // props: {//静态的,不常用
    //   id: 90878976
    // }
    // props: true,
    props: (route) => ({
      name: route.name,
      id: route.params.id,
    }),
  },
  {
    path: "/login",
    component: () => import("./views/Login")
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
  // linkActiveClass: 'link-active',
  // linkExactActiveClass: 'link-exact-active',
  scrollBehavior(to, from, savedPosition) {
    // console.log(savedPosition);
    if (savedPosition) {
      return savedPosition;
    } else {
      if (to.hash) {
        return { selector: to.hash }
      } else {
        return { x: 0, y: 0 };
      }
    }
  }
});
router.onError(err => {
  console.log("error:" + err.message);
})
router.beforeEach((to, from, next) => {
  // console.log(to.meta.requiresLogin);

  //先验证祖先路径的meta
  const isRequiresLogin = to.matched.some(item => item.meta.requiresLogin === true);
  if (isRequiresLogin) {
    const isLogin = auth.isLogin();//cookie是key=value的形式
    if (isLogin) {
      next();//已经登陆过
    } else {
      const isToLogin = window.confirm("登录后才可以浏览，需要登录吗？");
      isToLogin ? next("/login") : next(false);
    }
  } else {
    next();
  }

  //const isBackAsk = from.meta.backAsk;

  // console.log('beforeEach');
  // // console.log('xxx');
  // console.log(to);
  // console.log(from);
  // next();
  // //next(false);

  // if(to.path === '/student'){
  //   next('/about');//相当于是this.$router.push('/about');
  // }else{
  //   next();
  // }

  // next(new Error('无法跳转'));
  // console.log('ok');
});

router.beforeResolve((to, from, next) => {
  // console.log('beforeResolve');
  next();
});
router.afterEach((to, from) => {
  // console.log('afterEach');
  // next();//error:next is not defined
})

export default router;