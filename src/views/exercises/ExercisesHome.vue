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
                    <div class="main-inner">
                        <div class="industryBox">
                            <!-- 搜索条件 start -->
                            <el-form  :inline="true" label-position="left" ref="form" :model="form" label-width="60px" >
                                <el-form-item label="科目:" >
                                   <el-select v-model="form.subject" placeholder="请选择">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                        
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm" size="small" v-loading="submitState">查询</el-button>
                                </el-form-item>
                            </el-form>
                        </div>    
                        <block v-for="item in 3">
                            <div class="home-title" style="margin: 20px 0">
                            <span class="home-title-t ly-title">初一</span>
                            </div>
                            <el-card  class="card_box">
                                <el-card class="card_in" v-for="item in 4">
                                    <div class="card_inTit">初一历史（上）</div>
                                    <div class="card_inType">科目类型:历史</div>
                                    <div class="card_inType">年级:初一</div>
                                    <div class="card_inType">学期:上</div>
                                    <div class="card_inBot">
                                        <div class="card_inBot_left">已有222人加入</div>
                                        <div class="card_inBot_right" @click="toExe">练习</div>
                                    </div>
                                </el-card>
                            </el-card>
                        
                        </block>    
                        

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
                submitState:false,//查询按钮
                form:{
                    subject:'全部',
                },
                options:[ {
                        value: '1',
                        label: '全部'
                        }, {
                        value: '2',
                        label: '语文'
                        }, {
                        value: '3',
                        label: '数学'
                        },] ,
           
            }
        },
        methods: {
            //去练习 
            toExe(id){
               this.$router.push("/exercises/doWork")
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
   
    .card_in{
         width: 300px; 
         margin: 20px;
         background: #efefef;
    }
    .card_inTit{
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .card_inType{
        font-size: 18px;
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
        color: #105CFB;
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
</style>