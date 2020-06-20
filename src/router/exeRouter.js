export default [
    //首页
    {
        path: '/exercises/home',
        name: 'exercisesHome',
        component: () =>
            import ( /* webpackChunkName: "exercisesHome" */ '../views/exercises/ExercisesHome.vue'),
        meta: {
            group_name: "练习首页",
            menu_name: "exercisesHome",
            file: "views/exercises/ExercisesHome.vue",
        },
    },
    //首页-做练习
    {
        path: '/exercises/doWork',
        name: 'doWork',
        component: () =>
            import ( /* webpackChunkName: "doWork" */ '../views/exercises/DoWork.vue'),
        meta: {
            group_name: "首页练习",
            menu_name: "doWork",
            file: "views/exercises/DoWork.vue",
        },
    },
    //我的课程
    {
        path: '/exercises/myClass',
        name: 'myClass',
        component: () =>
            import ( /* webpackChunkName: "myClass" */ '../views/exercises/MyClass.vue'),
        meta: {
            group_name: "我的课程",
            menu_name: "myClass",
            file: "views/exercises/MyClass.vue",
        },
    },
    //我的练习
    {
        path: '/exercises/myExe',
        name: 'myExe',
        component: () =>
            import ( /* webpackChunkName: "myExe" */ '../views/exercises/MyExe.vue'),
        meta: {
            group_name: "我的练习",
            menu_name: "myExe",
            file: "views/exercises/MyExe.vue",
        },
    },
    //我的练习详情
    {
        path: '/exercises/myExe/myExeDetail',
        name: 'myExeDetail',
        component: () =>
            import ( /* webpackChunkName: "myExe" */ '../views/exercises/MyExeDetail.vue'),
        meta: {
            group_name: "练习详情",
            menu_name: "myExeDetail",
            file: "views/exercises/MyExeDetail.vue",
        },
    },
    //我的错题
    {
        path: '/exercises/error',
        name: 'error',
        component: () =>
            import ( /* webpackChunkName: "myExe" */ '../views/exercises/Error.vue'),
        meta: {
            group_name: "错题本",
            menu_name: "error",
            file: "views/exercises/Error.vue",
        },
    },
    //我的错题详情
    {
        path: '/exercises/error/errorDetail',
        name: 'errorDetail',
        component: () =>
            import ( /* webpackChunkName: "myExe" */ '../views/exercises/ErrorDetail.vue'),
        meta: {
            group_name: "错题详情",
            menu_name: "errorDetail",
            file: "views/exercises/ErrorDetail.vue",
        },
    },
    //订单管理
    {
        path: '/exercises/order',
        name: 'order',
        component: () =>
            import ( /* webpackChunkName: "myExe" */ '../views/exercises/Order.vue'),
        meta: {
            group_name: "订单管理",
            menu_name: "order",
            file: "/exercises/Order.vue",
        },
    },
    //个人信息
    {
        path: '/exercises/myInfo',
        name: 'myInfo',
        component: () =>
            import ( /* webpackChunkName: "myInfo" */ '../views/exercises/MyInfo.vue'),
        meta: {
            group_name: "个人信息",
            menu_name: "myInfo",
            file: "/exercises/MyInfo.vue",
        },
    },
]