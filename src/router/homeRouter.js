export default [
    //首页
    {
        path: '/home',
        name: 'home',
        component: () =>
            import ( /* webpackChunkName: "home" */ '../views/home/Home.vue'),
        meta: {
            group_name: "首页",
            menu_name: "home",
            file: "views/home/Home.vue",
        },
    },

    // 二级页面 - 终端课堂
    {
        path: '/home/multinport',
        name: 'homeMultinport',
        component: () =>
            import ( /* webpackChunkName: "homeMultinport" */ '../views/home/Multinport.vue'),
        meta: {
            group_name: "首页",
            menu_name: "Multinport",
            file: "views/home/Multinport.vue",
        },
    },
    // 二级页面 - 案例分享
    {
        path: '/home/example',
        name: 'homeExample',
        component: () =>
            import ( /* webpackChunkName: "homeExample" */ '../views/home/Example.vue'),
        meta: {
            group_name: "首页",
            menu_name: "Example",
            file: "views/home/Example.vue",
        },
    },
    // 三级页面 - 新闻详情
    {
        path: '/home/newsDetail',
        name: 'homeNewsDetail',
        component: () =>
            import ( /* webpackChunkName: "NewsDetail" */ '../views/home/NewsDetail.vue'),
        meta: {
            group_name: "首页",
            menu_name: "NewsDetail",
            file: "views/home/NewsDetail.vue",
        },
    },
]