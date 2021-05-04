import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../page/home/index.vue'

Vue.use(VueRouter);



export  const ROUTE_PAGE = [
    { path: '/', redirect: '/index' },
    { path: '/index', component: Home },
    // { path: '/bar', component: Bar }
]



const router = new VueRouter({
    routes:ROUTE_PAGE // (缩写) 相当于 routes: routes
})

export default router;