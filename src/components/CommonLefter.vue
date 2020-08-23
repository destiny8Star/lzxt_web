<template>
    <div class="first-nav" id="first-nav" v-bind:style="{height: (getWinHeight-60)+'px' }">
        <div class="first-nav-main">
            <el-row class="tac">
                <el-col>
                    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen"
                             @close="handleClose" :unique-opened="false" :router="uniqueOpened"
                             :default-openeds="defaultOpeneds">
                        <template v-for="navItem in navData">
                            <el-menu-item   v-if="!navItem.children && navItem.url==='#'"   class="special-item">
                                <template slot="title" >
                                    <span >{{navItem.name}}</span>
                                </template>
                            </el-menu-item>
                            <el-menu-item :index="navItem.url" v-else-if="!navItem.children && navItem.url!=='#'" >
                                <template slot="title">
                                    <img :src="require(`../assets/imgs/${navItem.ico_url}`)" class="title-icon-svg">
                                    <span>{{navItem.name}}</span>
                                </template>
                            </el-menu-item>
                            <el-submenu :index="navItem.depth+'-'+navItem.id" v-else>
                                <template slot="title">
                                    <img :src="require(`../assets/imgs/${navItem.ico_url}`)" class="title-icon-svg">
                                    <span>{{navItem.name}}</span>
                                </template>
                                <template v-for="childItem in navItem.children">
                                    <el-menu-item :index="childItem.url" v-if="!childItem.children">{{childItem.name}}
                                    </el-menu-item>
                                    <el-submenu :index="childItem.depth+'-'+childItem.id" v-else>
                                        <template slot="title">{{childItem.name}}</template>
                                        <el-menu-item :index="childChildItem.url"
                                                      v-for="childChildItem in childItem.children">
                                            {{childChildItem.name}}
                                        </el-menu-item>
                                    </el-submenu>
                                </template>
                            </el-submenu>
                        </template>
                    </el-menu>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import ico_sc from '../assets/img/sc.svg'
    import ico_mp from '../assets/img/mp.svg'

    export default {
        name: "CommonLefter",
        data: function () {
            return {
                uniqueOpened: true,
               navData: [
                    {
                        "id": 1,
                        "menu_order": 0,
                        "depth": 1,
                        "parent_id": 0,
                        "name": "在线学习 ",
                        "url": "/exercises/home",
                        "menu_type": 1,
                        "ico_url": "4-2ico1.png",
                    },
                    {
                        "id": 2,
                        "menu_order": 1,
                        "depth": 1,
                        "parent_id": 0,
                        "name": "我的课程",
                        "url": "/exercises/myClass",
                        "menu_type": 1,
                        "ico_url": "4-2ico2.png",
                    },
                    {
                        "id": 5,
                        "menu_order": 1,
                        "depth": 1,
                        "parent_id": 0,
                        "name": "我的学习",
                        "url": "/exercises/myExe",
                        "menu_type": 1,
                        "ico_url": "4-2ico3.png",
                       
                    },
                    {
                        "id": 20,
                        "menu_order": 0,
                        "depth": 1,
                        "parent_id": 0,
                        "name": " 错 题 本 ",
                        "url": "/exercises/error/errorDetail",
                        "menu_type": 1,
                        "ico_url": "4-2ico4.png",
                       
                    },
                    {
                        "id": 12,
                        "menu_order": 1,
                        "depth": 1,
                        "parent_id": 0,
                        "name": "订单管理",
                        "url": "/exercises/order",
                        "menu_type": 1,
                        "ico_url": "4-2ico5.png"
                    },
                ],
                defaultOpeneds: [],
            }
        },
        //计算属性，可缓存值，没有变化不会重新计算结果
        computed: {
            getWinHeight() {
                return this.$winHeight;
            }
        },
        mounted: function () {
            
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>
<style type="text/css" scoped>
    .special-item{background: #108ee9;font-size: 18px;font-weight: bold;}
    .special-item span{color:#ffffff; }
    .special-item:hover{background: #108ee9;}
    .special-item:focus{background: #108ee9;}
    .el-menu-item.is-active{
        background: #fcde7b;
    }
    .first-nav .el-menu-item {
        height:60px;
        line-height: 55px;
        text-align: center;
        font-size: 20px;
    }
</style>