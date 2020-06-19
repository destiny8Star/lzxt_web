import Vue from 'vue'
import VueRouter from 'vue-router'

import homeRouter from './router/homeRouter'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [{
            path: '*',
            name: '404',
            component: () =>
                import ( /* webpackChunkName: "404" */ "./views/NotFound.vue"),
            meta: {
                menu_name: "404",
                file: "views/NotFound.vue",
            }
        },
        {
            path: '/logon',
            name: 'logon',
            component: () =>
                import ( /* webpackChunkName: "logon" */ "./views/Logon.vue"),
            meta: {
                menu_name: "登陆",
                file: "views/Logon.vue",
            }
        },
        {
            path: '/',
            name: 'home',
            redirect: "/home",
            component: () =>
                import ( /* webpackChunkName: "home" */ "./views/home/Index.vue"),
            meta: {
                menu_name: "首页",
                file: "views/home/Index.vue",
            },
            children: [...homeRouter, ]
        },
        // {
        //     path: '/merchant',
        //     name: 'merchant',
        //     redirect:'/home',
        //     component: () => import(/* webpackChunkName: "Merchant" */ "./views/Merchant.vue"),
        //     children: [...storeRouter, ...homeRouter, ...billRouter, ...accountRouter, ...userRouter, ...contactRouter, ...marketingRouter, ...couponRouter, ...businessRouter, ...marketingActivityRouter]
        // },

    ]
})

/*
   路由守卫
*/
// router.beforeEach((to, from, next) => {
//     let pay_channel_type = Vue.ls.get(Vue.webConfig.pay_channel_type) //1：直连；2：拉卡拉

// });

export default router