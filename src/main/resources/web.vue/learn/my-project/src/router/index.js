import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Home from '../components/Home';
import List from '../components/List';
import Error404 from "../components/Error404";
import Detail from "../components/Detail";
const routes = [  //匹配规则从上到下
    {
        path:'/',
        redirect:'/home'
    },
    {
        path: '/home',
        name: "Home",
        component: Home
    },
    {
        path: "/list",
        name: 'list',
        component: List
    },
    {
        path: "/detail/:qqq/:www",
        name: 'detail',
        component: Detail
    },
    {
        path:'/404',
        component:Error404
    },
    {
        path:'/*',
        redirect: "/404"
    }
];

const router = new VueRouter({
    mode: 'hash',  // #
    // mode: 'history',  // 正常路径  https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90
    routes: routes,
    linkActiveClass: 'router-link-active', //默认值
    linkExactActiveClass: 'router-link-active-class' //默认值
    }
);
router.beforeEach((to,from,next) => {
    next();
})
export default router;
