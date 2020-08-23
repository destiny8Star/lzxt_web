<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <!-- <div class="third-nav-t">首页</div> -->
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item to="/exercises/home">首页</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner" :loading="searchState">
                        <div class="industryBox">
                            <!-- 搜索条件 start -->
                            <el-menu :default-active="tabIndex"  mode="horizontal" @select="tabSelect">
                                <el-menu-item v-for="(ele,i) in tabList" :key="i" style="font-size:22px"
                                 :index="ele.value">{{ele.label}}</el-menu-item>
                            </el-menu>
                        </div>    
                        <!-- <div class="home-title" style="margin: 20px 0">
                             <span class="home-title-t ly-title">初一</span>
                        </div> -->
                        <el-card  class="card_box">
                            <el-card class="card_in" v-for="(item,ind) in list" :key="ind">
                                <div class="card_inTit">{{item.courseName}}</div>
                                <div class="card_inType">科目类型:{{item.subjectInfo&&item.subjectInfo.subjectName}}</div>
                                <div class="card_inType">年级:{{item.subjectInfo&&item.subjectInfo.subjectGrade}}</div>
                                <div class="card_inType">学期:{{item.subjectInfo&&item.subjectInfo.subjectTerm}}</div>
                                <div class="card_inBot">
                                    <div class="card_inBot_left">已有{{item.studyCount}}人加入</div>
                                    <!-- <div class="card_inBot_right" @click="toExe">练习</div> -->
                                </div>
                                <div class="card_mask">
                                    <div class="card_inType">有效周期:{{item.orderTime}}日</div>
                                    <div class="card_inType">自购买之日起{{item.orderTime}}日内，该课程可使用。</div>
                                    <div class="card_inType">价格：{{item.coursePrice}}元</div>
                                    <div class="card_mask_inBot" v-if="item.buy">
                                        <el-button type="primary" style="background:#fcde7b;color:#333" @click="toExe(item)">练习</el-button>
                                    </div>
                                    <div class="card_mask_inBot" v-else>
                                        <el-button type="primary" style="background:#fcde7b;color:#333" @click="toExe(item)">试用</el-button>
                                        <el-button type="primary" @click="commitOrder(item.id)">购买</el-button>
                                    </div>
                                </div>
                            </el-card>
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
                searchState:false,//查询按钮
                form:{
                    page:'1',
                    pageSize:"100",
                    subjectGrade:"七年级",
                },
                tabIndex:"1",//默认选中第一个
                tabList: [
                       {
                        value: '1',
                        label: '七年级'
                    },
                    {
                        value: '2',
                        label: '八年级'
                    },
                    {
                        value: '3',
                        label: '九年级'
                    }
                ],
                list:[],//数据
            }
        },
        methods: {
            //提交订单
            commitOrder(id){
                this.$router.push("/exercises/orderInit?id="+id)
            },
            //年级选择
            tabSelect(key, keyPath){
                key==1?this.form.subjectGrade="七年级":key==2?this.form.subjectGrade="八年级":this.form.subjectGrade="九年级"
                console.log(key, keyPath,this.form);
                this.getDetail()
            },
            //选择单元
            toExe(item){//buy : 0 未购买 1 已购买
               this.$router.push("choseUnit?id="+item.id+"&status="+item.buy)
            },
           //    查询
           submitForm(){
           console.log("this.fomr",this.form)
           },
            /**
             * 获取信息详情
             */
            getDetail() {
                //初始化列表
                this.searchState = true
                this.$axios.post('/course/courseList',this.form).then(res => {
                    console.log("获取课程",res);
                    this.searchState = false;
                    this.list = res.data.result.list;
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
   
    .card_in{
         width: 300px; 
         margin: 20px;
         background: #f5e4ad;
         position: relative;
    }
  
    .card_inTit{
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .card_inType{
        font-size: 16px;
        margin-bottom: 5px;
    }
    .card_inBot{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .card_inBot_left{
        font-size: 16px;
        color: darkgray;
    }
    .card_inBot_right{
        border:1px solid #105CFB;
        color: #fcde7b;
        padding: 5px 20px;
        border-radius: 8px;
        cursor: pointer;
    }
    .card_inBot_right:hover{
        background:#105CFB ;
        color: #fff;
    }
    .home-title .ly-title{
        font-size: 20px;
    }
    >>>.card_box>.el-card__body{
        display: flex;
        flex-wrap: wrap;
    }
    .el-breadcrumb__item {
        float: none;
    }
    .card_mask{
        background: #ab54fb;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity:0;
        color: #fff;
        padding: 20px;
        box-sizing: border-box;
    }
    .card_in:hover .card_mask{
        opacity: 1;
    }
    .card_mask_inBot{
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
</style>