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
                    <div class="main-inner">
                        <!-- <div class="home-title" >
                           <span class="home-title-t ly-title">初一历史（上）</span>
                        </div> -->
                        <el-card style="margin: 20px 0" >
                            <el-collapse  accordion>
                                 <template v-for="item in 3" > 
                                    <div class="item_tit">历史（初一） 上</div> 
                                    <el-collapse-item  >
                                        <template slot="title">
                                            <div class="col_tit"> 状态：有效</div>
                                            <div  class="col_time">购买时间：2020-02-19 13:35:55 </div>
                                            <div class="col_time" >到期时间：2020-02-19 13:35:55 </div>
                                            <div class="col_num" >练习次数：5 </div>
                                        </template>
                                        <div>选择单元（可多选）</div>
                                        <div>
                                            <el-checkbox-group v-model="checkList">
                                                <el-checkbox label="复选框 A" ></el-checkbox>
                                                <el-checkbox label="复选框 B" ></el-checkbox>
                                                <el-checkbox label="复选框 C" ></el-checkbox>
                                                <el-checkbox label="禁用" ></el-checkbox>
                                                <el-checkbox label="选中且禁用" ></el-checkbox>
                                            </el-checkbox-group>
                                            <el-button type="primary" @click="toExe">练习</el-button>
                                        </div>
                                    </el-collapse-item>
                                </template>  
                            </el-collapse>                                              
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
                checkList:[],//多选
               list:[
                   {
                       title:" 10.某纪录片拍摄组决定拍摄一系列节目 《中国原始人一探秘中 国文化之源》，其内容以时间顺序记录。此摄制组的第一站应为(     )。",
                     
                   },
                    {
                       title:" 10.某纪录片拍摄组决定拍摄一系列节目 《中国原始人一探秘中 国文化之源》，其内容以时间顺序记录。此摄制组的第一站应为(     )。",
                       
                   }
               ],//题数据
            }
        },
        methods: {
            //去练习 
            toExe(id){
               this.$router.push("/exercises/doWork")
            },
            /**
             * 获取信息详情
             */
            getDetail() {
                //初始化列表
                this.$axios.get('/mer/business/circle/detail?businessCircleId=' + this.businessId).then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        let info = res.data.data;
                    } else {
                        this.$message(res.data.message);
                    }
                    this.searchState = false;
                })
                    .catch(() => {
                        this.searchState = false;
                    });
            },
          
        },
        beforeMount() {
          
            // 获取信息
            // this.getDetail();
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
    .col_tit{
        color: #67C23A;
        margin-right: 20px;
    }
    .col_time{
        margin: 0 20px;
    }
     .col_num{
        color: #909399;
    }
    .item_tit{
        margin: 20px 0 0;
        font-size: 20px;
    }
   >>>.el-checkbox{
        max-width: 300px;
        margin-right: 20px;
        float: left;
    }
</style>