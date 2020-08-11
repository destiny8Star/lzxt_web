<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item to="/exercises/myClass">我的课程</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner" v-loading="searchState">
                        <!-- <div class="home-title" >
                           <span class="home-title-t ly-title">初一历史（上）</span>
                        </div> -->
                         <el-card style="margin: 20px 0" v-for="(item,ind) in  list" :key="ind" >
                            <div class="item_top">
                                <div class="item_tit">
                                    {{item.courseName}}
                                </div>
                                <el-button type="primary" @click="toExe(item)" :disabled="item.status==2">进入</el-button>
                            </div>
                            <div class="item_bot">
                                <div class="col_tit" v-if="item.status == 1">状态：有效</div>
                                <div class="col_tit color-red" v-if="item.status == 2">状态：已过期</div>
                                <div class="col_time">购买时间：{{item.buyTime}}</div>
                                <div class="col_time">到期时间：{{item.expireTime}}</div>
                                <div class="col_num">练习次数：{{item.studyCount}}</div>
                            </div>
                        </el-card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Detail",
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data(){
            return {
                searchState:false,
                list:[],//数据列表
            }
        },
        methods: {
             //选择单元
                toExe(item){
                    console.log("item",item)
                   this.$router.push("choseUnit?id="+item.courseId+"&status="+item.status)
                },
            /**
             * 获取信息详情
             */
            getDetail() {
                //初始化列表
                this.searchState = true
                this.$axios.post('/course/myCourse').then(res => {
                    console.log("获取",res);
                    this.searchState = false;
                    this.list = res.data.result;
                })
                .catch((rej) => {
                    console.log("获取数据失败",rej)
                    this.searchState = false;
                    this.$message.error(rej.data.message||"网络异常")
                });
            },
          
        },
        beforeMount() {
            // 获取信息
            this.getDetail();
        },
    }
</script>

<style scoped>
    .el-date-editor--datetimerange {
        width: 240px!important;
        margin-top: 4px;
    }
   
    .card_inTit{
        font-size: 16px;
        margin-bottom: 10px;
    }
   
    .home-title .ly-title{
        font-size: 20px;
    }
    .el-breadcrumb__item {
    float: none;
    }
    .col_tit {
    color: #67c23a;
    margin-right: 20px;
    }
    .col_time {
    margin: 0 20px;
    }
    .col_num {
    color: #909399;
    }
    .item_tit {
    margin: 20px 0 ;
    font-size: 20px;
    }
    .item_top{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .item_bot{
        display: flex;
        align-items: center;
    }
    .color-red{
        color: crimson;
    }
</style>